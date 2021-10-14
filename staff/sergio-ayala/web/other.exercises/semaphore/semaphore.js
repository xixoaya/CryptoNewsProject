function semaphore(person = "cross", light = "green", cars = "wait") {

    // var res = (person === 'stop') ? true : (cars === 'pass') ? false : true ; 

    var res = (person === 'cross' && cars === 'pass') ? false : true ; 

    return res
}


// Genera una función que devuelva si el peaton vive o muere (true o false)
// Implementa la solución solamente con ifs ternarios.