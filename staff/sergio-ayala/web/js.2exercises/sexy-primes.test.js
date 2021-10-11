// Implementar los tests que consideréis necesarios
describe('TEST SEXY PRIMES')

// CASE 1

var res = sexyPrimes(1, 5)


if ( typeof res === 'boolean' 
    && res === false
    ) { success('TEST OK')
} else { fail('TEST FAILED!!')
    
}

// CASE 2

var res = sexyPrimes(11, 5)


if ( typeof res === 'boolean'
    && res === true
    ) { success('TEST OK')
} else { fail('TEST FAILED!!')
    
}

// CASE 3

var res = sexyPrimes(5,11)

if ( typeof res === 'boolean'
    && res === true
    ) { success('TEST OK')
} else { fail('TEST FAILED!!')
    
}

// CASE 4

var res = sexyPrimes(10, 16)

// console.log(res)

if ( typeof res === 'boolean' 
    && res === false
    ) { success('TEST OK')
} else { fail('TEST FAILED!!')
    
}

// CASE 5

var res = sexyPrimes(-5, -11)

if ( typeof res === 'boolean'
    && res === false
    ) { success('TEST OK')
} else { fail('TEST FAILED!!')
    
}