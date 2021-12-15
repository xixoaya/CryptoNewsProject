// TODO scrape news from site and save into db
const puppeteer = require('puppeteer')
const { models: { Bulletin } } = require('proyecto-data')

/**
 * Scrape CT news and saves them into DB.
 * 
 * @returns {Promise}
 */
function scrapeCTCover() {

    return (async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto("https://es.cointelegraph.com/")

        //let ctCoverBulletins

        const arrCTCover = await page.evaluate(() => {

            const articles = document.querySelectorAll('.post-card__article')

            let results = []

            if (articles) {

                articles.forEach(article => {
                    const title = (article.querySelector('.post-card__title')) ? article.querySelector('.post-card__title').innerHTML : 'Unknown title'
                    const subTitle = (article.querySelector('.post-card__text')) ? article.querySelector('.post-card__text').innerHTML : 'Unknown subTitle'
                    const url = (article.querySelector('.post-card__header > a')) ? article.querySelector('.post-card__header > a').href : 'Unknown url'
                    const imageSrc = (article.querySelector('.lazy-image.post-card__cover.lazy-image_loaded > img')) ? article.querySelector('.lazy-image.post-card__cover.lazy-image_loaded > img').src : 'Unknown image Src'
                    const author = (article.querySelector('.post-card__author > a')) ? article.querySelector('.post-card__author > a').innerHTML : 'Unknown Author'
                    const createdTime = (article.querySelector('.post-card__footer > time')) ? article.querySelector('.post-card__footer > time').dateTime : 'Unknown Created Time'
                    const badge = (article.querySelector('.post-card__figure > span')) ? article.querySelector('.post-card__figure > span').innerHTML : 'Unknown badge'

                    results.push({ title, subTitle, url, badge, imageSrc, author, createdTime })
                })
            }

            return results

        })
        //await fs.writeFile("test-titles-ct.json", JSON.stringify(arrCTCover))

        //ctCoverBulletins = arrCTCover
        //Array.from(arrCTCover)

        await browser.close()

        //const shouldIsave = new Date()

        const ctCoverBulletins = arrCTCover.map(b => {
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

        // ctCoverBulletins.forEach(e => {

        //     return Bulletin.create({ e })
        //         .then(() => { })
        //         .catch(error => {
        //             debugger
        //             if (error.code === 11000) {
        //                 if (e.savedDate > today) {
        //                     return Bulletin.findOne({ url })
        //                         .then(bulletin => {
        //                             for (const property in e) {
        //                                 if (!(property.includes('Unknown')))
        //                                     bulletin[property] = e[property]
                        
        //                             }
        //                         })
        //                 }
        //             }
        //                 // throw new ConflictError(`User with username ${username} already exists`)

        //             throw error
        //         })
        // })

        const creates = ctCoverBulletins.map( async (element) => {

            // const { url } = element
            // console.log(url)
            // const result = await Bulletin.findOne({url})
            //console.log(result)
                // const { url:_url } = bulletin

                // Object.keys(bulletin)
                // console.log(Object.keys(bulletin))


            await Bulletin.create(element)
                    
        })

        await Promise.all( creates )

    })()
}

module.exports = scrapeCTCover