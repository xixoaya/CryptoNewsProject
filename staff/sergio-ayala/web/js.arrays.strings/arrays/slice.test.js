describe( 'TEST SLICE')

// CASE 1 
describe('case 1')

var array1 = [1, 2, 3]
var res = slice(array1, 1)

if (res instanceof Array
    && res.length === 2
    && res[0] === 2
    && res[1] === 3
    && array1[0] === 1
    && array1[1] === 2
    && array1[2] === 3
    ) { success('TEST OK')
    
} else { fail('TEST FAIL')
    
}

// CASE 2 
describe('case 2')

var array1 = [1, 2, 3]
var res = slice(array1, 1, 2)

if (res instanceof Array
    && res.length === 1
    && res[0] === 2
    && array1[0] === 1
    && array1[1] === 2
    && array1[2] === 3
    ) { success('TEST OK')
    
} else { fail('TEST FAIL')
    
}

// CASE 3 
describe('case 3')

var array1 = [1, 2, 3, 4, 5]
var res = slice(array1, -4, -1)

if (res instanceof Array
    && res.length === 3
    && res[0] === 2
    && res[1] === 3
    && res[2] === 4
    && array1[0] === 1
    && array1[1] === 2
    && array1[2] === 3
    && array1[3] === 4
    && array1[4] === 5
    ) { success('TEST OK')
    
} else { fail('TEST FAIL')
    
}

// CASE 4
describe('case 4')

var array1 = [1, 2, 3, 4, 5]
var res = slice(array1, -10, 4)

if (res instanceof Array
    && res.length === 4
    && res[0] === 1
    && res[1] === 2
    && res[2] === 3
    && res[3] === 4
    && array1[0] === 1
    && array1[1] === 2
    && array1[2] === 3
    && array1[3] === 4
    && array1[4] === 5
    ) { success('TEST OK')
    
} else { fail('TEST FAIL')
    
}