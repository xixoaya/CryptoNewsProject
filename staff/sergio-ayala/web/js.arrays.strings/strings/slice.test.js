describe('TEST SLICE')

//CASE 1
describe('case 1')

var string1 = 'Hola como estás? todo bien y tu.'
var res = slice(string1, 17, 31)

console.log(res)

if (typeof res === 'string'
    && res === 'todo bien y tu'
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

//CASE 2
describe('case 2')

var string1 = 'Hola como estás? todo bien y tu.'
var res = slice(string1, 17, -1)

console.log(res)

if (typeof res === 'string'
    && res === 'todo bien y tu'
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

//CASE 3
describe('case 3')

var string1 = 'Hola como estás? todo bien y tu.'
var res = slice(string1, 0, -1)

console.log(res)

if (typeof res === 'string'
    && res === 'Hola como estás? todo bien y tu'
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

//CASE 4
describe('case 4')

var string1 = 'Hola como estás? todo bien y tu.'
var res = slice(string1, 5)

console.log(res)

if (typeof res === 'string'
    && res === 'como estás? todo bien y tu.'
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

//CASE 5
describe('case 5')

var string1 = 'Hola como estás? todo bien y tu.'
var res = slice(string1)

console.log(res)

if (typeof res === 'string'
    && res === 'Hola como estás? todo bien y tu.'
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

//CASE 6
describe('case 6')

var string1 = 'Hola como estás? todo bien y tu.'
var res = slice(string1, -10, -1)

console.log(res)

if (typeof res === 'string'
    && res === 'bien y tu'
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

