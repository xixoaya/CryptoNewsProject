// TODO scrape news from site and save into db
const puppeteer = require('puppeteer')
const { models: { Bulletin } } = require('proyecto-data')
/**
 * Scrape CT news and saves them into DB.
 * 
 * @returns {Promise}
 */
function scrapCTSearch(query) {
    return (async () => {
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


        const creates = ctSearchBulletins.map(async (element) => {

            // const { url } = element
            // console.log(url)
            // const result = await Bulletin.findOne({url})
            //console.log(result)
            // const { url:_url } = bulletin

            // Object.keys(bulletin)
            // console.log(Object.keys(bulletin))


            await Bulletin.create(element)

        })

        await Promise.all(creates)
    })()
}

module.exports = scrapCTSearch