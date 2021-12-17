// TODO scrape news from site and save into db
const puppeteer = require('puppeteer')
const { models: { Bulletin, Search } } = require('proyecto-data')
/**
 * Scrape CT news and saves them into DB.
 * 
 * @returns {Promise}
 */
function scrapOBSearch(query) {
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

        const obSearchBulletins = arrOBSearch.map(b => {
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
debugger
        const checksPromises = obSearchBulletins.map(({ url }) => Bulletin.exists({ url }))

        const exists = await Promise.all(checksPromises)

        const insertions = obSearchBulletins.reduce((accum, bulletin, index) => {
            if (!exists[index]) accum.push(bulletin)

            return accum
        }, [])

        let bulletins

        if (insertions) {
            
            const creates = insertions.map(element => Bulletin.create(element))
    
            bulletins = await Promise.all(creates)
        }

        let bulletinsId

        if (bulletins.length){

            bulletinsId = bulletins.map(e => { return e.id })
        } else {
            bulletinsId = []
        }

        
        const search = await Search.findOne({ query, source: 'observatorioblockchain' })
        const lastQuerysearchedPlain = await Search.findOne({ query, source: 'observatorioblockchain' }).lean()
        debugger
        if (search) {
            const newBulletinsForQuery = bulletinsId.concat(lastQuerysearchedPlain.bulletins)
            let uniqueBulletinsId = [...new Set(newBulletinsForQuery)]
            search.bulletins = search.bulletins.push(uniqueBulletinsId)
            search.lastUpdate = new Date()
            
            await search.save()
        } else {
            await Search.create({ lastUpdate: new Date(), query, source: 'observatorioblockchain', bulletins: bulletinsId })
            
        }
        
    })()
}

module.exports = scrapOBSearch