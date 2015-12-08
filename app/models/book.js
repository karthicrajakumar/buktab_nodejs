var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
	Name :{ type :String, required : true, index:{unique : true}},
	Author :{type : String, required : true},
	Publisher : { type: String, required : true},
	Semester:{ type:String, required:true,index:{unique:true}},
	Department : { type: String, required:true}
});

module.exports = mongoose.model('Book',BookSchema);