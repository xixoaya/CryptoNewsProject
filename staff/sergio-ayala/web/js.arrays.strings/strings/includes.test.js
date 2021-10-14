describe('TEST INCLUDES')

// CASE 1
describe('case 1')

var sentence = 'The quick brown fox jumps over the lazy dog.'
var res = includes(sentence, 'fox')

if (typeof res === 'boolean'
    && res === true
    ) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

// CASE 2
describe('case 2')

var sentence = 'The quick brown fox jumps over the lazy dog.'
var res = includes(sentence, 'foxj')

// console.log(res)

if (typeof res === 'boolean'
    && res === false
    ) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

// CASE 3
describe('case 3')

var sentence = 'The quick brown fox jumps over the lazy dog.'
var res = includes(sentence, 'fox j', 35)

if (typeof res === 'boolean'
    && res === false
    ) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

// CASE 4
describe('case 4')

var sentence = 'The quick brown fox jumps over the lazy dog.'
var res = includes(sentence, 'fox j', 12)

if (typeof res === 'boolean'
    && res === true
    ) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}