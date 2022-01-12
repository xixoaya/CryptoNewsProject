const { retriveBulletinsLead } = require('proyecto-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res) => {
    const { headers: { authorization }, body: arrBulletinsId } = req
    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        const bulletins = await retriveBulletinsLead(arrBulletinsId)
        res.status(201).send(bulletins)

    } catch (err) {
        handleError(err, res)
    }
}