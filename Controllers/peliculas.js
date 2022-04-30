const mongoose = require("mongoose");
const Pelicula = require("../Modelos/peliculas")

const findAllPeliculas = (req, res) => {
  Pelicula.find((err, profiles) => {
    err && res.send(500).send(err.message);
    console.log("GET /profiles" + profiles);
    res.status(200).json(profiles);
  });
};
const findById = (req, res) => {
  Pelicula.findById(req.params.id, (err, profile) => {
    if (err) return res.send(500).send(err.message);
    console.log(`GET /profile/${req.params.id}`);
    res.status(200).json(profile);
  });
};
const addPelicula = async (req, res) => {
  try {
    let peli = new Pelicula(req.body);
    await peli.save();
    res.status(200).json(peli);
  } catch (error) {
    return res.status(500).send(error.message);

  }
};
const deletePelicula = (req, res) => {
  Pelicula.findById(req.params.id, (err, profile) => {
    profile.remove((err) => {
      if (err) return res.status(500).send(err.message);
      res.status(200).send();
    });
  });
};

module.exports = { findAllPeliculas, findById, addPelicula, deletePelicula };