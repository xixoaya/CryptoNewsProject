// Logics

function signUpUser(name, lastName, username, password, checkbox, callback) {
    if (!name.length) throw new Error('name is empty')
    if (!lastName.length) throw new Error('Last name is empty')
    if (!username.length) throw new Error('username is empty')
    if (!password.length) throw new Error('password is empty')
    if (!checkbox.checked) throw new Error('you have to accept terms')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 409 || status === 400) {
            var response = JSON.parse(xhr.responseText)
            var message = response.error
            callback(new Error(message))
        } else if (status === 201) {
            callback(null)
        }
    }
    var user = {
        name: name,
        lastName: lastName,
        username: username,
        password: password,
        termsAccepted: checkbox
    }
    xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(user))
}

function signInUser(username, password, callback) {
    if (!username.length) throw new Error('username is empty')
    if (!password.length) throw new Error('password is empty')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 401) {
            var response = JSON.parse(xhr.responseText)
            var message = response.error
            callback(new Error(message))

        } else if (status === 200) {
            var response = JSON.parse(xhr.responseText)
            var token = response.token
            callback(null, token)
        }
    }
    var user = {
        username: username,
        password: password
    }
    xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users/auth')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(user))
}

function retrieveUser(token, callback) {
    if (!token) throw new Error('Invalid Token')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 401) {
            var response = JSON.parse(xhr.responseText)
            var message = response.error
            callback(new Error(message))

        } else if (status === 200) {
            var user = JSON.parse(xhr.responseText)
            callback(null, user)
        }
    }
    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    xhr.send()
}

function updatePassword(oldPassword, password, callback) {
    if (!oldPassword.length) throw new Error('Old password is empty')
    if (!password.length) throw new Error('New password is empty')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status
        if (status === 400 || status === 401) {
            var response = JSON.parse(xhr.responseText)
            var message = response.error
            callback(new Error(message))

        } else if (status === 204) {
            callback(null)
        }
    }
    var user = {
        oldPassword: oldPassword,
        password: password
    }
    xhr.open('PATCH', 'https://b00tc4mp.herokuapp.com/api/v2/users')
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(user))
}

function unregisterUser(password, callback) {
    if (!password.length) throw new Error('Password is empty')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 401 || status === 400 || status === 404) {
            var response = JSON.parse(xhr.responseText)
            var message = response.error
            callback(new Error(message))
        }
        if (status === 204) {
            callback(null)
        }  
    }
    var user = {password: password}
    xhr.open('DELETE', 'https://b00tc4mp.herokuapp.com/api/v2/users')
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(user))
}