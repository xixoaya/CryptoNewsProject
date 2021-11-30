const { mongoose, models: { User } } = require('data')
const {validateId, validateData} = require('./helpers/validators')
const { NotFoundError, ConflictError, CredentialsError } = require('errors')

function modifyUser(id, data) { // data => { name: ?, username: ?, password: ? }
    validateId(id)
    validateData(data)

    
    return User.findById(id)
        .then(user => {
            if (!user)  throw new NotFoundError(`No user found with id ${id}`)
            const { password, oldPassword } = data

            if (password) {
                if (oldPassword !== user.password)
                    throw new CredentialsError(`Wrong credentials`)
                else
                    delete data.oldPassword
            }

            for (const property in data)
                user[property] = data[property]

            return user.save()
                .then(() => {})
                .catch(error => {
                    if (error.code === 11000) 
                        throw new ConflictError(`user with Username ${data.username} already exists`)
                    throw error     
                })
        })
}
module.exports = modifyUser