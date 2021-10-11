describe('TEST SPLIT')

// CASE 1

var res = split('hola mundo', ' ')

if (res instanceof Array
    && res.length === 2
    && res[0] === 'hola'
    && res [1] === 'mundo')
    success ('TEST OK')
else
    fail ('TEST FAIL')
    
// CASE 2

var res = split('adiós mundo cruel', ' ')

if (res instanceof Array
    && res.length === 3
    && res[0] === 'adiós'
    && res [1] === 'mundo'
    && res [2] === 'cruel')
    {success ('TEST OK')}
else
    {fail ('TEST FAIL');}

// CASE 3

var res = split('adiós,mundo,cruel', ',')

if (res instanceof Array
    && res.length === 3
    && res[0] === 'adiós'
    && res [1] === 'mundo'
    && res [2] === 'cruel')
    {success ('TEST OK')}
else
    {fail ('TEST FAIL');}

// CASE 4

var res = split('hola', '')

if (res instanceof Array
    && res.length === 4
    && res[0] === 'h'
    && res [1] === 'o'
    && res [2] === 'l'
    && res [3] === 'a')
    {success ('TEST OK')}
else
    {fail ('TEST FAIL');}


// CASE 5

var res = split('hola', 'ol')

if (res instanceof Array
    && res.length === 2
    && res[0] === 'h'
    && res [1] === 'a')
    {success ('TEST OK')}
else
    {fail ('TEST FAIL');}


    



