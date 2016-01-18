var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/post');
var Book = require('../app/models/book');
var mongoose = require('mongoose');

router.get('/',function(req,res){
  var user_id = req.decoded;

  Post.find({'_creator.id':mongoose.Types.ObjectId(user_id),deleted:false},function(err,docs){
    if(err)
    {
      return res.json({success:false,message:"Unknown Error"})
    }
    else if(docs.length == 0)
    {
      return res.json({success:true,message:"Oops! You have not Posted any Book"});
    }
    else
    {
      return res.json({success:true,result:docs});

    }

  })
})

module.exports = router;
