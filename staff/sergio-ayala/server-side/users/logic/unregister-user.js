const context = require('./context')
const { ObjectId } = require('mongodb')

function unregisterUser(id, password, callback) {
    if (typeof id !== 'string') throw new TypeError('id is not a string')
    if (!id.trim().length) throw new Error('id is empty or blank')
    if (/\r?\n|\r|\t| /g.test(id)) throw new Error('id has blank spaces')
    if (id.length !== 24) throw new Error('id doesn\'t have 24 characters')

    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (!password.trim().length) throw new Error('password is empty or blank')
    if (/\r?\n|\r|\t| /g.test(password)) throw new Error('password has blank spaces')
    if (password.length < 6) throw new Error('password is to short')

    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    const users = context.db.collection('users')

    users.findOne({ _id: ObjectId(id) }, (error, user) => {
        if (error) return callback(error)
        if (!user) return callback(new Error(`User not found with the id: ${id}`))

        if (password === user.password) {
            users.deleteOne({ _id: ObjectId(id) }, error => {
                if (error) return callback(error)
                return callback(null)
            })

        } else return callback(new Error('invalid password to delete account'))

        
    })

}

module.exports = unregisterUser