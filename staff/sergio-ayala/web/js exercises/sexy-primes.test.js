// Implementar los tests que consideréis necesarios
console.log('TEST SEXY PRIMES')

// CASE 1

var res = sexyPrimes(1, 5)

console.log(res)

if (res instanceof Boolean
    && res === false
    ) { console.log('TEST OK')
} else { console.error('TEST FAILED!!')
    
}

// CASE 2

var res = sexyPrimes(1, 7)

console.log(res)

if (res instanceof Boolean
    && res === true
    ) { console.log('TEST OK')
} else { console.error('TEST FAILED!!')
    
}