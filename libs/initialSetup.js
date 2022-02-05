
const Pelicula = require("../Modelos/peliculas")
const Model = require("../Modelos/usuario")
const Salas = require("../Modelos/salas")
const { Asientos } = require("../libs/Asientos")

const createpeliculas = async () => {
  try {
    const count = await Pelicula.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Pelicula({
        titulo: "numero", duracion: "60min", calificacion: "7",
        actores: ["ben", "dando"],
        generos: ["drama", "comedia"],
        formatos: ["3d", "blurey", "2d"],
        img: "https://pics.filmaffinity.com/Eternals-388789083-large.jpg"
      }).save(),
      new Pelicula({
        titulo: "numero", duracion: "60min", calificacion: "7",
        actores: ["dando"],
        generos: ["terror", "comedia"],
        formatos: ["3d", "blurey", "2d"],
        img: "https://pics.filmaffinity.com/Eternals-388789083-large.jpg"
      }).save(),
      new Pelicula({
        titulo: "numero", duracion: "60min", calificacion: "7",
        actores: ["ben", "dando"],
        generos: ["drama", "suspenso"],
        formatos: ["3d", "blurey"],
        img: "https://pics.filmaffinity.com/Eternals-388789083-large.jpg"
      }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
const createsala = async () => {
  const counts = await Salas.estimatedDocumentCount();

  try {
    const array1 = Asientos(10, 6);
    const array2 = Asientos(8, 8);
    const array3 = Asientos(8, 6);
    if (counts > 0) return

    const values = await Promise.all([

      new Salas({
        nombre: "A1",
        formatos: ["3D", "2D"],
        asientos: array1,
      }).save(),
      new Salas({
        nombre: "A2",
        formatos: ["2D"],
        asientos: array2,
      }).save(),
      new Salas({
        nombre: "A3",
        formatos: ["3D"],
        asientos: array3,
      }).save(),
    ]);
    console.log(values);

  } catch (error) {
    console.error(error);
  }

}

const verpelicoual = async () => {
  try {
    const datos = await Salas.find();
    console.log(datos)
  } catch (error) {
    console.log(error)
  }

};

module.exports = { createpeliculas, verpelicoual, createsala };