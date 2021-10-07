function numbers(array) { // values es de tipo array
    var totalPositives = 0;
    var totalNegatives = 0;
    var balance = 0;

    for (let i = 0; i < array.length; i++) {
        const numeros = array[i];

        if (numeros >= 0) {
            totalPositives = totalPositives + numeros
        } else {
            totalNegatives = totalNegatives + numeros
        } 
    }
    balance = totalPositives + totalNegatives

    var arrCount = [totalPositives, totalNegatives, balance];
    return arrCount;
}

// La función debe devolver un array con 3 posiciones.

// La primera posición debe ser la suma de los números positivos

// La segunda posición debe ser la suma de los números negativos

// La tercera posición debe ser el resultado de positivos - negativos