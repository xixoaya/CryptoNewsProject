// TODO

describe('TEST POP')

//CASE 1

var array1 = [2, 5, 6, 8]
var res = pop(array1)

// console.log(res)

if (typeof res === 'number'
    && array1.length === 3
    && res === 8
) {
    success('TEST OK')

} else {
    fail('TEST FAILED')

}

//CASE 2

var array1 = ['hola', 'muy bien', 'pues aquí', 'ya voy']
var res = pop(array1)

// console.log(res)

if (typeof res === 'string'
    && array1.length === 3
    && res === 'ya voy'
) {
    success('TEST OK')

} else {
    fail('TEST FAILED')

}

//CASE 3

var array1 = []
var res = pop(array1)

// console.log(res)

if (typeof res === 'undefined'
    && array1.length === 0
    && res === undefined
) {
    success('TEST OK')

} else {
    fail('TEST FAILED')

}