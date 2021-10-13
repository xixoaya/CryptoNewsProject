// TODO

describe('TEST INDEX OF')

//CASE 1

var string = 'hola como estas?'

var res = indexOf(string, 'co', 3)

// console.log(res)

if (typeof res === 'number'
    && res === 5
) { success('TEST OK')
    
} else { fail('TEST FAILED')}

//CASE 2

var string = 'hola como estas?'

var res = indexOf(string, 'l', 4)

// console.log(res)

if (typeof res === 'number'
    && res === -1
) { success('TEST OK')
    
} else { fail('TEST FAILED')}

//CASE 3

var string = 'hola como estas?'

var res = indexOf(string, '', 4)

// console.log(res)

if (typeof res === 'number'
    && res === 4
) { success('TEST OK')
    
} else { fail('TEST FAILED')}

//CASE 4

var string = 'hola como estas?'

var res = indexOf(string, '', 21)

// console.log(res)

if (typeof res === 'number'
    && res === 16
) { success('TEST OK')
    
} else { fail('TEST FAILED')}

//CASE 5

var string = 'cuñi como estás?'

var res = indexOf(string, 'co')

// console.log(res)

if (typeof res === 'number'
    && res === 5
) { success('TEST OK')
    
} else { fail('TEST FAILED')}

//CASE 6

var string = 'cuñi como estás?'

var res = indexOf(string, 'l')

// console.log(res)

if (typeof res === 'number'
    && res === -1
) { success('TEST OK')
    
} else { fail('TEST FAILED')}