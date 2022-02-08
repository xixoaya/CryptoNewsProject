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
    xhr.open('GET', 'https://stark-eyrie-48729.herokuapp.com/api/users')
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    xhr.send()
}

export default retrieveUser