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
    xhr.open('POST', 'https://stark-eyrie-48729.herokuapp.com/api/users/auth')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(user))
}

export default signInUser