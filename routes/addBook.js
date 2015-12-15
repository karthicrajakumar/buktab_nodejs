var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/post');
var Book = require('../app/models/book');




router.post('/',function(req,res){
	var userid = req.decoded;
	var price = req.body.price;
	var sem  = req.body.sem;
	var bookid = req.body.bookid;


	var post = new Post({
		Semester:sem,
		Price:price,
		bookDetails:bookid,
		_creator:userid,
		lat:req.body.lat,
		long:req.body.long
	});
	//post.populate('bookDetails').execPopulate();


	post.save(function(err){
		if(err)
		{
			return res.json({success:false,message:"Error"});
			console.log(err);
		}else{
		Book.findById(bookid,function(err,book){
			post.set({bookDetails: book});
			post.populate('bookDetails').save();

	})
		User.findById(userid,function(err,user){
			if(err)
			{
				return res.json({success:false,message:"Error"});
			}
			else if(user != null){

				post.set({_creator:{username: user.username,id:user._id,phoneNo:user.phoneNo,email:user.email}});
				post.save();
			}
			else {
				return res.json({success:false,message:"Error"});
			}

		})

			return res.json({success:true,message:"Posted Successfully",post:post})
		}
	})


});

module.exports = router;
