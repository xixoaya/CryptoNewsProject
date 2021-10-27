// Logics

/**
 * Sign Up user in the aplication
 * 
 * @param {string} name The name of the user to be registered.
 * @param {string} lastName The last name of the user to be registered.
 * @param {string} username The username of the user to be registered, has to be an email
 * @param {string} password The password of the user to be registered.
 * @param {boolean} checkbox the checkbox means user has accepted terms
 * @param {function} callback The callback function to manage the response.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format
 */

function signUpUser(name, lastName, username, password, checkbox, callback) {
    if (!typeof name === 'string') {throw new TypeError(name + ' is not a string')}
    if (!name.trim().length) throw new Error('Name is empty')
    if (!name.trim() === name) throw new Error('Name has spaces around')

    if (!typeof lastName === 'string') {throw new TypeError(lastName + ' is not a string')}
    if (!lastName.trim().length) throw new Error('last Name is empty')
    if (!lastName.trim() === lastName) throw new Error('last Name has spaces around')

    if (!typeof username === 'string') {throw new TypeError( username + ' is not a string')}
    if (!username.trim().length) throw new Error('Email is empty')
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(username)) throw new Error(username + ' is not an e-mail')
    if (username.length < 4) {throw new Error ('Username is to short')}

    if (!typeof password === 'string') {throw new TypeError(password +' is not a string')}
    if (!password.trim().length) throw new Error('Password is empty')
    if (/\r?\n|\r|\t| /g.test(password)) throw new Error('Password has blank spaces')
    if (password.length < 5) {throw new Error ('Password has less than five characters')}

    if (!checkbox.checked) throw new Error('you have to accept terms')

    if (!typeof callback === 'function') {throw new TypeError(callback + 'is not a function')}

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


/**
 * Sign In user in the aplication, verifys first two arguments
 * 
 * @param {string} username The username of the user to be registered, has to be an email
 * @param {string} password The password of the user to be registered.
 * @param {function} callback The callback function to manage the response.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format
 */
function signInUser(username, password, callback) {
    if (!typeof username === 'string') {throw new TypeError( username + ' is not a string')}
    if (!username.trim().length) throw new Error('Email is empty')
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(username)) throw new Error(username + ' is not an e-mail')
    if (username.length < 4) {throw new Error ('Username is to short')}

    if (!typeof password === 'string') {throw new TypeError(password +' is not a string')}
    if (!password.trim().length) throw new Error('Password is empty')
    if (/\r?\n|\r|\t| /g.test(password)) throw new Error('Password has blank spaces')
    if (password.length < 5) {throw new Error ('Password has less than five characters')}

    if (!typeof callback === 'function') {throw new TypeError(callback + 'is not a function')}

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
/**
 * Sign In user in the aplication, verifys first two arguments
 * 
 * @param {string} token The token of the user to be registered, has to be an email
 * @param {function} callback The callback function to manage the response.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format
 */
function retrieveUser(token, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')
    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 401 || status === 404) {
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
/**
 * 
 * @param {string} oldPassword The old password the user wants change
 * @param {string} password The new password the user wants to be registered.
 * @param {function} callback The callback function to manage the response.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format
 */
function updatePassword(token, oldPassword, password, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')
    
    if (!typeof oldPassword === 'string') {throw new TypeError(oldPassword +' is not a string')}
    if (!oldPassword.trim().length) throw new Error('Old Password is empty')
    if (/\r?\n|\r|\t| /g.test(oldPassword)) throw new Error('Old Password has blank spaces')
    if (oldPassword.length < 5) {throw new Error ('Old Password has less than five characters')}

    if (!typeof password === 'string') {throw new TypeError(password +' is not a string')}
    if (!password.trim().length) throw new Error('Password is empty')
    if (/\r?\n|\r|\t| /g.test(password)) throw new Error('Password has blank spaces')
    if (password.length < 5) {throw new Error ('Password has less than five characters')}

    if (!typeof callback === 'function') {throw new TypeError(callback + 'is not a function')}

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

/**
 * 
 * @param {string} password The new password the user wants to be registered.
 * @param {function} callback The callback function to manage the response.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format
 */
function unregisterUser(token, password, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

    if (!typeof password === 'string') {throw new TypeError(password +' is not a string')}
    if (!password.trim().length) throw new Error('Password is empty')
    if (/\r?\n|\r|\t| /g.test(password)) throw new Error('Password has blank spaces')
    if (password.length < 5) {throw new Error ('Password has less than five characters')}

    if (!typeof callback === 'function') {throw new TypeError(callback + 'is not a function')}

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