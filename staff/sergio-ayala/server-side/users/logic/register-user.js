// const context = require('./context')
const { validateName, validateUsername, validatePassword } = require('./helpers/validators')
const { ConflictError } = require('errors')
const { models: { User } } = require('data')

function registerUser(name, username, password) {
    validateName(name)
    validateUsername(username)
    validatePassword(password)
    // validateCallback(callback)

    // const users = context.db.collection('users')

    return User.create({ name, username, password })
        .then(() => { })
        .catch(error => {
            debugger
            if (error.code === 11000)
                throw new ConflictError(`User with username ${username} already exists`)

            throw error
        })

    // users.insertOne({ name, username, password }, error => {
    //     if (error) {
    //         if (error.code === 11000) callback(new ConflictError(`User with username ${username} already exists`))
    //         else callback(error)
    //     } else
    //     callback(null)
    // })
}

module.exports = registerUser