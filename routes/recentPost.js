var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/post');
var Book = require('../app/models/book');

router.get('/',function(req,res){
  Post.find({deleted:false},null,{sort:{updated_at:-1},limit:10},function(err,docs){
      if(docs.length == 0)
      {
        return res.json({success:false,message:"No recent Books"});
      }
      else
        return res.json({success:true,result:docs});
    })
});
module.exports = router;
