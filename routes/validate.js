var express = require('express');
var router = express.Router();
var User = require('../app/models/user');

router.get('/username/:uname' , function(req,res){
	var uname = req.params.uname;
	if(uname.length < 4)
	{
		return res.json({success:false, message:"Username must be more than 4 Characters"});
		req.aboort();
	}
	User.findOne({username:uname},function(err,user){
		if(err)
		{
			return res.json({success:false,message:"Unknown Error"});
		}
		if(user)
		{
			return res.json({success:false,message:"Username Already Taken"});
		}
		if(user == null )
		{
			return res.json({success:true,message:"Username is Available"});
		}
	});

});

router.get('/phoneNo/:phone', function(req,res){
	var phone = req.params.phone;
	if(phone.length < 10)
	{
		return res.json({success:false, message:"Phone Number must be 10 digits"});
		req.aboort();
	}
	User.findOne({phoneNo:phone},function(err,user){
		if(err)
		{
			return res.json({success:false,message:"Unknown Error"});
		}
		if(user)
		{
			return res.json({success:false,message:"Phone Number Already associated with an Account"});
		}
		if(user == null)
		{
			return res.json({success:true,message:"Phone Number is Valid"});
		}
	})
})

module.exports = router;