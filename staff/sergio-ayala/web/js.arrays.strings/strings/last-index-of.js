function lastIndexOf(string, searchElement, index) {
    var index = index ? index : string.length;
    var res = -1
    var j = searchElement.length -1

    for (let i = index; (i >= 0 && j >= 0); i--) {
        const char = string[i];
        if (char === searchElement[j]) {
            j--
            res = i
        } else {j = searchElement.length -1 ; res = -1 }
    }
    return res
}