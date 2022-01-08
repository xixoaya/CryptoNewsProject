const { modifyUser } = require('proyecto-logic')
const jwt = require('jsonwebtoken')
const { env: {SECRET}} = process
const handleError = require('./helpers/handle-error')

module.exports = (req, res) => {
    const { headers: { authorization }, body: data } = req
    try {
        const [, token] = authorization.split(' ')
        const payload = jwt.verify(token, SECRET)
        const { sub: id } = payload
        modifyUser(id, data)
            .then(() => res.status(204).send())
            .catch(err => handleError(err, res))

    } catch (err) {
        handleError(err, res)
    }
}