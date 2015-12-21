var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var jwt    = require('jsonwebtoken');
var TokenStrategy = require('passport-accesstoken').Strategy;


router.post('/',function(req,res){
	//var user = new User({
	//	username: req.body.username,
	//	password : req.body.password
	//});

	User.findOne({username: req.body.username}, function(err,user){

		if(err) {
			return res.json({success:false , message: "Error"});
		}
		if(!user){
			return res.json({success:false , message: "Authentication Failed, User not Found"});

		}

			user.comparePassword(req.body.password, function(err,isMatch){
				if(err) {
					return res.json({success:false , message: err});

				}
			if(!isMatch) {
				return res.json({success:true , message: "Password does not match"});sent = true;
			}
			else
				{

					var token = jwt.sign(user._id,"karthic",{
						expiresIn:"365d"
					});

					user.token = token;
					user.save(function(err){
						if(err) {
							return res.json({success:false , message: err});
						}else {
							return res.json({
				          success: true,
				          message: 'Successfully Logged in ',
				          token: token
								});
						};
					});
			};
		});
	});
});

module.exports = router;
