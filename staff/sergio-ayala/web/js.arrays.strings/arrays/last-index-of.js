function lastIndexOf(array, searchElement, index) {
 
    var i = index? index : array.length -1 ;
    var position = -1

    if (i >= array.length) { i = array.length -1}
    if (i < 0) { i = array.length + i}
    if (i < 0) { return position}

    for (let j = i; j > 0; j--) {
        const element = array[j];
        if (element === searchElement) {
            position = j
            return position   
        }
    }
    return position
}