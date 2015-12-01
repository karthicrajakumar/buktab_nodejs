var express = require('express');
var router = express.Router();
var User = require('../app/models/user');

router.post('/', function(req,res) {
	var user = new User({
		username: req.body.username,
		password : req.body.password,
		email :req.body.email

	});
	user.save(function(err){
		if(err) throw err;
		console.log('User Saved Successfully');
		res.json({success: true });
	});

});

module.exports = router;