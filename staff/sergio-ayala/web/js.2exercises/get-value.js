function getValue(numbers, target) {
    // TODO value
    var max = 0
    var min = numbers[0]+1
    var avg = 0

    if (target === 'max') {
        for (let i = 0; i < numbers.length; i++) {
            const count = numbers[i];

            if (count > max) {
                max = count
            }   
        }
        value = max
        
    } else if (target === 'min') {
        for (let i = 0; i < numbers.length; i++) {
            const count = numbers[i];
            if (count < min) {
                min = count
            }
        }

        value = min
        
    } else if (target === 'avg') {
        for (let i = 0; i < numbers.length; i++) {
            const count = numbers[i];
            avg = avg + count
        }
        value = avg / numbers.length
    } 

    return value 
}
