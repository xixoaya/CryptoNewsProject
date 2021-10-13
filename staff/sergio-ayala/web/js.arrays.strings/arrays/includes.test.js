describe('TEST INCLUDES')

// CASE 1
describe('case 1')

array1 = [1, 2, 3];
var res = includes(array1, 3, 1)

if (typeof res === 'boolean'
    && res === true) 
    { success('TEST OK')
    
} else { fail('TEST FAILED')}

// CASE 2
describe('case 2')

array1 = [1, 2, 3];
var res = includes(array1, 3,)

if (typeof res === 'boolean'
    && res === true) 
    { success('TEST OK')
    
} else { fail('TEST FAILED')}

// CASE 3
describe('case 3')

array1 = [1, 2, 3];
var res = includes(array1, 3, -1)

if (typeof res === 'boolean'
    && res === true) 
    { success('TEST OK')
    
} else { fail('TEST FAILED')}

// CASE 4
describe('case 4')

array1 = [1, 2, 3];
var res = includes(array1, 2, -1)

if (typeof res === 'boolean'
    && res === false) 
    { success('TEST OK')
    
} else { fail('TEST FAILED')}

// CASE 5
describe('case 5')

array1 = [1, 2, 3];
var res = includes(array1, 2, -7)

if (typeof res === 'boolean'
    && res === true) 
    { success('TEST OK')
    
} else { fail('TEST FAILED')}

