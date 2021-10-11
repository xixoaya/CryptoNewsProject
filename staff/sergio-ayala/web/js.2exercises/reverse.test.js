describe('TEST REVERSE')

// CASE 1

var array = [1, 2, 3]
var res = reverse(array)

if (res instanceof Array
&& res.length === array.length
&& res === array
&& res[0] === 3
&& res[1] === 2
&& res [2] ===1){
  success('TEST OK')}
else { fail('TEST FAILED')}


// CASE 2

var array = ['a', 'b', 'c']
var res = reverse(array)

if (res instanceof Array
&& res.length === array.length
&& res === array
&& res[0] === 'c'
&& res[1] === 'b'
&& res [2] === 'a'){
  success('TEST OK')}
else { fail('TEST FAILED')}

// CASE 3

var array = [3, 6, 8, 4, 2, 'c']
var res = reverse(array)

if (res instanceof Array
&& res.length === array.length
&& res === array
&& res[0] === 'c'
&& res[1] === 2
&& res [2] ===4
&& res[3] === 8
&& res[4] === 6
&& res [5] ===3){
  success('TEST OK')}
else { fail('TEST FAILED')}
