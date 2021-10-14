function repeat(string, count) {
    var res = ''
    count = Math.floor(count)

    while (count > 0 && count !== Infinity) {
        res += string;
        count --;
    }

    res = count === 0 ? res : 'RangeError';
    return res;
}