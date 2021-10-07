function randomNumbers(n, m) {
    
    var arr = [];
    for (var i=0, t=40; i<t; i++) {
    arr.push(Math.round(Math.random() * t))
    }
    console.log(arr);

    return arr;
}


// Debemos generar un vector (array) de números aleatorios
// El array debe tener una longitud de n
// Los elementos deben ser números aleatorios entre 0 y m