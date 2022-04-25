const  {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
//const mongoose {Schema} = mongoose.Schema;

const usuariosapp = new Schema({
    nombre: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    GPS:{
    	lat:String,
    	lng: String,
    	time:Date,
    }
    
});

usuariosapp.methods.encrypas  = async (password)=>{
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password,salt);

}
usuariosapp.methods.decodepas  = function (password){
	return bcrypt.compare(password,this.password);
	// salt = await bcrypt.genSalt(10);
	//return bcrypt.hash(password,salt);
}
//const Usuarios = mongoose.model('Users', usuariosapp);

module.exports = model('Users', usuariosapp);