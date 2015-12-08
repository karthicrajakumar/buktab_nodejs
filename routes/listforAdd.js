var express = require('express');
var router = express.Router();
var Book = require('../app/models/book');

router.get('/',function(req,res){
	var query = req.query.query;

	Book.find({$or:[{"Name":new RegExp(query,'i')},{"Author":new RegExp(query,'i')},{"Publisher":new RegExp(query,'i')}]},function(err,docs){
		if(err)
		{
			return res.json({success:false,message:"Error Retrieving Docs"});
		}
		else if(docs == null)
		{
			return res.json({success:false,message:"No Books Matching Your Request"});
		}
		else
		{
			return res.json({success:true,result:docs});
		}
	});
});
module.exports = router;