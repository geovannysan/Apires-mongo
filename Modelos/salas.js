const {Schema, model} = require('mongoose');
//const Schema = mongoose.Schema;

const Saladb = new Schema({
  asientos:Number,
  nombre:String,
  asientos:Array,
  formatos:Array
});


// Crear el modelo
module.exports = model('Salas', Saladb);