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

router.get('/:user_id', function(req, res, next) {
  async.waterfall([
    function(callback) {
      req.db.Appointment.findAll({
        where: {
          user_id: req.params.user_id
        }
      })
      .then(function(appointments) {
        callback(null, appointments);
      })
      .catch(function(err) {
        callback('internal server error');
      });
    }
  ], function (err, appointments) {
    var response = {};
    if (!err) {
      response.success = true;
      response.appointments = appointments;
    } else {
      response.success = false;
      response.error = err;
    }
    res.json(response);
  });
});

router.put('/:user_id', function(req, res, next) {
  async.waterfall([
    function(callback) {
      // Si estoy cambiando el estado a algo distinto de 'Activo',
      // no tengo problema.
      if (req.body.state != "Activo") {
        return callback(null);
      }

      // Si el nuevo estado es 'Activo', valido que no haya 
      // ningún appointment ya activo que se superponga.
      req.db.Appointment.findOne({
        where: {
          doctor_id: req.body.doctor_id,
          date: req.body.date,
          state: 'Activo'
        }
      })
      .then(function(appointment) {
        if (!appointment || appointment.user_id == req.params.user_id) {
          callback(null);
        } else {
          callback('appointment already taken');
        }
      })
      .catch(function(err) {
        callback('internal server error');
      });

    },
    function(callback) {
      req.db.Appointment.findOne({
        where: {
          user_id: req.params.user_id,
          doctor_id: req.body.doctor_id,
          date: req.body.date
        }
      })
      .then(function(appointment) {
        if(appointment) {
          callback(null, appointment);
        } else {
          callback('appointment does not exist');
        }
      })
      .catch(function(err) {
        callback('internal server error');
      });
    },
    function (appointment, callback) {
      appointment.state = req.body.state;
      appointment.updatedAt = moment().toDate();
      appointment.save()
      .then(function () {
        callback(null, appointment.toJSON());
      })
      .catch(function(err) {
        callback('internal server error');
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
});

module.exports = router;