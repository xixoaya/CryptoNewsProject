const { retrieveHomeLatestBulletins } = require('proyecto-logic')
const { handleError } = require('./helpers')

module.exports = async (req, res) => {
    //const { body: arrBulletinsId } = req
    debugger
    try {
        const bulletins = await retrieveHomeLatestBulletins()
        res.status(201).send(bulletins)

    } catch (err) {
        handleError(err, res)
    }
}