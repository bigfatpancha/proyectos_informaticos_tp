var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json({ 
		title: "Express Server", 
		version: "0.0.0", 
		someDictionary: {
			key1: "value1",
			key2: "value2",
			key3: "value3"
		}
  	});
});

module.exports = router;
