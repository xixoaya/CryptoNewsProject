const calcPopulation = (natalidad, inmigracion, mortalidad, ayosEstimados, poblacionActual) => {
    var nuevaPoblacion = poblacionActual;
    for (var i = 0; i < ayosEstimados; i++) {
        nuevaPoblacion += (nuevaPoblacion * natalidad / 100);
        nuevaPoblacion += inmigracion;
        nuevaPoblacion -= mortalidad;   
    }
    return Math.round(nuevaPoblacion);
}

// En este ejercicio debemos crear un pequeño programa para calcular el aumento
// de la población de una ciudad. Para ello tendremos en cuenta el
// crecimiento por natalidad en %, inmigración como un valor estático y
// fallecimientos como un valor estático

// 1. Genera una función que espere 5 parámetros de tipo number, el primero será
// el porcentaje de aumento por natalidad, el segundo el crecimiento por
// inmigración, el tercero el decremento por mortalidad, el cuarto los años
// estimados y el 5 la población actual. Esta función debe devolver el número
// total de personas que tendrá la ciudad en los años estimados

// 2. Imprime por pantalla el resultado de invocar a la función