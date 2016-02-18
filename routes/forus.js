var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/post');
var Book = require('../app/models/book');

router.post('/',function(req,res){
  var book = new Book({
    Name: req.body.name,
    Publisher : req.body.pub,
    Author: req.body.author,
    Semester:req.body.sem,
    Department:req.body.dept
  });

  book.save(function(err)
{
  if(err)
    return res.json({message:err});
  else {
    {
      return res.json({message:"success"});
    }
  }
});
});
router.get('/', function (req, res) {
  res.render('form');
});
module.exports = router;
