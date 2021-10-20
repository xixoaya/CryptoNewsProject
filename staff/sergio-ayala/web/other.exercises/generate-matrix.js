function generateMatrix(n, m, k) {
    var matrix = [];

    for (var i = 0; i < n; i++) {
        var arr = [];

        for (var j = 0; j < m; j++) {
            arr.push(Math.round(Math.random() * k));
        }
        
        matrix.push(arr);
    }

    return matrix;
}

// Debemos generar una matriz (array de arrays) de números aleatorios
// La matriz (el array principal) debe tener una longitud de n
// Los vectores (los arrays secundarios) debe tener una longitud de m
// Los elementos deben ser números aleatorios entre 0 y k