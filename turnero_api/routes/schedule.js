var express = require('express');
var router = express.Router();
var async = require('async');

router.get('/:doctor_id', function(req, res) {
  var requiredDate = new Date();
  if (req.query.date) {
    var dateInfo = req.query.date.split('-');
    requiredDate = new Date(dateInfo[2], dateInfo[1] - 1, dateInfo[0]);
  }
  var dayOfWeek = requiredDate.getDay();
  async.waterfall([
    function(callback) {
      req.db.WorkingHours.findAll({
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
      callback(null, workingHours);
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