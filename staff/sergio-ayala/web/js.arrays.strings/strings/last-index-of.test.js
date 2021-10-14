describe('TEST LAST INDEX OF')

//CASE 1
describe('case 1')

var string = 'Brave new world.'
var res = lastIndexOf(string, 'w')

if (typeof res === 'number'
    && res === 10
) success('TEST OK')
else fail('TEST FAILED')


//CASE 2
describe('case 2')

var string = 'Brave new world.'
var res = lastIndexOf(string, 'w', 9)

if (typeof res === 'number'
    && res === 8
) success('TEST OK')
else fail('TEST FAILED')

//CASE 3
describe('case 3')

var string = 'Brave new world.'
var res = lastIndexOf(string, 'new')

if (typeof res === 'number'
    && res === 6
) success('TEST OK')
else fail('TEST FAILED')

//CASE 4
describe('case 4')

var string = 'Brave new world.'
var res = lastIndexOf(string, 'enew')

if (typeof res === 'number'
    && res === -1
) success('TEST OK')
else fail('TEST FAILED')

//CASE 5
describe('case 5')

var string = 'Brave new world.'
var res = lastIndexOf(string, 'new', 7)

if (typeof res === 'number'
    && res === -1
) success('TEST OK')
else fail('TEST FAILED')