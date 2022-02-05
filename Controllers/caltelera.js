const mongoose = require("mongoose");
const Cartelera = require("../Modelos/cartelera")

const findAllCartelera = (req, res) => {
  Cartelera.find((err, cartel) => {
    err && res.send(500).send(err.message);
    console.log("GET /cartel");
    res.status(200).json(cartel);
  });
};
const findById = (req, res) => {
  Cartelera.findById(req.params.id, (err, cartel) => {
    if (err) return res.send(500).send(err.message);
    console.log(`GET /cartel/${req.params.id}`);
    res.status(200).json(cartel);
  });
};
const addCartelera = async (req, res) => {
  try {
    let peli = new Cartelera(req.body);

    await peli.save();
    res.status(200).json(peli);
  } catch (error) {
    return res.status(500).send(error.message);

  }
};

const deleteCartelera = (req, res) => {
  Cartelera.findById(req.params.id, (err, cartel) => {
    cartel.remove((err) => {
      if (err) return res.status(500).send(err.message);
      res.status(200).send();
    });
  });
};

module.exports = { findAllCartelera, findById, addCartelera, deleteCartelera };