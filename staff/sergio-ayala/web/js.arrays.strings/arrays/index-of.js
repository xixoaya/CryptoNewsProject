// TODO implement the standalone version of Array.prototype.indexOf()

// array.indexOf(searchElement[, fromIndex])
// searchElement Elemento a encontrar en el array.
// fromIndex Optional:
// por defecto index es 0
// Si el índice es mayor o igual a la longitud del array, devuelve -1
// Si el valor es negativo, se toma restando posiciones desde el final del array
// búsqueda se realiza en un orden incremental
// Si el índice calculado es menor de 0, la búsqueda se realizará por todo el array


function indexOf(array, searchElement, index) {

    var i = index? index : 0;
    var position = '';

    // if (arguments.length < 3) { i = 0}

    if (i < 0) { i = array.length + i}
    if (i < 0) { i = 0}

    for (let j = i; j < array.length; j++) {
        const element = array[j];
        if (element === searchElement) { position = j
            return position
        }
    }

    if (position === '' || i >= array.length) { position = -1}


    return position

}
    
