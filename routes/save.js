var express = require('express');
var router = express.Router();
var User = require('../app/models/user');

router.post('/', function(req,res) {
	var user = new User({
		username: req.body.username,
		password : req.body.password,
		email :req.body.email,
		phoneNo : req.body.phoneNo,
		sex:req.body.sex,
		hidden: req.body.hidden

	});

	user.save(function(err){
		if(err){
			if(err.code == 11000)
				return res.json({success: false, message:"User Details Already Exists" });
			else
				return res.json({success:false,message:"Unknown Error"})
		}

		console.log('User Saved Successfully');
		return res.json({success: true,message:"User Saved Successfully" });
	});

});


module.exports = router;
