describe('TEST LAST INDEX OF')

// CASE 1
describe('case 1')

var array1 = [2, 5, 9, 5, 2];
var res = lastIndexOf(array1, 5)

if (typeof res === 'number'
    && res === 3
) { success('TEST OK')
} else { fail('TEST FAILED')
    
}

// CASE 2
describe('case 2')

var array1 = [2, 5, 9, 5, 2];
var res = lastIndexOf(array1, 5, -3)

if (typeof res === 'number'
    && res === 1
) { success('TEST OK')
} else { fail('TEST FAILED')
    
}

// CASE 3
describe('case 3')

var array1 = [2, 5, 9, 5, 2];
var res = lastIndexOf(array1, 6, -3)

if (typeof res === 'number'
    && res === -1
) { success('TEST OK')
} else { fail('TEST FAILED')
    
}

// CASE 4
describe('case 4')

var array1 = [2, 5, 9, 5, 2];
var res = lastIndexOf(array1, 5, -9)

if (typeof res === 'number'
    && res === -1
) { success('TEST OK')
} else { fail('TEST FAILED')
    
}

// CASE 5
describe('case 5')

var array1 = [2, 5, 9, 5, 7, 2];
var res = lastIndexOf(array1, 9, 4)

if (typeof res === 'number'
    && res === 2
) { success('TEST OK')
} else { fail('TEST FAILED')
    
}