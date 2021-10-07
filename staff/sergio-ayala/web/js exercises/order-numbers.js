function orderNumbers(numbers, order) {
    var ordered = []

    if (order === 'asc') {

        ordered = numbers.sort((a, b) => a - b)
                         
    } else if (order === 'desc') {
        ordered = numbers.sort((a, b) => b - a)
    }
    else {
        console.log('El parámetro orden debe ser "asc" o "desc"' )
        ordered = numbers
    }

     // TODO implement me

    return ordered;
}
