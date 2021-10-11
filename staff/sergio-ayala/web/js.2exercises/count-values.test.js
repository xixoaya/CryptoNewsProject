console.log('TEST countValues')

var res = countValues([true, true, false, false])

if (res instanceof Array
    && res.length === 3
    && res[0] === 4
    && res[1] === 2
    && res[2] === 2
    ) { console.log('TEST OK!')
    
} else {
    console.error('TEST FAILDED!!!')
}