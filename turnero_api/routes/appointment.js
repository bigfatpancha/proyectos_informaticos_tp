var express = require('express');
var async = require('async');
var moment = require('moment');
var router = express.Router();

router.post('/', function (req, res, next) {
  async.waterfall([
    function(callback) {
      req.db.WorkingHours.findOne({
        where: {
          doctor_id: req.body.doctor_id,
          day_of_week: moment(req.body.date).day()
        }
      })
      .then(function(workingHours) {
        if (workingHours) {
          callback(null);
        } else {
          callback('not a work day for doctor');
        }
      })
      .catch(function(err) {
        callback('internal server error');
      });
    },
    // Guardo en la DB.
    function(callback) {
      req.db.Appointment.create(req.body)
      .then(function (newAppointment) {
        callback(null, newAppointment);
      })
      .catch(function (err) {
        if (err.name == "SequelizeValidationError") {
          callback("validation error");
        } else if (err.name == "SequelizeUniqueConstraintError") {
          callback("appointment already exists");
        } else {
          callback("internal server error");
        }
      });
    }
  ], function (err, appointment) {
    var response = {};
    if (!err) {
      response.success = true;
      response.appointment = appointment;
    } else {
      response.success = false;
      response.error = err;
    }
    res.json(response);
  });
})

module.exports = router;