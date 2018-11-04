var express = require('express');
var async = require('async');
var bcrypt = require('bcrypt');
var router = express.Router();


function buildResponse(err, user) {
  var response = {};
  if (!err) {
    response.success = true;
    response.user = user;
  } else {
    response.success = false;
    response.error = err;
  }
  return response;
}

router.post('/login', function(req, res, next) {

  async.waterfall([
    // Busco si el usuario existe.
    function(callback) {
      req.db.User.findAll({
        where: {
          email: req.body.email
        }
      }).then(function(users) {
        if (users.length == 1) {
          callback(null, users[0])
        } else {
          callback("invalid credentials");
        };
      }).catch(function(err) {
        callback("internal server error");
      });
    },
    // Comparo contrasenia.
    function(user, callback) {
      bcrypt.compare(req.body.password, user.password)
      .then(function(isCorrect) {
        if (isCorrect) {
          user = user.toJSON();
          delete user.password;
          callback(null, user);
        } else {
          callback("invalid credentials");
        }
      }).catch(function(err) {
        callback("internal server error");
      });
    }
  ], function(err, user) {
    res.json(buildResponse(err, user));
  });

});

router.post('/register', function (req, res, next) {
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
        callback(null, userData);
      }).catch(function(err) {
        callback("internal server error");
      });
    },
    // Guardo en la DB.
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
    }
  ], function (err, user) {
    res.json(buildResponse(err, user));
  });
})

module.exports = router;
