var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.db.User.findAll()
  .then(function(users) {
    res.json(users);
  }).catch(function(err) {
    res.send(err);
  });
});

module.exports = router;
