// TODO implement the standalone version of Array.prototype.concat()

function concat(array1, array2) {
    var finalArray = []
    for (var i = 0; i < arguments.length; i++) {
        var array = arguments[i];

        for (var j = 0; j < array.length; j++) {
            var value = array[j];
            finalArray[finalArray.length] = value
        }
    }
    return finalArray
}

// var array1 = ['a', 'b', 'c']
// var array2 = ['d', 'e', 'f']

// function newArray(array1, array2) {
    
// }