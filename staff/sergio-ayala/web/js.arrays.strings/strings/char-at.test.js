describe('TEST CHART AT')

// CASE 1
describe('case 1')

var cualquierCadena= "Brave new world";

var res = charAt(cualquierCadena, 2)

if (typeof res === 'string'
    && res === 'a'
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

// CASE 2
describe('case 2')

var cualquierCadena= "Brave new world";

var res = charAt(cualquierCadena, 76)

// console.log(res)

if (typeof res === 'string'
    && res === ''
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

// CASE 3
describe('case 3')

var cualquierCadena= "Brave new world";

var res = charAt(cualquierCadena, -2)

if (typeof res === 'string'
    && res === ''
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}

// CASE 4
describe('case 4')

var cualquierCadena= "Brave new world";

var res = charAt(cualquierCadena)

if (typeof res === 'string'
    && res === 'B'
) { success('TEST OK')
    
} else { fail('TEST FAILED')
    
}