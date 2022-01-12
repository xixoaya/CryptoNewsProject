const { models: { Bulletin, LastScrap } } = require('proyecto-data')
const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('proyecto-errors')
const { scrapeC24Bulletin , scrapeOBBulletin , scrapeCTBulletin } = require('../bulletins')

function retrieveBulletinDetail(bulletinId) {
    validateId(bulletinId)
    return (async () => {
        debugger

        let bulletin = await Bulletin.findById({_id: bulletinId}).lean()

        if(!bulletin) throw new NotFoundError(`Not news founded with id ${bulletinId}`)

        if(!bulletin.impContent.length) {
            const {url, source} = bulletin

            if (source.includes('cointelegraph')) await scrapeCTBulletin(url)
            if (source.includes('observatorioblockchain')) await scrapeOBBulletin(url)
            if (source.includes('cripto247')) await scrapeC24Bulletin(url)

            debugger
            
            const bulletin2 = await Bulletin.findById({_id: bulletinId}).lean()
            debugger
            if(!bulletin2.impContent.length) throw new NotFoundError(`Not Content found for the new ${bulletin.title}`)

            bulletin = bulletin2
        }

        bulletin.id = bulletin._id.toString()

        delete bulletin._id

        delete bulletin.__v

        debugger

        return bulletin

    })()
}

module.exports = retrieveBulletinDetail