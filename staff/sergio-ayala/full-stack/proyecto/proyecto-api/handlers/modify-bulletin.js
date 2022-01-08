const { modifyBulletin } = require('proyecto-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res) => {
    const { headers: { authorization }, body: data } = req
    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)
        const { id: _id } = data
        await modifyBulletin(_id, data)
        res.status(201).send()

    } catch (err) {
        handleError(err, res)
    }
}