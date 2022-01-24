const mongoose = require("mongoose");
const Salas = require("../Modelos/salas")

const findAllCartelera = (req, res) => {
  Salas.find((err, sala) => {
    err && res.send(500).send(err.message);
    console.log("GET /sala");
    res.status(200).json(sala);
  });
};
const findById = (req, res) => {
  Salas.findById(req.params.id, (err, sala) => {
    if (err) return res.send(500).send(err.message);
    console.log(`GET /sala/${req.params.id}`);
    res.status(200).json(sala);
  });
};

const addCartelera = async (req, res) => {
  try{
let peli = new Salas(req.body);
 await peli.save();
  res.status(200).json(peli);
  }catch(error){
    return res.status(500).send(error.message);

  }};

const deleteCartelera = (req, res) => {
  Salas.findById(req.params.id, (err, sala) => {
    sala.remove((err) => {
      if (err) return res.status(500).send(err.message);
      res.status(200).send();
    });
  });
};

module.exports = { findAllCartelera, findById, addCartelera, deleteCartelera };