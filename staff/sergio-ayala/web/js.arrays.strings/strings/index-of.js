// TODO implement the standalone version of String.prototype.indexOf()

function indexOf(string, searchElement, index) {
    var position = ''
    var i = index

    if (arguments[1] === '') {
        position = index
    }
    
    if (i >= string.length ) {
        position = string.length
    }

    for (let j = i; j < string.length; j++) {
        const charac = string[j];
        if (charac === searchElement[0]) {
            position = j
            
        } 
    }
    if (position === '') { position = -1}
    return position
}