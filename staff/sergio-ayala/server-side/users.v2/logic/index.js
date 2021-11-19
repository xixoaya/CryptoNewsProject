const auth = require('./auth')
const register = require('./register')
const retrieve = require('./retrieve')
const modify = require('./modify')
const changePassword = require('./change-password')
const unregister = require('./unregister')

module.exports = {
    auth,
    register,
    retrieve,
    modify,
    changePassword,
    unregister
}