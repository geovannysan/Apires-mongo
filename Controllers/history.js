const mongoose = require("mongoose");
const historial = require("../Modelos/historygps")



const histrypost=(req,res)=>{
 try{
let GPS = new historial(req.body);
 await GPS.save();
  res.status(200).json(GPS);
  }catch(error){
    return res.status(500).send(error.message);
  }
};


module.exports={histrypost}