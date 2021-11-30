const { unregisterUser } = require('users')
const jwt = require('jsonwebtoken')
const { env: {SECRET}} = process
const handleError = require('./helpers/handle-error')


module.exports = (req, res) => {
    const { headers: { authorization }, body: {password} } = req

    try {
        const [, token] = authorization.split(' ')
        const payload = jwt.verify(token, SECRET)
        const { sub: id } = payload
        unregisterUser(id, password)
            .then(() => res.status(204).send())
            .catch(err => handleError(err, res))

    } catch (err) {
        handleError(err, res)
    }
}