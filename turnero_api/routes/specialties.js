var express = require('express');
var router = express.Router();

/* GET specialties listing. */
router.get('/', function(req, res, next) {
   req.db.Specialty.findAll()
    .then(function(specialties) {
      res.json(specialties);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.get('/:specialty_id/doctors', function (req, res) {
  req.db.Doctor.findAll({
    where: {
      specialty_id: req.params.specialty_id
    },
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

module.exports = router;