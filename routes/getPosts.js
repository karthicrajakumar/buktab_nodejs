var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/post');
var Book = require('../app/models/book');


router.get('/',function(req,res){
	Post.find(function(err,docs){
		return res.json({success:true,result:docs});
	})
})
module.exports = router;