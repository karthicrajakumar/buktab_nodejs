var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var User = require('./user');
var Book = require('./book');


var PostSchema = new Schema({
	
	Semester : {type : Number, required : true},
	Price : {type: Number, required:true},
	bookDetails : [{ type: Schema.Types.ObjectId, ref:'Book' ,required:true}],
	_creator : [{ type: Schema.Types.ObjectId, ref:'User',required:true}],
	lat:{type:Number},
	long:{type:Number}
});

module.exports = mongoose.model('Post',PostSchema);