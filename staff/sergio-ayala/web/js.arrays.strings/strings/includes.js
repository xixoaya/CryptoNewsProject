// function includes(string, searchString, index) {
//     var i = index? index : 0;
//     var solution = false
//     var k = 0

//     for (let j = i; j < string.length; j++) {
//         const element = string[j];

//         if (element === searchString[k]) {
//             k++
//             if (k === searchString.length) {
//                 return true
//             }
//         } else k = 0
        
//     }
//     return solution
// }

function includes(string, searchString, index) {
    var i = index? index : 0;
    var solution = false
    var k = 0

    for (let j = i;(j < string.length && k < searchString.length); j++) {
        const element = string[j];

        if (element === searchString[k]) {k++ ; solution = true} 
        else {k = 0 ; solution = false}
        
    }
    return solution
}