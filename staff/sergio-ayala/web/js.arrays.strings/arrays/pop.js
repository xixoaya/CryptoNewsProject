// TODO implement the standalone version of Array.prototype.pop()

// El método pop() elimina el último elemento de un array y lo devuelve. 
// Este método cambia la longitud del array.
// Si se llama a pop() en un array vacío, devuelve undefined

function pop(array) {

    var result = undefined

    if (array.length !== 0) {

        result = array[array.length - 1]

        array.length-- //lo mismo que hacer array.length = array.length -1
    }
   
    return result
}