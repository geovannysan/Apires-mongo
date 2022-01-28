const {Schema, Model}= require('mongoose');

const boleteria= new Schema({
	valor:String,
	fecha:Date,
	hora:String,
	asientos:Array,
	cartelera:[{
		type:Schema.ObjectId,
		ref:'Cartelera'
	}],
	usuario:[{
		type:Schema.ObjectId,
		ref:'Users'
	}],
})

module.exports = model('Boleteria', Peliculadb);