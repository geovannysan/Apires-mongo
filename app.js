const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors')
const { findAllUSers } = require('./WhatchMongo/Users')
const dep = require('./Router/Peliculasrouter')
const Usersmon = require('./Alquile');
const jwt = require('jsonwebtoken');
//const { createpeliculas, verpelicoual, createsala } = require("./libs/initialSetup");
//const { Asientos } = require("./libs/Asientos");
let app = require('express')();
require('dotenv').config()
let server = require('http').createServer(app);
let io = require('socket.io')(server, {
    cors: { 'methods': ['GET', 'PATCH', 'POST', 'PUT'], 'origin': true }
});
app.set('port', process.env.PORT || 1313)

//midelware json
app.use(express.json())

//midelware cors 
app.use(cors())
var users = [];
//conexcion mongodb
const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.ehrf8.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('conectado a mongodb'))
    .catch(e => console.log('error de conexión', e))

app.use('/NewUSer', Usersmon);
app.use('/home', dep);



io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, process.env.SECRET, function (err, decoded) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
    }
    else {
        next(new Error('Authentication error'));
    }
}).on('connection', (socket) => {

    socket.on('disconnect', (reason) => {
        console.log('desconectado: ' + reason)
    });
    socket.on('set-name', (username) => {
        users[username] = socket.decoded.nombre;
        console.log(users);
        io.emit('esrconectado', socket.decoded.nombre);
    })

});
findAllUSers();
var port = process.env.PORT || 1313;
server.listen(app.get('port'), function () {
    console.log('listening in http://localhost:' + port);
}); 