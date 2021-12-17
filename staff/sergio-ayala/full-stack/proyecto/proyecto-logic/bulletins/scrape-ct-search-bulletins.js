// TODO scrape news from site and save into db
const puppeteer = require('puppeteer')
const { models: { Bulletin, Search } } = require('proyecto-data')
/**
 * Scrape CT news and saves them into DB.
 * 
 * @returns {Promise}
 */
function scrapCTSearch(query) {
    return (async () => {
        debugger

        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(`https://es.cointelegraph.com/search?query=${query}`)


        const arrCTSearch = await page.evaluate(() => {
            const articles = document.querySelectorAll('.row.result')

            let results = []

            if (articles) {

                articles.forEach(article => {
                    const title = (article.querySelector('.header')) ? article.querySelector('.header').innerText : 'Unknown Title'
                    const subTitle = (article.querySelector('.text')) ? article.querySelector('.text').innerText : 'Unknown subTitle'
                    const url = (article.querySelector('.text > a')) ? article.querySelector('.text > a').href : 'Unknown url'
                    const imageSrc = (article.querySelector('.image > img')) ? article.querySelector('.image > img').srcset : 'Unknown imageSrc'
                    const author = (article.querySelector('.author > a')) ? article.querySelector('.author > a').innerText : 'Unknown Author'
                    const createdTime = (article.querySelector('.date')) ? article.querySelector('.date').innerText : 'Unknown createdTime'
                    const badge = (article.querySelector('.sponsored.badge.badge-default')) ? article.querySelector('.sponsored.badge.badge-default').innerText : 'Unknown Tag'

                    results.push({ title, subTitle, url, badge, imageSrc, author, createdTime })

                })
            }

            return results

        })

        //await fs.writeFile("test-search-by-query-ct.json", JSON.stringify(arrCTSearch))

        await browser.close()

        const ctSearchBulletins = arrCTSearch.map(b => {
            return {

                author: (b.author.includes('Unknown')) ? null : b.author.trim(),
                badge: (b.badge.includes('Unknown')) ? null : b.badge.trim(),
                subTitle: (b.subTitle.includes('Unknown')) ? null : b.subTitle.trim(),
                title: (b.title.includes('Unknown')) ? null : b.title.trim(),
                url: (b.url.includes('Unknown')) ? null : b.url,
                imageSrc: (b.imageSrc.includes('Unknown')) ? null : b.imageSrc,
                createdTime: (b.createdTime.includes('Unknown')) ? null : b.createdTime,
                source: 'cointelegraph',
                savedDate: new Date()

            }
        })

        const checksPromises = ctSearchBulletins.map(({ url }) => Bulletin.exists({ url }))

        const exists = await Promise.all(checksPromises)

        const insertions = ctSearchBulletins.reduce((accum, bulletin, index) => {
            if (!exists[index]) accum.push(bulletin)

            return accum
        }, [])


        let bulletins

        if (insertions) {

            const creates = insertions.map(element => Bulletin.create(element))

            bulletins = await Promise.all(creates)
        }

        let bulletinsId

        if (bulletins.length) {

            bulletinsId = bulletins.map(e => { return e.id })
        } else {
            bulletinsId = []
        }


        const search = await Search.findOne({ query, source: 'cointelegraph' })
        const lastQuerysearchedPlain = await Search.findOne({ query, source: 'cointelegraph' }).lean()
        debugger
        if (search) {
            const newBulletinsForQuery = bulletinsId.concat(lastQuerysearchedPlain.bulletins)
            let uniqueBulletinsId = [...new Set(newBulletinsForQuery)]
            search.bulletins = search.bulletins.push(uniqueBulletinsId)
            search.lastUpdate = new Date()

            await search.save()
        } else {
            await Search.create({ lastUpdate: new Date(), query, source: 'cointelegraph', bulletins: bulletinsId })

        }
    })()
}

module.exports = scrapCTSearch