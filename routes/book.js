var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/book', function(req, res) {
  res.render('book', { title: 'Express' });
});

router.get('/book/del', function(req, res){
	res.redner('book', { title: 'book'});
});

module.exports = router;
