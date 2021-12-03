const registerUser = require('./logic-users/register-user')
const authenticateUser = require('./logic-users/authenticate-user')
const retrieveUser = require('./logic-users/retrieve-user')
const modifyUser = require('./logic-users/modify-user')
const unregisterUser = require('./logic-users/unregister-user')

module.exports = {
    registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    unregisterUser
}
