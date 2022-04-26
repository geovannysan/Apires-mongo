const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors')
const dep = require('./Router/Peliculasrouter')
const { createpeliculas, verpelicoual, createsala } = require("./libs/initialSetup");
const { Asientos } = require("./libs/Asientos");
const socket = require('socket.io'), http = require('http'),
const app = express()
require('dotenv').config()



//setiammos puerto
app.set('port', process.env.PORT || 1313)

//midelware json
app.use(express.json())

//midelware cors 
app.use(cors())

//conexcion mongodb
const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.ehrf8.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('conectado a mongodb'))
    .catch(e => console.log('error de conexión', e))


app.use('/', dep)
createpeliculas();
createsala();
//console.log(Asientos(10, 6))//
//verpelicoual();
//puerto escuchando
app.listen(app.get('port'), () => {
    console.log("servidor escuchando ", app.get('port'))
})