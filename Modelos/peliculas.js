const {Schema, model} = require('mongoose');
//const Schema = mongoose.Schema;

const Peliculadb = new Schema({
    titulo: String,
    duracion: String,
    calificacion:String,
    actores:Array,
    generos:Array,
    formatos:Array,
    img:String,
  });
module.exports = model('Pelicula', Peliculadb);