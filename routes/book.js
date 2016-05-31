var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/book', function(req, res) {
  res.render('book', { title: 'Express' });
});


module.exports = router;
