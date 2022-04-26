const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historyGPsSchema = new Schema({
    key: String,
    time:Date,
    lng: String,
    lat:String,
    spedd:String,
    usuario:[{
     type: Schema.ObjectId,
     ref: 'Users',}] 
});

// Crear el modelo
const History = mongoose.model('HistoryGPS', historyGPsSchema);

module.exports = History;