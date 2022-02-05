const mongoose = require("mongoose");
const Boleto = require("../Modelos/ventaboleto")

const findAllBole = (req, res) => {
  Boleto.find((err, sala) => {
    err && res.send(500).send(err.message);
    console.log("GET /boleto");
    res.status(200).json(sala);
  });
};
const findById = (req, res) => {
  Boleto.findById(req.params.id, (err, bole) => {
    if (err) return res.send(500).send(err.message);
    console.log(`GET /boleto/${req.params.id}`);
    res.status(200).json(bole);
  });
};

//agragar consultas
const asientoocupados = async (req, res, next) => {
  const { fecha, hora, asientos } = req.body;
  try {
    Boleto.find({ "fecha": fecha, "hora": hora, "asientos": { "$in": [...asientos] } }, (err, bolete) => {
      if (err) return res.status(403).send({ auth: false, message: "No Token aws Provided" });
      if (bolete.length > 0) return res.status(403).send({ auth: false, message: [bolete] })
      next();

    })
  } catch (err) {
    return res.status(403).send({ auth: false, message: "No Token aws Provided" });
  }
}
const addBole = async (req, res) => {
  try {
    let peli = new Boleto(req.body);
    await peli.save();
    res.status(200).json(peli);
  } catch (error) {
    return res.status(500).send(error.message);

  }
};



module.exports = { findAllBole, findById, addBole, deleteBole };