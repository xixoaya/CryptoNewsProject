const { models: { Bulletin, LastScrap } } = require('proyecto-data')
const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('proyecto-errors')
const { scrapeCTCover, scrapeOBCover, scrapeC24Cover } = require('../bulletins')

function retrieveHomeBulletins() {
    // sincedate, limit
    return (async () => {

        let lastHomeScrapDb = await LastScrap.find().sort({ _id: -1 }).limit(1).lean()

        if (!lastHomeScrapDb.length) {
            await LastScrap.create({ lastUpdate: Date.now() })
            awaitromise.all([scrapeCTCover(), scrapeOBCover(), scrapeC24Cover()])
            lastHomeScrapDb = await LastScrap.find().sort({ _id: -1 }).limit(1).lean()
        }

        const lastTimeScraped = lastHomeScrapDb[0].lastUpdate.getTime()
        const actualTime = new Date().getTime()
        const diferencetime = actualTime - lastTimeScraped
        const hoursSinceScrap = Math.round(diferencetime / 3600000)

        if (hoursSinceScrap >= 6) {
            Promise.all([scrapeCTCover(), scrapeOBCover(), scrapeC24Cover()])
        }

        const lastHomeOBBulletins = await Bulletin.find({ scrapedType: 'cover', source: 'observatorioblockchain' }).sort({ _id: -1 }).limit(10).lean()
        const lastHomeCTBulletins = await Bulletin.find({ scrapedType: 'cover', source: 'cointelegraph' }).sort({ _id: -1 }).limit(50).lean()
        const lastHomeC24Bulletins = await Bulletin.find({ scrapedType: 'cover', source: 'cripto247' }).sort({ _id: -1 }).limit(10).lean()

        const lastHomeBulletins = lastHomeOBBulletins.concat(lastHomeCTBulletins).concat(lastHomeC24Bulletins)

        debugger
        lastHomeBulletins.forEach(bulletin => {

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

        function compare( a, b ) {
            if ((((a.clicks ? a.clicks : 0) * 0.7) + ((a.clicksFav ? a.clicksFav : 0 ) * 1) + ((a.clicksQueue ? a.clicksQueue : 0 ) * 0.5)) > (((b.clicks ? b.clicks : 0) * 0.7) + ((b.clicksFav ? b.clicksFav : 0 ) * 1) + ((b.clicksQueue ? b.clicksQueue : 0 ) * 0.5))) {
                return 1;
            }
            if ((((a.clicks ? a.clicks : 0) * 0.7) + ((a.clicksFav ? a.clicksFav : 0 ) * 1) + ((a.clicksQueue ? a.clicksQueue : 0 ) * 0.5)) < (((b.clicks ? b.clicks : 0) * 0.7) + ((b.clicksFav ? b.clicksFav : 0 ) * 1) + ((b.clicksQueue ? b.clicksQueue : 0 ) * 0.5))) {
                return -1;
            }
            return 0;
          }

        lastHomeBulletins.sort(compare);

        //funciona, falta ordenarlas por clicks

        await LastScrap.create({ lastUpdate: Date.now() })

        debugger
        return lastHomeBulletins

    })()
}
module.exports = retrieveHomeBulletins

// retrieveNews (inicio=Date.now()-1dia, fin = Date.now(), limit=20) => {
//     News.finnd({})
// }