 Biblio.prototype.filter = function(callback){
var result= new Biblio();

    for (let i = 0; i < this.length; i++) {
        var element = this[i];
        
        if(callback(element,i)){
            result[result.length]=element
            result.length ++
        }
    }
    return result
}
