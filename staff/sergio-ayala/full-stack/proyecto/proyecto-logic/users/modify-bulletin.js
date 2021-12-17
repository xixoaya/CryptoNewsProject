const { models: { Bulletin, LastScrap } } = require('proyecto-data')
const { validateId, validateData } = require('./helpers/validators')
const { NotFoundError } = require('proyecto-errors')
//const { scrapeCTCover , scrapeOBCover , scrapeC24Cover } = require('../bulletins')

// function that receives an Array of BulletinsId and gives back de detail of those.
// details back, title, source, subtitle(if there is), badge.

function modifyBulletin(bulletinId, data) {
    validateId(bulletinId)
    validateData(data)
    
    return (async () => {
        //const arrBulletinsDetail = Bulletin.find()

        const bulletinToModify = await Bulletin.findById({_id: bulletinId });

        if(!bulletinToModify) throw new NotFoundError(`Not news founded with id ${bulletinId}`)

        const { clicks, clicksFav, clicksQueue } = data

        for (const property in data) {
            if (!property.includes("Unknown") && typeof property !== 'undefined' && property !== 'url' )
                bulletinToModify[property] = data[property]
           
        }

        await bulletinToModify.save()
        
    })()
}

module.exports = modifyBulletin