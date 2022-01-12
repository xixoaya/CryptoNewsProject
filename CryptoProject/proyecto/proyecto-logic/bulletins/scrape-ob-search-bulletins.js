// TODO scrape news from site and save into db
const puppeteer = require('puppeteer')
const { models: { Bulletin, Search } } = require('proyecto-data')
/**
 * Scrape CT news and saves them into DB.
 * 
 * @returns {Promise}
 */
function scrapOBSearch(query) { //hacemos el scrapeo por la query(Hacemos la busqueda)
    return (async () => {
        debugger 

        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(`https://observatorioblockchain.com/?s=${query}`)

        const arrOBSearch = await page.evaluate(() => {
            debugger

            const articles = document.querySelectorAll('.d-md-flex.mg-posts-sec-post')

            let results = []

            articles.forEach(article => {
                const title = (article.querySelector('.entry-title.title > a')) ? article.querySelector('.entry-title.title > a').innerText : 'Unknown Title'
                const subTitle = (article.querySelector('.mg-content')) ? article.querySelector('.mg-content').innerText : 'Unknown Subtitle'
                const url = (article.querySelector('.entry-title.title > a')) ? article.querySelector('.entry-title.title > a').href : 'Unknown url'

                const author = (article.querySelector('.auth')) ? article.querySelector('.auth').innerText : 'Unknown Author'
                const createdTime = (article.querySelector('.mg-blog-date > a')) ? article.querySelector('.mg-blog-date > a').innerText : 'Unknown Created Time'
                const badge = (article.querySelector('.mg-blog-category > a')) ? article.querySelector('.mg-blog-category > a').innerText : 'Unknown Tag'

                results.push({ title, subTitle, url, badge, author, createdTime })

            })

            return results

        })

        debugger
        await browser.close()

        const obSearchBulletins = arrOBSearch.map(b => { //en obSearchBulletins tenemos los resultados limpios de la búsqueda
            return {

                author: (b.author.includes('Unknown')) ? null : b.author.trim(),
                badge: (b.badge.includes('Unknown')) ? null : b.badge.trim(),
                subTitle: (b.subTitle.includes('Unknown')) ? null : b.subTitle.trim(),
                title: (b.title.includes('Unknown')) ? null : b.title.trim(),
                url: (b.url.includes('Unknown')) ? null : b.url,
                createdTime: (b.createdTime.includes('Unknown')) ? null : b.createdTime,
                source: 'observatorioblockchain',
                savedDate: new Date()

            }
        })

        const checksPromises = obSearchBulletins.map(({ url }) => Bulletin.exists({ url }))

        const exists = await Promise.all(checksPromises) //exist nos dice si hay nuevos bulletins que añadir si es false es que no está en bbdd
//comprobamos si hany nuevos bulletins que añadir
        const insertions = obSearchBulletins.reduce((accum, bulletin, index) => {
            if (!exists[index]) accum.push(bulletin)

            return accum
        }, []) //insertions devuelve un array de urls encontradas y que no existen en bbdd

        let bulletins

        if (insertions.length) { 
            //aqui creamos en bbdd las noticias con urls que no existiesen
            const creates = insertions.map(element => Bulletin.create(element))
    
            bulletins = await Promise.all(creates)
        }

        //llamo a bbdd para traerme los ids de las url encontreadas con la query pero que ya tenía en bbdd
        const promiseAllBulletins = obSearchBulletins.map(({ url }) => Bulletin.findOne({ url }).lean())
        const allBulletins = await Promise.all ( promiseAllBulletins )
        const bulletinsId = allBulletins.map (({ _id }) => _id)
        //aquí tenemos un array de objects id se hayan creado o no, pendientes de relacionar con la query de búsqueda
        
        const search = await Search.findOne({ query, source: 'observatorioblockchain' })
        debugger
        if (search) {
            const lastQuerysearchedPlain = await Search.findOne({ query, source: 'observatorioblockchain' }).lean()
            const oldBulletins = lastQuerysearchedPlain.bulletins

            const newBulletinsForQuery = bulletinsId.concat(oldBulletins)
            let uniqueBulletinsId = [...new Set(newBulletinsForQuery)]
            search.bulletins = uniqueBulletinsId
            search.lastUpdate = new Date()
            
            await search.save()
        } else {
            await Search.create({ lastUpdate: new Date(), query, source: 'observatorioblockchain', bulletins: bulletinsId })
            
        }
        
    })()
}

module.exports = scrapOBSearch