describe('TEST REPEAT')

//CASE 1
describe('case 1')

var string = 'abc'
var res = repeat(string, 2)

if (typeof res === 'string'
    && res === 'abcabc'
) { success('TEST OK')
    
} else { fail('TEST FAILED')}

//CASE 2
describe('case 2')

var string = 'abc'
var res = repeat(string, -1)

if (typeof res === 'string'
    && res === 'RangeError'
) { success('TEST OK')
    
} else { fail('TEST FAILED')}

//CASE 3
describe('case 3')

var string = 'abc'
var res = repeat(string, 0)

if (typeof res === 'string'
    && res === ''
) { success('TEST OK')
    
} else { fail('TEST FAILED')}

//CASE 4
describe('case 4')

var string = 'abc'
var res = repeat(string, 1)

if (typeof res === 'string'
    && res === 'abc'
) { success('TEST OK')
    
} else { fail('TEST FAILED')}

//CASE 5
describe('case 5')

var string = 'abc'
var res = repeat(string, 3.5)

if (typeof res === 'string'
    && res === 'abcabcabc'
) { success('TEST OK')
    
} else { fail('TEST FAILED')}

//CASE 6
describe('case 6')

var string = 'abc'
var res = repeat(string, 1/0)

if (typeof res === 'string'
    && res === 'RangeError'
) { success('TEST OK')
    
} else { fail('TEST FAILED')}