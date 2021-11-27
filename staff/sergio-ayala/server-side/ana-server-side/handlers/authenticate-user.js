const { authenticateUser } = require('users')
const jwt = require('jsonwebtoken')
const { env: {SECRET}} = process
const handleError = require('./helpers/handle-error')

module.exports = (req, res) => {
    const { body: { username, password } } = req
    try {
        authenticateUser(username, password, (err, userId) => {
            if (err) handleError(err, res)
            else {
                const token = jwt.sign({ sub: userId, exp: Math.floor(Date.now() / 1000) + 3600 }, SECRET)
                res.send({ token })
            }
        })

    } catch (err) {
        handleError(err, res)
    }
}