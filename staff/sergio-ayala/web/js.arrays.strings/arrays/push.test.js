// TODO

describe('TEST PUSH')

//CASE 1

var array1 = [1, 'adiós', 3, 4]
var res = push(array1, 5, 'hola')

if (typeof res === 'number'
    && array1.length === 6
    && res === 6
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

//CASE 2

var array1 = ['gato', 'perro', 'jablí', 'cerdo']
var res = push(array1, 'loro', 'camello', 'león')

// console.log(res)
if (typeof res === 'number'
    && array1.length === 7
    && res === 7
    && array1[4] === 'loro'
    && array1[5] === 'camello'
    && array1[6] === 'león'
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}
// console.log(array1)