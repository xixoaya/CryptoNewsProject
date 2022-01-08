const { models: { Bulletin, LastScrap } } = require('proyecto-data')
const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('proyecto-errors')
const { scrapeCTCover , scrapeOBCover , scrapeC24Cover } = require('../bulletins')

// function that receives an Array of BulletinsId and gives back de detail of those.
// details back, title, source, subtitle(if there is), badge.

function retrieveBulletinsLead(arrBulletinsId) {
    return (async () => {
        //const arrBulletinsDetail = Bulletin.find()

        const arrBulletinsDetail = await Bulletin.find({ '_id': { $in: arrBulletinsId } }).lean();

        arrBulletinsDetail.forEach(bulletin => {

            bulletin.id = bulletin._id.toString()

            delete bulletin._id
            delete bulletin.__v
            delete bulletin.comments
            delete bulletin.impContent
            delete bulletin.savedDate
            delete bulletin.scrapedType
            delete bulletin.createdTime
            delete bulletin.imageSrc
            delete bulletin.author
            delete bulletin.tags
        })

        
        return arrBulletinsDetail
    })()
}

module.exports = retrieveBulletinsLead