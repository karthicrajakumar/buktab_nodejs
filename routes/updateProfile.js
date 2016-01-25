var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/post');
var Book = require('../app/models/book');
var mongoose = require('mongoose');

router.post('/',function(req,res){
  var user = req.decoded;
  var password = req.body.password;
  var phoneNo = req.body.phoneNo;
  var email = req.body.email;
  User.findOne({_id:mongoose.Types.ObjectId(user)},function(err,user){
    user.comparePassword(password,function(err,isMatch){
      if(err)
      {
        return res.json({success:false , message: "Error"});
      }
      else if(!isMatch)
      {
        return res.json({success:false , message: "Passwords do not match"});
      }
      else {
        user.phoneNo = phoneNo;
        user.email = email;
        user.save(function(err){
          if(err)
          {
            return res.json({success:false , message: "Phone  Number Already exists"});
          }
          else{
            return res.json({success:true , message: "Updated Successfully"});
          }
        });
      }
    })
  });
})


module.exports = router;
