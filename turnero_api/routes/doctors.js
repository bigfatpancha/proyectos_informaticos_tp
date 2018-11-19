var express = require('express');
var async = require('async');
var bcrypt = require('bcrypt');
var router = express.Router();

/* GET doctors listing. */
router.get('/', function (req, res) {
  if (!req.user || req.user.role != 'Admin') {
    res.status(403).send();
    return;
  }  
  req.db.Doctor.findAll({
    include: [{
      model: req.db.User,
      as: 'personal_data'
    }]
  })
  .then(function(doctors) {
    var response = {
      success: true,
      doctors: doctors
    }
    res.json(response);
  })
  .catch(function(err) {
    var response = {
      success: false,
      err: err
    }
    res.json(response);
  });
});

router.post('/', function (req, res) {
  if (!req.user || req.user.role != 'Admin') {
    res.status(403).send();
    return;
  }
  async.waterfall([
    // Esto no debería ser necesario, pero no logré que sequelize genere una columna
    // con valor único, asique por ahora queda chequeado a mano.
    function (callback) {
      req.db.User.findOne({
        where: {
          email: req.body.email
        }
      }).then(function(user) {
        if (!user) {
          callback(null);
        } else {
          callback("user already exists");
        }
      }).catch(function(err) {
        callback("internal server error");
      });
    },
    // Hasheo la contrasenia.
    function(callback) {
      bcrypt.hash(req.body.password, 10)
      .then(function (hashedPwd) {
        userData = req.body;
        userData.original_password = userData.password;
        userData.password = hashedPwd;
        userData.role = 'Doctor';
        callback(null, userData);
      }).catch(function(err) {
        callback("internal server error");
      });
    },
    // Guardo user en la DB.
    function(userData, callback) {
      req.db.User.create(userData)
      .then(function (newUser) {
        newUser = newUser.toJSON();
        delete newUser.password;
        callback(null, newUser);
      }).catch(function (err) {
        if (err.name == "SequelizeValidationError") {
          callback("validation error");
        } else {
          callback("internal server error");
        }
      });
    },
    // Guardo doctor en la DB.
    function(user, callback) {
      var doctorData = {
        specialty_id: req.body.specialty_id,
        user_id: user.id
      }
      req.db.Doctor.create(doctorData)
      .then(function (newDoctor) {
        user.doctorData = newDoctor.toJSON();
        callback(null, user);
      }).catch(function (err) {
        if (err.name == "SequelizeValidationError") {
          callback("validation error");
        } else {
          callback("internal server error");
        }
      });
    }    
  ], function (err, user) {
    var response = {};
    if (!err) {
      response.success = true;
      response.user = user;
    } else {
      response.success = false;
      response.error = err;
    }
    res.json(response);
  });
});

module.exports = router;