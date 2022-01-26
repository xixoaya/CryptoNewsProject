const { models: { Bulletin, LastScrap } } = require('proyecto-data')
const { validateId, validateData } = require('./helpers/validators')
const { NotFoundError } = require('proyecto-errors')

function modifyBulletin(bulletinId, data) {
    validateId(bulletinId)
    validateData(data)
    
    return (async () => {

        const bulletinToModify = await Bulletin.findById({_id: bulletinId });

        if(!bulletinToModify) throw new NotFoundError(`Not news founded with id ${bulletinId}`)

        const { clicks, clicksFav, clicksQueue } = data

        for (const property in data) {
            if ( property === 'clicks' || property === 'clicksFav' || property === 'clicksQueue' )
                bulletinToModify[property] = data[property]
           
        }

        await bulletinToModify.save()
        
    })()
}

module.exports = modifyBulletin