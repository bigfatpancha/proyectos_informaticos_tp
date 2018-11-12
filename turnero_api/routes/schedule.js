var express = require('express');
var router = express.Router();
var async = require('async');
var moment = require('moment');

// Returns the list of appointments for a given doctor. If a date is passed
// by query string in the format 'DD-MM-YYYY', it'll return appointments for 
// that date. Else, it'll default to returning for the current day.
router.get('/:doctor_id', function(req, res) {
  var requiredDate = moment();
  if (req.query.date) {
    requiredDate = moment(req.query.date, "DD-MM-YYYY");
  }
  var dayOfWeek = requiredDate.day();

  async.waterfall([
    function(callback) {
      req.db.WorkingHours.findOne({
        where: {
          doctor_id: req.params.doctor_id,
          day_of_week: dayOfWeek
        }
      })
      .then(function(workingHours) {
        callback(null, workingHours);
      })
      .catch(function(err) {
        callback('internal server error');
      });
    }, 
    function(workingHours, callback) {
      req.db.Appointment.findAll({
        where: {
          doctor_id: req.params.doctor_id,
          date: {
            [req.db.Sequelize.Op.gt]: requiredDate.clone().startOf('day').toDate(),
            [req.db.Sequelize.Op.lt]: requiredDate.clone().endOf('day').toDate()
          },
          state: 'Activo'
        },
        order: [['date', 'ASC']]
      })
      .then(function(takenAppointments) {
        var takenTimes = takenAppointments.map(app => app.date);
        callback(null, workingHours, takenTimes);
      })
      .catch(function(err) {
        callback('internal server error');
      });
    },
    function(workingHours, takenTimes, callback) {
      if (!workingHours) {
        return callback(null,[]);
      }
      var appointmentStartTime = requiredDate.clone();
      appointmentStartTime.hours(workingHours.from_hour).minutes(0);
      var workHoursEndTime = requiredDate.clone();
      workHoursEndTime.hours(workingHours.to_hour).minutes(0);

      var appointments = [];
      while (appointmentStartTime.isBefore(workHoursEndTime)) {
        var appointmentEndTime = appointmentStartTime.clone();
        appointmentEndTime.add(workingHours.appointment_duration, "minutes");
        var available = !takenTimes[0] || moment(takenTimes[0]).isAfter(appointmentStartTime);
        if (!available) {
          console.log('marking the time ', appointmentStartTime.toDate(), ' as not available.');
          takenTimes.shift();
        }
        var appointment = {
          start_time: appointmentStartTime.toDate(),
          end_time: appointmentEndTime.toDate(),
          available: available
        }
        appointments.push(appointment);
        appointmentStartTime = appointmentEndTime;
      }
      callback(null, appointments);
    }
  ], function (err, schedule) {
    var response = {};
    if (!err) {
      response.success = true;
      response.schedule = schedule;
    } else {
      response.success = false;
      response.err = err;
    }
    res.json(response);
  });
});

module.exports = router;