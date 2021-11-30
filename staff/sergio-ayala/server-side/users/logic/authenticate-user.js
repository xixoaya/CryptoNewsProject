
const {validateUsername, validatePassword, validateCallback} = require('./helpers/validators')
const {CredentialsError} = require('errors')
const {models: { User } } = require('data')

function authenticateUser(username, password) {
    validateUsername(username)
    validatePassword(password)

    return User.findOne({username, password})
        .then(user => {
            if (!user) throw new CredentialsError('Wrong credentials')

            return user.id
        })

    // users.findOne({username, password}, (error, user) => {
    //     if (error) return callback(error)
    //     if (!user) return callback(new CredentialsError('Wrong credentials'))
    //     callback(null, user._id.toString())
    // })
}
module.exports = authenticateUser