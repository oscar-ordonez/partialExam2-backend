var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  username : {type: String, unique: true, required: true},
  password : String,
  email : String,
  name : String,
  phone : String,
  trabajosAplicados : [String],
  scope : [String]
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);
