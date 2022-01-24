
const Pelicula = require("../Modelos/peliculas")
const Model = require("../Modelos/usuario")


 const createpeliculas = async () => {
  try {
  const count = await Pelicula.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;
 
    // Create default Roles
    const values = await Promise.all([
      new Pelicula({ titulo: "numero" ,duracion:"60min",calificacion:"7",
        actores:["ben","dando"],
        generos:["drama","comedia"],
        formatos:["3d","blurey","2d"],
        img:"https://pics.filmaffinity.com/Eternals-388789083-large.jpg"}).save(),
       new Pelicula({ titulo: "numero" ,duracion:"60min",calificacion:"7",
        actores:["dando"],
        generos:["terror","comedia"],
        formatos:["3d","blurey","2d"],
        img:"https://pics.filmaffinity.com/Eternals-388789083-large.jpg"}).save(),
       new Pelicula({ titulo: "numero" ,duracion:"60min",calificacion:"7",
        actores:["ben","dando"],
        generos:["drama","suspenso"], 
        formatos:["3d","blurey"],
        img:"https://pics.filmaffinity.com/Eternals-388789083-large.jpg"}).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
const createsala = async()=>{

}

 const verpelicoual = async()=>{
try{
const datos = await Pelicula.find();
console.log(datos)
}catch(error){
console.log(error)
}

};

module.exports = { createpeliculas ,verpelicoual  };