function countValues(array) { // values es de tipo array
    var totalItems = 0;
    var totalTrue = 0;
    var totalFalse = 0;

    for (let i = 0; i < array.length; i++) {

        if (array[i] === true) {
            totalTrue = totalTrue + 1
            
        } else {
            totalFalse = totalFalse + 1
            
        }
    }

    totalItems = array.length

    var arrCount = [totalItems, totalTrue, totalFalse];
    return arrCount;
}

// La función debe devolver un array con 3 posiciones.

// La primera posición debe ser el número total de elementos del array
// que nos pasa el usuario

// La segunda posición debe ser el número de elementos true que posee
// el array

// La tercera posición debe ser el número de elementos false que posee
// el array