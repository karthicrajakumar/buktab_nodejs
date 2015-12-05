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
	var sent = false;
	User.findOne({username: req.body.username}, function(err,user){
		if(err) {
			return res.json({success:false , message: "Error"});
		}
		if(!user){
			return res.json({success:false , message: "Authentication Failed, User not Found"});
			sent = true;
		}
		try{
			user.comparePassword(req.body.password, function(err,isMatch){
				if(err) {
					return res.json({success:false , message: err});
					sent = true;
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
							return res.json({success:false , message: "Could not save User"});
					}
					});
					return res.json({
			          success: true,
			          message: 'Successfully Logged in ',
			          token: token
	        });
					sent = true;
				}

			});
		}
		catch(e)
		{
			return res.json({success:false , message: "error"});
			sent = true;
		}
		
	});

});

module.exports = router;