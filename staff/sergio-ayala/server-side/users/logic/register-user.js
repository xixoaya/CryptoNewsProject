const context = require('./context')
const {validateName, validateUsername, validatePassword, validateCallback,} = require('./helpers/validators')
const { ConflictError} = require('errors')

function registerUser( name, username, password , callback) {
    validateName(name)
    validateUsername(username)
    validatePassword(password)
    validateCallback(callback)

    const users = context.db.collection('users')

    users.insertOne({ name, username, password }, error => {
        if (error) {
            if (error.code === 11000) callback(new ConflictError(`User with username ${username} already exists`))
            else callback(error)
        } else
        callback(null)
    })
}

module.exports = registerUser