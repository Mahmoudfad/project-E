var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var listSchema = new Schema({
 firstName:{type :String},
 lastName:{type :String},
 age:{type :Number},
 email:{type :String}
,
  
});

module.exports=mongoose.model("list",listSchema)
