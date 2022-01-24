const {Schema, model} = require('mongoose');
//const Schema = mongoose.Schema;

const Carteleradb = new Schema({
    horainicio: String,
    horafin: String,
    fecha:Date,
    valor:String,
    formato:String,
   salas:[{
     type: Schema.ObjectId,
     ref: 'Sala',
   },],
   pelicula:[{
     type: Schema.ObjectId,
     ref: 'Pelicula',}]
    
});

module.exports = model('Cartelera', Carteleradb);