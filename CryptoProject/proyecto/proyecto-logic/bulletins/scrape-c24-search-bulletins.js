// TODO scrape news from site and save into db
const puppeteer = require('puppeteer')
const { models: { Bulletin, Search } } = require('proyecto-data')
/**
 * Scrape C24 search and saves them into DB.
 * 
 * @returns {Promise}
 */
function scrapeC24Search(query) {
    // SYNC code here

    return (async () => {
        

        // ASYNC code here
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.cripto247.com/buscar/${query}`);

        await autoScrollTwoTimes(page);

        const arrC24Search = await page.evaluate(() => {
            const articles = (document.querySelectorAll('.entry.nota-lista ')) ? document.querySelectorAll('.entry.nota-lista ') : 'articles tag failed'

            let results = []

            articles.forEach(article => {
                const title = (article.querySelector('.entry-data > h2')) ? article.querySelector('.entry-data > h2').innerText : 'Unknown Title'

                const url = (article.querySelector('.entry.nota-lista  > a')) ? article.querySelector('.entry.nota-lista > a').href : 'Unknown Url'

                const badge = (article.querySelector('.entry-data > span')) ? article.querySelector('.entry-data > span').innerText : 'Unknown Tag'

                results.push({ title, url, badge })

            })

            return results

        })

        await browser.close()

        async function autoScrollTwoTimes(page) {
            await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                    var totalHeight = 0;
                    var distance = 100;
                    var timer = setInterval(() => {
                        var scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;

                        if (totalHeight === 3000) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });
        }

        const c24SearchBulletins = arrC24Search.map(b => {
            return {

                badge: (b.badge.includes('Unknown')) ? null : b.badge.trim(),
                title: (b.title.includes('Unknown')) ? null : b.title.trim(),
                url: (b.url.includes('Unknown')) ? null : b.url,
                source: 'cripto247',
                savedDate: new Date()

            }
        })

        

        const checksPromises = c24SearchBulletins.map(({ url }) => Bulletin.exists({ url }))

        const exists = await Promise.all(checksPromises)

        const insertions = c24SearchBulletins.reduce((accum, bulletin, index) => {
            if (!exists[index]) accum.push(bulletin)

            return accum
        }, [])

        let bulletins

        if (insertions.length) {

            const creates = insertions.map(element => Bulletin.create(element))

            bulletins = await Promise.all(creates)
        }

        const promiseAllBulletins = c24SearchBulletins.map(({ url }) => Bulletin.findOne({ url }).lean())
        const allBulletins = await Promise.all ( promiseAllBulletins )
        const bulletinsId = allBulletins.map (({ _id }) => _id)

        debugger
        const search = await Search.findOne({ query, source: 'cripto247' })
        
        if (search) {
            const lastQuerysearchedPlain = await Search.findOne({ query, source: 'cripto247' }).lean()
            const oldBulletins = lastQuerysearchedPlain.bulletins

            const newBulletinsForQuery = bulletinsId.concat(oldBulletins)
            let uniqueBulletinsId = [...new Set(newBulletinsForQuery)]
            search.bulletins = uniqueBulletinsId
            search.lastUpdate = new Date()
            
            await search.save()
        } else {
            await Search.create({ lastUpdate: new Date(), query, source: 'cripto247', bulletins: bulletinsId })

        }
    })()
}

module.exports = scrapeC24Search