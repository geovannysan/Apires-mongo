const { Schema, model } = require('mongoose');
//const Schema = mongoose.Schema;

const Saladb = new Schema({
  nombre: String,
  formatos: Array,
  asientos: Array,
});


// Crear el modelo
module.exports = model('Salas', Saladb);