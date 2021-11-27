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

        retrieveUser(id, (err, data) => {
            if (err) handleError(err, res)
            else res.send(data)
        })
    } catch (err) {
        handleError(err, res)
    }
}