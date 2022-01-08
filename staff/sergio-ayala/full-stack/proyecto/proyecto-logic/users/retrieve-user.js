const { models: { User } } = require('proyecto-data')
const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('proyecto-errors')


function retrieveUser(id) {
    validateId(id)

    return User.findById(id).lean()
        .then(user => {
            if (!user) throw new NotFoundError(`No user with the id: ${id}`)

            user.id = user._id.toString()

            delete user._id
            delete user.password
            delete user.__v

            return user
        })
}
module.exports = retrieveUser