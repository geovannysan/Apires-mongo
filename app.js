const express = require("express");
const mongoose = require('mongoose');
const app = express()
require('dotenv').config()
//setiammos puerto
app.set('port', process.env.PORT || 4000)
const usuario = "Geosan"
const password = "LofvlWxJCIargWCC"
const dbName = "Alquiler"

//conexcion mongodb
const uri = `mongodb+srv://${usuario}:${password}@cluster0.ehrf8.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conectado a mongodb'))
    .catch(e => console.log('error de conexión', e))

//midelware json
app.use(express.json())

//puerto escuchando
app.listen(app.get('port'), () => {
    console.log(" escuchaso ", app.get('port'))
})