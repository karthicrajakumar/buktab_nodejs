var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var User = require('./user');
var Book = require('./book');

var soft_delete = require('mongoose-softdelete');


var PostSchema = new Schema({

	Semester: {type : Number, required : true},
	Price: {type: Number, required:true},
	bookDetails: [{ type: Schema.Types.Mixed, ref:'Book' ,required:true}],
	_creator: [{ type: Schema.Types.Mixed, ref:'User',required:true}],
  location:{type:String},
  created_at    : { type: Date },
  updated_at    : { type: Date }



});
PostSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

PostSchema.plugin(soft_delete);
module.exports = mongoose.model('Post',PostSchema);

var Post = mongoose.model('Post');
