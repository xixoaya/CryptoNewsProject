// TODO scrape news from site and save into db
const puppeteer = require('puppeteer')
const { models: { Bulletin } } = require('proyecto-data')
/**
 * Scrape CT news and saves them into DB.
 * 
 * @returns {Promise}
 */
function scrapOBSearch(query) {
    return (async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(`https://observatorioblockchain.com/?s=${query}`)


        const arrOBSearch = await page.evaluate(() => {

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

        const creates = obSearchBulletins.map(async (element) => {

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

module.exports = scrapOBSearch