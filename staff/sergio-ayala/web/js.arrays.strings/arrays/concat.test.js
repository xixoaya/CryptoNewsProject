// TODO

describe('TEST CONCAT')

//  CASE 1

var array1 = ['a', 'b', 'c', 1, 2]
var array2 = ['d', 'e', 'f']
var res = concat(array1, array2)

// console.log(res)

if ( res instanceof Array
    && res.length === array1.length + array2.length
    && res[0] === array1[0]
    && res[1] === array1[1]
    && res[2] === array1[2]
    && res[3] === array1[3]
    && res[4] === array1[4]
    && res[5] === array2[0]
    && res[6] === array2[1]
    && res[7] === array2[2]
   
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

//  CASE 1

var array1 = [1, 2]
var array2 = ['hola', 'e', 'f']
var res = concat(array1, array2)

// console.log(res)

if ( res instanceof Array
    && res.length === array1.length + array2.length
    && res[0] === array1[0]
    && res[1] === array1[1]
    && res[2] === array2[0]
    && res[3] === array2[1]
    && res[4] === array2[2]
   
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}