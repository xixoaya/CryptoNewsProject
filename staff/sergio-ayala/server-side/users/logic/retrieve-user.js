// const { readFile } = require("fs");
const { ObjectId } = require('mongodb')
const context = require('./context')
const {validateId, validateCallback} = require('./helpers/validators')
const { NotFoundError } = require('errors')


function retrieveUser(id, callback) {
    validateId(id)
    validateCallback(callback)

    const users = context.db.collection('users')

    users.findOne({_id: ObjectId(id)}, (error, user) => {
        if (error) return callback(error)
        if (!user) return callback(new NotFoundError(`No user with the id: ${id}`))

        user.id = user._id.toString()
        
        delete user._id
        delete user.password
    

        callback(null, user)


    })
}
module.exports = retrieveUser