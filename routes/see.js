var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/post');
var Book = require('../app/models/book');
var suggestBook = require('../app/models/suggestBook');


router.get('/',function(req,res){
    suggestBook.find(function(err,docs){
      if(docs.length == 0)
      {
        return res.json({success:false,message:"No recent Books"});
      }
      else
        return res.json({success:true,result:docs});
    })
});

module.exports = router;
