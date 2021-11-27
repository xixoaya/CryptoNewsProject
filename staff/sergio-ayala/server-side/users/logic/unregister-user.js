const context = require('./context')
const { ObjectId } = require('mongodb')
const { validateId, validatePassword, validateCallback } = require('./helpers/validators')
const { NotFoundError, CredentialsError } = require('errors')

function unregisterUser(id, password, callback) {
    validateId(id)
    validatePassword(password)
    validateCallback(callback)

    const users = context.db.collection('users')

    users.findOne({ _id: ObjectId(id) }, (error, user) => {
        if (error) return callback(error)
        if (!user) return callback(new NotFoundError(`User not found with the id: ${id}`))

        if (password === user.password) {
            users.deleteOne({ _id: ObjectId(id) }, error => {
                if (error) return callback(error)
                return callback(null)
            })

        } else return callback(new CredentialsError('invalid password to delete account'))


    })

}

module.exports = unregisterUser