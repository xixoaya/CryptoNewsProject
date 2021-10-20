var title = document.createElement('h1')
title.innerText = 'Login form!'
title.classList.add('title')

console.dir(title)

document.body.append(title)

// TODO mount a login form with js and append it to the body

var login = document.createElement('form')
login.classList.add('panel', 'panel--dark')

document.body.append(login)

var loginTitle = document.createElement('h1')
loginTitle.classList.add('panel__title')
loginTitle.innerText = 'Login'

login.append(loginTitle)

var loginUsernameLabel = document.createElement('label')
loginUsernameLabel.htmlfor = 'username'
loginUsernameLabel.innerText = 'Username'

login.append(loginUsernameLabel)

var loginUsernameInput = document.createElement('input')
loginUsernameInput.classList.add('field')
loginUsernameInput.name = 'username'
loginUsernameInput.id = 'username'
loginUsernameInput.placeholder = 'Username'
loginUsernameInput.type = 'text'

login.append(loginUsernameInput)

var loginPasswordLabel = document.createElement('label')
loginPasswordLabel.htmlfor = 'password'
loginPasswordLabel.innerText = 'password'

login.append(loginPasswordLabel)

var loginPasswordInput = document.createElement('input')
loginPasswordInput.classList.add('field')
loginPasswordInput.name = 'password'
loginPasswordInput.id = 'password'
loginPasswordInput.placeholder = 'password'
loginPasswordInput.type = 'text'

login.append(loginPasswordInput)