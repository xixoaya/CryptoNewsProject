console.log('TEST NUMBERS')

var res = numbers([1, -4, 3, -3])

if (res instanceof Array
    && res.length ===3 
    && res[0] === 4
    && res[1] === -7
    && res[2] === -3
    ) {
    console.log('TEST OK!!')
} else { console.error('TEST FAILED!!')
    
}