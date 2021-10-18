describe('TEST includes')

describe('Case 1')

var chars = new Biblio('a', 'b', 'c', 'd')
var res = chars.include('b')
if (res === true)
    success('test ok')
else
    fail('test fail')

// describe('Case 2')

// var arr = ['a', true, 3, Infinity, 'b', 'sheep', NaN]
// var res = includes(arr, 'b')
// if (res === 'true')
//     success('test ok')
// else
//     fail('test fail')

// describe('Case 3')

//     var arr = ['a', true, 3, Infinity, 'b', 'sheep', NaN]
//     var res = includes(arr, 3)
//     if (res === 'true')
//         success('test ok')
//     else
//         fail('test fail')