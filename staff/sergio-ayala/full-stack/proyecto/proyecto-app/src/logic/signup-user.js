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

 function signUpUser(name, username, password, callback) {
    if (!typeof name === 'string') {throw new TypeError(name + ' is not a string')}
    if (!name.trim().length) throw new Error('Name is empty')
    if (!name.trim() === name) throw new Error('Name has spaces around')

    // if (!typeof lastName === 'string') {throw new TypeError(lastName + ' is not a string')}
    // if (!lastName.trim().length) throw new Error('last Name is empty')
    // if (!lastName.trim() === lastName) throw new Error('last Name has spaces around')

    if (!typeof username === 'string') {throw new TypeError( username + ' is not a string')}
    if (!username.trim().length) throw new Error('Email is empty')
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(username)) throw new Error(username + ' is not an e-mail')
    if (username.length < 4) {throw new Error ('Username is to short')}

    if (!typeof password === 'string') {throw new TypeError(password +' is not a string')}
    if (!password.trim().length) throw new Error('Password is empty')
    if (/\r?\n|\r|\t| /g.test(password)) throw new Error('Password has blank spaces')
    if (password.length < 5) {throw new Error ('Password has less than five characters')}

    // if (!checkbox) throw new Error('you have to accept terms')

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
        // lastName: lastName,
        username: username,
        password: password,
        // termsAccepted: checkbox
    }
    xhr.open('POST', 'http://localhost:8000/api/users/register')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(user))
}

export default signUpUser