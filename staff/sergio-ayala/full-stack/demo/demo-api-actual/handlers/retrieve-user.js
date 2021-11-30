const { retrieveUser } = require('users')
const jwt = require('jsonwebtoken')
const { env: {SECRET}} = process
const handleError = require('./helpers/handle-error')

module.exports = (req, res) => {
    const { headers: { authorization } } = req

    try {
        const [, token] = authorization.split(' ')
        const payload = jwt.verify(token, SECRET)
        const { sub: id } = payload

        retrieveUser(id)
            .then(data => res.send(data))
            .catch(err => handleError(err, res))
 
    } catch (err) {
        handleError(err, res)
    }
}