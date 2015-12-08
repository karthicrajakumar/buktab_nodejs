var express = require('express');
var router = express.Router();
//var User = require('../app/models/user');
var Post = require('../app/models/post');
//var Book = require('../app/models/book');




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

	post.save(function(err){
		if(err)
		{
			return res.json({success:false,message:"Error"});
			console.log(err);
		}
		return res.json({success:true,message:"Posted Successfully"})
	})

});

module.exports = router;