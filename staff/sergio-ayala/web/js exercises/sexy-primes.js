// Los primos sexy son pares de dos primos que están
// separados por 6
    function test_prime(n)
        {

        if (n===1)
        {
            return false;
        }
        else if(n === 2)
        {
            return true;
        }else
        {
            for(var x = 2; x < n; x++)
            {
            if(n % x === 0)
            {
                return false;
            }
            }
            return true;  
        }
}

    // console.log(test_prime(16))

    var difference = function (a, b) { return Math.abs(a - b); }

    // console.log(difference(11, 5))


function sexyPrimes(a, b) {

    if (difference(a, b) !== 6) {
        
        result = false
        
    } else if (test_prime(a) === true && test_prime(b) === true ) {

        result = true
        
    } else { result = false}

    return result // Debe devolver un true o false
}