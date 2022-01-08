const { retriveBulletinDetail } = require('proyecto-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res) => {
    const { headers: { authorization } , params: { bulletinId }} = req
    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        const bulletins = await retriveBulletinDetail(bulletinId)
        res.status(201).send(bulletins)

    } catch (err) {
        handleError(err, res)
    }
}