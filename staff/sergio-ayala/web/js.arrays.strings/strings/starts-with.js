function startsWith(string, searchElement, position = 0) {
    res = false
    j = 0
    subString = ''

    for (var i = position; string[i] === searchElement[j] ; i++) {
        var char = string[i];
            j++;
            res = true ;
            subString += char;
    }

    res = (subString === searchElement) ? true : false ;
    
    return res
}