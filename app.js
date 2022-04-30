const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors')
const dep = require('./Router/Peliculasrouter')
//const { createpeliculas, verpelicoual, createsala } = require("./libs/initialSetup");
//const { Asientos } = require("./libs/Asientos");
let app = require('express')();
require('dotenv').config()
let server = require('http').createServer(app);
let io = require('socket.io')(server,{
	cors: { 'methods': ['GET', 'PATCH', 'POST', 'PUT'], 'origin': true}
});
app.set('port', process.env.PORT || 1313)

//midelware json
app.use(express.json())

//midelware cors 
app.use(cors())

//conexcion mongodb
const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.ehrf8.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true,
    useFindAndModify: false}).then(() => console.log('conectado a mongodb'))
    .catch(e => console.log('error de conexión', e))

app.use('/home', dep);
 
io.on('connection', (soc) =>{ console.log(soc.id)});

var port = process.env.PORT || 1313;
server.listen(app.get('port'), function(){
   console.log('listening in http://localhost:' + port);
}); 