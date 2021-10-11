// Implementar los tests que consideres necesarios

describe('TEST RANDOM NUMBERS')

// CASE 1

var res = randomNumbers(15, 45)


if ( res instanceof Array 
    && res.length === 15
    && Math.max(...res) < 45
    ) { success('TEST OK')
} else { fail('TEST FAILED!!')
    
}

// CASE 2

var res = randomNumbers(2, 3)


if ( res instanceof Array 
    && res.length === 2
    && Math.max(...res) < 3
    ) { success('TEST OK')
} else { fail('TEST FAILED!!')
    
}