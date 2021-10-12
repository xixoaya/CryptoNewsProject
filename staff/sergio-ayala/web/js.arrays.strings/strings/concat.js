// TODO implement the standalone version of String.prototype.concat()

function concat(string, /* ... */) {

    var finalString = ''

    for (let i = 0; i < arguments.length; i++) {
        const string = arguments[i];

        finalString += string 
    }
    return finalString
}