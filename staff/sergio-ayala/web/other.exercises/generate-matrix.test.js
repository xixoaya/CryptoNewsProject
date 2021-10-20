describe('TEST generateMatrix');

// CASE 1

let res = generateMatrix(10, 5, 50)

if (
    res instanceof Array
    && res.length === 10
    && res[0].length === 5
    && (res[0][0] >= 0 && res[0][0] <= 50)
)
    success('test ok')
else
    fail('test failed')

// CASE 2

res = generateMatrix(5, 2, 20)

if (
    res instanceof Array
    && res.length === 5
    && res[0].length === 2
    && (res[0][0] >= 0 && res[0][0] <= 20)
)
    success('test ok')
else
    fail('test failed')

// CASE 3

res = generateMatrix(100, 50, 500)

if (
    res instanceof Array
    && res.length === 100
    && res[0].length === 50
    && (res[0][0] >= 0 && res[0][0] <= 500)
)
    success('test ok')
else
    fail('test failed')