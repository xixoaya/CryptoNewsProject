const registerUser = require('./users/register-user')
const authenticateUser = require('./users/authenticate-user')
const retrieveUser = require('./users/retrieve-user')
const modifyUser = require('./users/modify-user')
const unregisterUser = require('./users/unregister-user')

module.exports = {
    registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    unregisterUser
}
