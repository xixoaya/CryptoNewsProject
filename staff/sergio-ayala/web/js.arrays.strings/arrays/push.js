// TODO implement the standalone version of Array.prototype.push()

// arr.push(element1[, ...[, elementN]])
// elementN
// Los elementos a añadir al final del array.
// Valor devuelto
// La nueva propiedad length del objeto sobre el cual se efectuó la llamada.

function push(array) {
    for (let i = 1; i < arguments.length; i++) {
        const element = arguments[i];

        array[array.length] = element
        
    }
    return array.length
}