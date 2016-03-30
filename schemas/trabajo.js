var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var TrabajoSchema = new mongoose.Schema({
  titulo : String,
  descripcion : String,
  cargo : String,
  informacion : String,
  salario : Number,
  archivado : Boolean
});

TrabajoSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Trabajo', TrabajoSchema);
