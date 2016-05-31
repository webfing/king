var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res) {
  res.render('test', { title: 'Express' });
});

router.get('404', function(req, res){
	res.render('404', {title: '404'});
});

router.get('502', function(req, res){
	res.render('502', { title: '502'});
});

module.exports = router;
