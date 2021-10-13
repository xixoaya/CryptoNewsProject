// TODO implement the standalone version of String.prototype.indexOf()

function indexOf(string, searchElement, index) {
    var position = ''
    var i = index? index : 0;
    var k = 0

    if (arguments[1] === '') {
        position = index
    }
    // if (arguments.length === 2) { !!era para hacer lo mismo que se ha añadido a var i!!
    //     i = 0
    // }
    
    if (i >= string.length ) {
        position = string.length
    }

    for (let j = i; j < string.length; j++) {
        const charac = string[j];
        if (charac === searchElement[k]) {
           k++
            
           if (k === searchElement.length) {
                return j - k + 1
            } 
            
        } else {k = 0}
    }
    if (position === '') { position = -1}
    return position
}