const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departamentoSchema = new Schema({
    nombre: String,
    descripcion: String
});

// Crear el modelo
const Departamento = mongoose.model('Departamento', departamentoSchema);

module.exports = Departamento;