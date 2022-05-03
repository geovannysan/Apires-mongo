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
const db = mongoose.connection;


io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, process.env.SECRET, function (err, decoded) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
    }
    else {
        console.log("Authentication error")
        next(new Error('Authentication error'));
    }
}).on('connection', (socket) => {
    console.log(" - ");
    socket.on('disconnect', (reason) => {
        // users = user.filte(e=>e)
        delete users[socket.decoded.id]
        //console.log('desconectado: ' + socket.decoded.id + " - " + socket.id)
        // console.log(users)
    });
    users[socket.decoded.id] = socket.id;

    //console.log(users);
    // console.log(users[socket.decoded.id])
    // io.to(users['id']).emit('actuaGPS',data)

    socket.on('set-name', (username) => {
        io.emit('esrconectado', username + " " + socket.decoded.id);
    })
    db.once('open', () => {
        const collection = db.collection('users');
        const changeStream = collection.watch();
        changeStream.on('change', next => {
            const { updatedFields } = next.updateDescription;
            if (!users[next.documentKey['_id']]) return
            io.to(users[next.documentKey['_id']]).emit('actuaGPS', updatedFields)
            //console.log([next, next.documentKey['_id'], updatedFields]);
        });
    })

});
//findAllUSers();
var port = process.env.PORT || 1313;
server.listen(app.get('port'), function () {
    console.log('listening in http://localhost:' + port);
}); 