const { searchBulletinsByQuery } = require('proyecto-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res) => {
    const { headers: { authorization }, query: { q } } = req
    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        const bulletins = await searchBulletinsByQuery( q )
        res.status(201).send(bulletins)

    } catch (err) {
        handleError(err, res)
    }
}