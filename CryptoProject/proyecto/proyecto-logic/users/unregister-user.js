const { models: { User } } = require('proyecto-data')
const { validateId, validatePassword } = require('./helpers/validators')
const { NotFoundError, CredentialsError } = require('proyecto-errors')

const bcrypt = require('bcryptjs')

function unregisterUser(id, password) {
    validateId(id)
    validatePassword(password)

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`User not found with the id: ${id}`)

            if (!bcrypt.compareSync(password, user.password)) throw new CredentialsError('invalid password to delete account')
            
            return User.deleteOne({_id: id})
                  .then(() => { })    
        })

}

module.exports = unregisterUser