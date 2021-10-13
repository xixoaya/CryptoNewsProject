// TODO

describe('TEST INDEX OF')

// CASE 1

var res = indexOf([2, 3, 6, 7], 3, 2)

// console.log(res)

if (typeof res === 'number'
    && res === -1
    ) { success('TES OK')
    
} else { fail('TEST FAILED')
    
}

// CASE 2

var res = indexOf([2, 3, 6, 7], 3,)

// console.log(res)

if (typeof res === 'number'
    && res === 1
    ) { success('TES OK')
    
} else { fail('TEST FAILED')
    
}

// CASE 3

var res = indexOf([2, 3, 6, 7], 3, -2)

// console.log(res)

if (typeof res === 'number'
    && res === -1
    ) { success('TES OK')
    
} else { fail('TEST FAILED')
    
}

// CASE 4

var res = indexOf([2, 3, 6, 7], 7, -2)

// console.log(res)

if (typeof res === 'number'
    && res === 3
    ) { success('TES OK')
    
} else { fail('TEST FAILED')
    
}

// CASE 5

var res = indexOf([2, 3, 6, 7], 2, -6)

// console.log(res)

if (typeof res === 'number'
    && res === 0
    ) { success('TES OK')
    
} else { fail('TEST FAILED')
    
}

// CASE 6

var res = indexOf([2, 3, 6, 7, 2], 2, -6)

// console.log(res)

if (typeof res === 'number'
    && res === 0
    ) { success('TES OK')
    
} else { fail('TEST FAILED')
    
}