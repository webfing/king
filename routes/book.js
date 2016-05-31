var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/book', function(req, res) {
  res.render('book', { title: 'Express' });
});

router.get('/book/add', function(req, res){
	res.render('book', {title: 'book'});
});

module.exports = router;
