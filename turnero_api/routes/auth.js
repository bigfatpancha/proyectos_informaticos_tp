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
          username: req.body.username
        }
      }).then(function(users) {
        if (users.length == 1) {
          callback(null, users[0])
        } else {
          callback("user not found");
        };
      }).catch(function(err) {
        callback(err);
      });      
    }, function(user, callback) {
      bcrypt.compare(req.body.password, user.password)
      .then(function(isCorrect) {
        if (isCorrect) {
          user = user.toJSON();
          delete user.password;
          callback(null, user);
        } else {
          callback("wrong password");
        }
      }).catch(function(err) {
        callback(err);
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
