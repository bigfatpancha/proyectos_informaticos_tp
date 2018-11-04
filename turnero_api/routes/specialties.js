var express = require('express');
var router = express.Router();

/* GET specialties listing. */
router.get('/', function(req, res, next) {
 	req.db.Specialty.findAll()
  	.then(function(specialties) {
    	res.json(specialties);
  	}).catch(function(err) {
    	res.send(err);
  	});
});

router.get('/:id/doctors', function (req, res) {
	req.db.Doctor.findAll({
		where: {
			specialty_id: req.params.id
		}
	})
  	.then(function(doctors) {
    	res.json(doctors);
  	}).catch(function(err) {
    	res.send(err);
  	});
})

module.exports = router;
