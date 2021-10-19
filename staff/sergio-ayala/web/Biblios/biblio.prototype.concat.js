Biblio.prototype.concat = function() {
    var temp = new Biblio();

    for (let i = 0; i < this.length; i++) {
        const element = this[i];
        temp[temp.length] = element 
        temp.length++
    }
    
    for (let i = 0; i < arguments.length; i++) {
        var arg = arguments[i] 
        for (let j = 0; j < arg.length; j++) {
            const element = arg[j];
            temp[temp.length] = element 
            temp.length++
        }
    }

    return temp
}