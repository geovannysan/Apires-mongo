const jwt = require("jsonwebtoken");
const express = require("express")
const router = express.Router()
const Peliculasrut = require("../Controllers/peliculas")
const Carteleras = require("../Controllers/caltelera")
const verifyToken = require("../libs/verificatoken")


router.route('/peliculas')
.get(Peliculasrut.findAllPeliculas)
.post(Peliculasrut.addPelicula);

router.route('/peliculas/:id')
.get(Peliculasrut.findById)
.post(Peliculasrut.deletePelicula);

router.route('/cartelera/:id')
.get(Carteleras.findById)
.post(Carteleras.deleteCartelera);


module.exports =router;