describe('TEST STARTS WITH')

//CASE 1
describe('case 1')

var string1 = 'Hola Maricarmen, tu hija...'
var stringBuscado = 'Hola'

var res = startsWith(string1, stringBuscado)

if (typeof res === 'boolean'
    && res === true
) { success('TEST OK')} 
else { fail('TEST FAILED')}

//CASE 2
describe('case 2')

var string1 = 'Hola Maricarmen, tu hija...'
var stringBuscado = 'hola'

var res = startsWith(string1, stringBuscado)

if (typeof res === 'boolean'
    && res === false
) { success('TEST OK')} 
else { fail('TEST FAILED')}

//CASE 3
describe('case 3')

var string1 = 'Hola Maricarmen, tu hija...'
var stringBuscado = 'Mar'

var res = startsWith(string1, stringBuscado, 5)

if (typeof res === 'boolean'
    && res === true
) { success('TEST OK')} 
else { fail('TEST FAILED')}

//CASE 4
describe('case 4')

var string1 = 'Hola Maricarmen, tu hija...'
var stringBuscado = 'Mar'

var res = startsWith(string1, stringBuscado)

if (typeof res === 'boolean'
    && res === false
) { success('TEST OK')} 
else { fail('TEST FAILED')}

//CASE 5
describe('case 5')

var string1 = 'Hola Maricarmen, tu hija...'
var stringBuscado = 'Mar'

var res = startsWith(string1, stringBuscado, 4)

if (typeof res === 'boolean'
    && res === false
) { success('TEST OK')} 
else { fail('TEST FAILED')}