// TODO implement the standalone version of Array.prototype.pop()

// El método pop() elimina el último elemento de un array y lo devuelve. 
// Este método cambia la longitud del array.
// Si se llama a pop() en un array vacío, devuelve undefined

function pop(array) {

    var result = undefined
    var copyArray = array

    if (array.length !== 0) {
        
        result = array[array.length-1]

       copyArray.length = array.length -1 
    }
    array = copyArray
    return result
}