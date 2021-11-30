
const {validateUsername, validatePassword} = require('./helpers/validators')
const {CredentialsError} = require('proyecto-errors')
const {models: { User } } = require('proyecto-data')

function authenticateUser(username, password) {
    validateUsername(username)
    validatePassword(password)

    return User.findOne({username, password})
        .then(user => {
            if (!user) throw new CredentialsError('Wrong credentials')

            return user.id
        })
}
module.exports = authenticateUser