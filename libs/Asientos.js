
function Asientos(fila, columna) {
    const letras = [
        "a", "b", "c", "d", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q"
    ]
    var nuevoArray = new Array(fila);
    //Metemos un array en cada posición
    for (var i = 0; i < nuevoArray.length; i++) {

        nuevoArray[i] = new Array(columna);
    }
    //Volvemos a recorrer los arrays para la 3ª dimensión
    //Recorremos el primer array
    for (var i = 0; i < nuevoArray.length; i++) {
        //Recorremos el array de cada posición i
        for (var j = 0; j < nuevoArray[i].length; j++) {
            //agregamos una columnaen cada array
            nuevoArray[i][j] = { letra: "" + letras[i], "numero": j + "" };
        }
    }
    return nuevoArray;
}
module.exports = { Asientos };