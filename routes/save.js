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
		if(err) {
			return res.json({success: false, message:"Error" });
		}
		console.log('User Saved Successfully');
		return res.json({success: true });
	});

});

module.exports = router;