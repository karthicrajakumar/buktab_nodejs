var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/post');
var Book = require('../app/models/book');
var mongoose = require('mongoose');



router.post('/',function(req,res){
	var userid = req.decoded;
	var price = parseInt(req.body.price);
	var sem  = parseInt(req.body.sem);
	var bookid = req.body.bookid;
	var location =req.body.location;

	var post = new Post({
		Semester:sem,
		Price:price,
		bookDetails:bookid,
		creator:userid,
		location:location,

	});
	//post.populate('bookDetails').execPopulate();


	post.save(function(err){
		if(err)
		{
			return res.json({success:false,message:err});
			console.log(err);
		}
		Book.findById(bookid,function(err,book){
			post.set({bookDetails: book});
			post.populate('bookDetails').save();

	})
		User.findById(userid,function(err,user){
				post.set({_creator:{username: user.username,id:user._id,phoneNo:user.phoneNo,email:user.email,sex:user.sex,hidden:posts[i]._creator[0].hidden}});
				post.populate('_creator').save();
			})


			return res.json({success:true,message:"Posted Successfully",post:post})

		});

});

module.exports = router;
