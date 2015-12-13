var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var User = require('./user');
var Book = require('./book');


var PostSchema = new Schema({
	
	Semester: {type : String, required : true},
	Price: {type: String, required:true},
	bookDetails: [{ type: Schema.Types.Mixed, ref:'Book' ,required:true}],
	_creator: [{ type: Schema.Types.Mixed, ref:'User',required:true}],
	lat:{type:String},
	long:{type:String},
	
	
	
});
module.exports = mongoose.model('Post',PostSchema);

var Post = mongoose.model('Post');

	
	




