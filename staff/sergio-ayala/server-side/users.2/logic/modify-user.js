const context = require('./context')
const { ObjectId } = require('mongodb')
const {validateId, validateCallback, validateData} = require('./helpers/validators')
const { NotFoundError, ConflictError, CredentialsError } = require('errors')

function modifyUser(id, data, callback) { // data => { name: ?, username: ?, password: ? }
    validateId(id)
    validateData(data)
    validateCallback(callback)

    const users = context.db.collection('users')

    users.findOne({ _id: ObjectId(id) }, (error, user) => {
        if (error) return callback(error)
        if (!user) return callback(new NotFoundError(`No user found with id ${id}`))

        const { password, oldPassword } = data

        if (password) {
            if (oldPassword !== user.password)
                return callback(new CredentialsError(`Wrong credentials`))
            else
                delete data.oldPassword
        }
        users.updateOne({ _id: ObjectId(id) }, {$set : data}, error => {
            if (error) {
                if (error.code === 11000) return callback(new ConflictError(`user with Username ${data.username} already exists`))
                else return callback(error)
            }
            callback(null)
        })
    })


}
module.exports = modifyUser