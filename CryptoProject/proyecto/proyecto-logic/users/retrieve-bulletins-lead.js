const { models: { Bulletin } } = require('proyecto-data')

// function that receives an Array of BulletinsId and gives back de detail of those.
// details back, title, source, subtitle(if there is), badge.

function retrieveBulletinsLead(arrBulletinsId) {
    return (async () => {

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