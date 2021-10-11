function countWords(text) {
    var count = 0

    for (let i = 0; i < text.length; i++) {
        const txt = text[i];
        
        if (txt === ' ') {
            count = count + 1
        }

    }

    count ++
    
    // TODO implement me with a for loop (**DO NOT USE** split)

    return count
}