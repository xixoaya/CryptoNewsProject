function split(text, pattern) {
    // TO DO
    var parts = []
    var part = ''

    if (pattern === '') {
        for (let i = 0; i < text.length; i++) {
            const element = text[i];

            parts[i] = element
            
        }
        
    } else {
        
    for (let i = 0; i < text.length; i++) {
        const character = text[i];
        
        if (character === pattern) {
            parts[parts.length] = part
            
            part = ''
        } else {
            part += character
        }
    }

    parts[parts.length] = part

    }

    return parts
}