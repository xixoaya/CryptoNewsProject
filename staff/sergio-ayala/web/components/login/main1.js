var title = document.createElement('h1')
title.innerText = 'Login form!'
title.classList.add('title')

// console.dir(title)

document.body.append(title)

// TODO mount a login form with js and append it to the body
var title = document.createElement('h1')
title.innerText = 'Login form!'
title.classList.add('title')

var labelusername = document.createElement('label')
labelusername.innerText = 'Username'
labelusername.classList.add('label')
// labelusername.for.add('username')

document.body.append(labelusername)


var br = document.createElement('br')

var inputusername = document.createElement('input')
inputusername.classList.add('inputform')
inputusername.type.add('text')
inputusername.name.add('username')
inputusername.id.add('username')
inputusername.placeholder.add('Username')

document.body.append(title)
document.body.append(labelusername)