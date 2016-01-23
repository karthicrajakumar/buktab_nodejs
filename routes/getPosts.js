var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Post = require('../app/models/post');
var Book = require('../app/models/book');



router.get('/',function(req,res){
	Post.find({},null,{sort:{updated_at:-1}},function(err,docs){
		return res.json({success:true,result:docs});
	})
});

router.get('/bySem/:sem',function(req,res){
	var sem = req.params.sem;
	Post.find({Semester:sem,deleted:false},null,{sort:{updated_at:-1}},function(err,docs){
		if(err)
			return res.json({success:false,message:"Unknown Error"})
		else {
			if(docs.length == 0){
					return res.json({success:false,message:"No Books match your Search Condition"});
			}else{
			return res.json({success:true,result:docs});

			}
		}
	});
});


router.get('/byPrice/:price',function(req,res){
	var price = req.params.price;
	Post.find({Price:{$lte: price},deleted:false},null,{sort:{updated_at:-1}},function(err,docs){
				if(err)
				{
					return res.json({success:false,message:"Unknown Error"})
				}
				else if(docs.length == 0)
				{
					return res.json({success:false,message:"No Books match your Search Condition"});
				}
				else
				{
					return res.json({success:true,result:docs});

				}
		});
});
router.get('/byName/:name',function(req,res){
	var name = req.params.name;
	Post.find({$or:[{"bookDetails.Name":new RegExp(name,'i')},{"bookDetails.Author":new RegExp(name,'i')},{"bookDetails.Publisher":new RegExp(name,'i')}],deleted:false},null,{sort:{Price:1,updated_at:-1}},function(err,docs){
		if(err)
		{
			return res.json({success:false,message:"Unknown Error"})
		}
		else if(docs.length == 0)
		{
			return res.json({success:false,message:"No Books match your Search Condition"});
		}
		else
		{
			return res.json({success:true,result:docs});

		}

	});
});

router.get('/byDept/:dept',function(req,res){
	var dept = req.params.dept;
	Post.find({"bookDetails.Department":new RegExp(dept,'i'),deleted:false},null,{sort:{updated_at:-1}},function(err,docs){
		if(err)
		{
			return res.json({success:false,message:"Unknown Error"})
		}
		else if(docs.length == 0)
		{
			return res.json({success:false,message:"No Books match your Search Condition"});
		}
		else
		{
			return res.json({success:true,result:docs});

		}
	});
});

router.get('/byDeptAndSem/',function(req,res){
	var dept  = req.query.dept;
	var sem = req.query.sem;
	Post.find({"bookDetails.Department": new RegExp(dept,'i'),"Semester":sem,deleted:false},null,{sort:{updated_at:-1}},function(err,docs){
		if(err)
		{
			return res.json({success:false,message:"Unknown Error"})
		}
		else if(docs.length == 0)
		{
			return res.json({success:false,message:"No Books match your Search Condition"});
		}
		else
		{
			return res.json({success:true,result:docs});

		}
	})
})
module.exports = router;
