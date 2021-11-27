const { registerUser } = require('users')
const handleError = require('./helpers/handle-error')

module.exports = (req, res) => {
    const { body: { name, username, password } } = req
    try {
        registerUser(name, username, password, (err, data) => {
            if (err) handleError(err, res)
            else res.send(data)
        })

    } catch (err) {
        handleError(err, res)
    }
}