var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/post');
var Book = require('../app/models/book');
var mongoose = require('mongoose');

router.post('/',function(req,res){
  var user_id = req.decoded;
  var i = 0;
  var password = req.body.password;
  var phoneNo = req.body.phoneNo;
  var email = req.body.email;
  User.findOne({_id:mongoose.Types.ObjectId(user_id)},function(err,user){
    if(err)
    {
      return res.json({success:false , message: "User not Found"});
    }
    else{
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
            return res.json({success:false , message: "Phone Number Already exists"});
          }
          else{
            Post.find({'_creator.id':mongoose.Types.ObjectId(user_id)},function(err,posts){
              for(i=0 ;i<posts.length;i++ )
              {
                posts[i].set({_creator:{username:posts[i]._creator[0].username,id:posts[i]._creator[0].id,phoneNo:phoneNo,email:email}});
                posts[i].save();
              }
              return res.json({success:true , message: "Updated Successfully"});
            });
          }
        });
      }
    })
  }
})
})



module.exports = router;
