function invertText(text) {
    // NOTE console.log should not be used here, but return

    var result = ''

    for (let i = text.length - 1; i >= 0 ; i--) {
        const letra = text[i];
        
        var result = result + letra;
    }

    // NOTE use for loop to iterate on each character

    return result
}

function invertText2(txt) {
    var result = '';
    var copyTxt = txt;

    for (let i = 0; i < copyTxt.length; i++) {

        var position = copyTxt.length -1 - i;
        result = result + copyTxt[position];
    }
    
    return result
}

function invertTextArray(txt) {
    var copyTxt = txt;
    return copyTxt.split('').reverse().join('');
}