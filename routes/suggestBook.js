var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/post');
var Book = require('../app/models/book');
var suggestBook = require('../app/models/suggestBook');
mongoose = require('mongoose');


router.post('/',function(req,res){
  var name = req.body.name;
  var author = req.body.author;

  var suggestbook = new suggestBook({
    Author:author,
    Name:name
  });

  suggestbook.save(function(err){
  if(err)
  {
    return res.json({success:false,message:err});
    console.log(err);
  }
  else{
      return res.json({success:true,message:"success"});
  }

});


});
module.exports = router;
