const { validateName, validateUsername, validatePassword } = require('./helpers/validators')
const { ConflictError } = require('proyecto-errors')
const { models: { User } } = require('proyecto-data')

function registerUser(name, username, password) {
    validateName(name)
    validateUsername(username)
    validatePassword(password)

    return User.create({ name, username, password })
        .then(() => { })
        .catch(error => {
            debugger
            if (error.code === 11000)
                throw new ConflictError(`User with username ${username} already exists`)

            throw error
        })
}

module.exports = registerUser