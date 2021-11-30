const { registerUser } = require('users')
const handleError = require('./helpers/handle-error')

module.exports = (req, res) => {
    const { body: { name, username, password } } = req
    try {
        registerUser(name, username, password)
            .then(() => res.status(201).send()) 
            .catch(err => handleError(err, res))
            
    } catch (err) {
        handleError(err, res)
    }
}