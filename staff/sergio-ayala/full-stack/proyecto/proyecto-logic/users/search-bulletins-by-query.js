const { models: { Bulletin, Search } } = require('proyecto-data')
const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('proyecto-errors')
const { scrapCTSearch, scrapOBSearch, scrapeC24Search } = require('../bulletins')

function retrieveSearchedBulletins(query) {
    return (async () => {

        let lastQuerySearchOB = await Search.findOne({ query, source: 'observatorioblockchain' }).lean()
        let lastQuerySearchCT = await Search.findOne({ query, source: 'cointelegraph' }).lean()
        let lastQuerySearchC24 = await Search.findOne({ query, source: 'cripto247' }).lean()

        debugger

        if (!lastQuerySearchOB || !lastQuerySearchCT || !lastQuerySearchC24) {
            await Promise.all([scrapCTSearch(query), scrapOBSearch(query), scrapeC24Search(query)])
            // await Search.create({ lastUpdate: Date.now() })
            lastQuerySearchOB = await Search.findOne({ query, source: 'observatorioblockchain' }).lean()
            lastQuerySearchCT = await Search.findOne({ query, source: 'cointelegraph' }).lean()
            lastQuerySearchC24 = await Search.findOne({ query, source: 'cripto247' }).lean()
            //const lastQuerySearch2 = await Search.find({ query: searchedquery }).lean()
        } else {
            const lastTimeSearchedOB = lastQuerySearchOB.lastUpdate.getTime()
            const lastTimeSearchedCT = lastQuerySearchCT.lastUpdate.getTime()
            const lastTimeSearchedC24 = lastQuerySearchC24.lastUpdate.getTime()
            const actualTime = new Date().getTime()

            const diferencetimeOB = actualTime - lastTimeSearchedOB
            const hoursSinceSearchOB = Math.round(diferencetimeOB / 3600000)

            const diferencetimeCT = actualTime - lastTimeSearchedCT
            const hoursSinceSearchCT = Math.round(diferencetimeCT / 3600000)

            const diferencetimeC24 = actualTime - lastTimeSearchedC24
            const hoursSinceSearchC24 = Math.round(diferencetimeC24 / 3600000)

            if (hoursSinceSearchOB >= 24 || hoursSinceSearchCT >= 24 || hoursSinceSearchC24 >= 24) {
                await Promise.all([scrapCTSearch(query), scrapOBSearch(query), scrapeC24Search(query)])
                // lastQuerySearch[lastUpdate] = Date.now()
                // await lastQuerySearch.save()

                lastQuerySearchOB = await Search.findOne({ query, source: 'observatorioblockchain' }).lean()
                lastQuerySearchCT = await Search.findOne({ query, source: 'cointelegraph' }).lean()
                lastQuerySearchC24 = await Search.findOne({ query, source: 'cripto247' }).lean()
                //const lastQuerySearch2 = await Search.find({ query: searchedquery }).lean()
            }
        }
        debugger
        const arrBulletinsOBQueryIds = lastQuerySearchOB.bulletins.map(id => id)
        const arrBulletinsCTQueryIds = lastQuerySearchCT.bulletins.map(id => id)
        const arrBulletinsC24QueryIds = lastQuerySearchC24.bulletins.map(id => id)

        const allArrBulletinsByQueryIds = arrBulletinsOBQueryIds.concat(arrBulletinsCTQueryIds).concat(arrBulletinsC24QueryIds)

        function compare(a, b) {
            if ((((a.clicks ? a.clicks : 0) * 0.7) + ((a.clicksFav ? a.clicksFav : 0) * 1) + ((a.clicksQueue ? a.clicksQueue : 0) * 0.5)) > (((b.clicks ? b.clicks : 0) * 0.7) + ((b.clicksFav ? b.clicksFav : 0) * 1) + ((b.clicksQueue ? b.clicksQueue : 0) * 0.5))) {
                return 1;
            }

            if ((((a.clicks ? a.clicks : 0) * 0.7) + ((a.clicksFav ? a.clicksFav : 0) * 1) + ((a.clicksQueue ? a.clicksQueue : 0) * 0.5)) < (((b.clicks ? b.clicks : 0) * 0.7) + ((b.clicksFav ? b.clicksFav : 0) * 1) + ((b.clicksQueue ? b.clicksQueue : 0) * 0.5))) {
                return -1;
            }

            return 0;
        }
        function shuffle(array) {
            let currentIndex = array.length, randomIndex;

            // While there remain elements to shuffle...
            while (currentIndex != 0) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }

            return array;
        }

        shuffle(allArrBulletinsByQueryIds)

        allArrBulletinsByQueryIds.sort(compare);
        debugger
        return allArrBulletinsByQueryIds
    })()
}

module.exports = retrieveSearchedBulletins