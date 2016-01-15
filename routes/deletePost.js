var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/post');
var Book = require('../app/models/book');
var mongoose = require('mongoose');


router.delete('/',function(req,res){
  var user_id = req.decoded;
  var post_id = req.body.id;
  Post.findOne({_id:post_id,'_creator.id':mongoose.Types.ObjectId(user_id)},function(err,post){
    if(post){
    post.softdelete(function(err,newPost){
      if(err)
       return res.json(err);
      return res.json({success:true,message:"Deleted Successfully"});
      })

  }else{
      return res.json({success:false,message: "Not your Post or Post Not Found !"})
    }
  });
});

module.exports = router;
