var express = require('express');
var async = require('async');
var bcrypt = require('bcrypt');
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {

  async.waterfall([
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
    }, function(user, callback) {
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
    var response = {};
    if (!err) {
      response = {
        success: true,
        user: user
      }
    } else {
      response = {
        success: false,
        error: err
      }
    }
    res.json(response);
  });

});

module.exports = router;
