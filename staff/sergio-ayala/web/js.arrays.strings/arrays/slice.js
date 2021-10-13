function slice(array = [], inicio = 0, fin = array.length) {
    var arrayCopy = array
    // arrayResult = []
    
    inicio = (inicio < 0) ? inicio = array.length + inicio : inicio;
    // if (inicio < 0) { inicio = array.length + inicio}
    inicio = (inicio < 0) ? 0 : inicio ;
    // if (inicio < 0) { inicio = 0}
    inicio = (inicio > array.length) ? inicio = array.length : inicio;
    // if (inicio > array.length) {inicio = array.length} -> para que no entre al for
    fin = (fin > array.legth) ? fin = array.length : fin;
    // if (fin > array.length) { fin = array.length}
    fin = (fin < 0) ? fin = array.length + fin : fin;
    // if (fin < 0) { fin = array.length + fin}

    arrayResult = []

    for (let i = inicio; i < fin; i++) {
        const element = array[i];
        
        arrayResult[arrayResult.length] = element
    }

    return arrayResult
}