Biblio.prototype.include = function(value) {
    var bool = false
    for (let i = 0; i < this.length; i++) {
        if (value === this[i]) bool = true;
    }
    return bool
}