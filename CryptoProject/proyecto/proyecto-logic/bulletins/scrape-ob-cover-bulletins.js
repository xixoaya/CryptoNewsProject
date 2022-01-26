// TODO scrape news from site and save into db
const puppeteer = require('puppeteer')
const { models: { Bulletin } } = require('proyecto-data')

/**
 * Scrape CT news and saves them into DB.
 * 
 * @returns {Promise}
 */
function scrapeOBCover() {
    return (async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto("https://observatorioblockchain.com/")


        const arrOBCover = await page.evaluate(() => {

            const articles = (document.querySelectorAll('.d-md-flex.mg-posts-sec-post')) ? document.querySelectorAll('.d-md-flex.mg-posts-sec-post') : 'articles tag failed'

            let results = []

            articles.forEach(article => {
                const title = (article.querySelector('.entry-title.title')) ? article.querySelector('.entry-title.title').innerText : 'Unknown Title'
                const subTitle = (article.querySelector('.mg-content')) ? article.querySelector('.mg-content').innerText : 'Unknown subTitle'
                const url = (article.querySelector('.entry-title.title > a')) ? article.querySelector('.entry-title.title > a').href : 'Unknown Url'
                const author = (article.querySelector('.auth')) ? article.querySelector('.auth').innerText : 'Unknown Author'
                const createdTime = (article.querySelector('.mg-blog-date > a')) ? article.querySelector('.mg-blog-date > a').innerText : 'Unknown CreateTime'
                const badge = (article.querySelector('.mg-blog-category > a')) ? article.querySelector('.mg-blog-category > a').innerText : 'Unknown Tag'

                results.push({ title, subTitle, url, badge, author, createdTime })

            })

            return results

        })

        await browser.close()

        const obCoverBulletins = arrOBCover.map(b => {
            return {

                author: (b.author.includes('Unknown')) ? null : b.author.trim(),
                badge: (b.badge.includes('Unknown')) ? null : b.badge.trim(),
                subTitle: (b.subTitle.includes('Unknown')) ? null : b.subTitle.trim(),
                title: (b.title.includes('Unknown')) ? null : b.title.trim(),
                url: (b.url.includes('Unknown')) ? null : b.url,
                createdTime: (b.createdTime.includes('Unknown')) ? null : b.createdTime,
                source: 'observatorioblockchain',
                scrapedType: 'cover',
                savedDate: new Date()

            }
        })

        const checksPromises = obCoverBulletins.map(({url}) => Bulletin.exists({ url }))

        const exists = await Promise.all(checksPromises)

        const insertions = obCoverBulletins.reduce((accum, bulletin, index) => {
            if (!exists[index]) accum.push(bulletin)

            return accum
        }, [])


        const creates = insertions.map( async (element) => {

            await Bulletin.create(element)                    
        })

        await Promise.all( creates )

    })()
}

module.exports = scrapeOBCover