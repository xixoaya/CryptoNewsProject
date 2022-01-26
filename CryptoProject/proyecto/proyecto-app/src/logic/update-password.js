/**
 * 
 * @param {string} token The that identifies the user in that session.
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
    xhr.open('PATCH', 'http://localhost:8000/api/users')
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(user))
}

export default updatePassword