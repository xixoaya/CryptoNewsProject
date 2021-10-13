function includes(array, searchElement, index) {
    var i = index? index : 0;
    
    if (i < 0) { i = array.length + i}
    if (i < 0) { i = 0}

    for (let j = i; j < array.length; j++) {
        const element = array[j];
        if (searchElement === element) { return true}
    }
    return false
}