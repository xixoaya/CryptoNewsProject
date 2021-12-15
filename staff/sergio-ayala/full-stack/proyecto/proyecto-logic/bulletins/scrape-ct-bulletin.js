// TODO scrape news from site and save into db
const puppeteer = require('puppeteer')
const { models: { Bulletin } } = require('proyecto-data')
/**
 * Scrape CT news and saves them into DB.
 * 
 * @returns {Promise}
 */
function scrapeCTBulletin(noticeUrl) {
    return (async () => {
        // ASYNC code here :P
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(noticeUrl)


        const objNoticeDetails = await page.evaluate(() => {

            const title = (document.querySelector('.post__title')) ? document.querySelector('.post__title').innerHTML : 'Unknown Title'
            const subtitle = (document.querySelector('.post__lead')) ? document.querySelector('.post__lead').innerHTML : 'Unknown subtitle'
            const imageSrc = (document.querySelector('.lazy-image.post-cover__image.lazy-image_loaded.lazy-image_immediate > picture > img')) ? document.querySelector('.lazy-image.post-cover__image.lazy-image_loaded.lazy-image_immediate > picture > img').srcset : 'Unknown imageSrc'
            const mediumViews = (document.querySelector('.post-actions__item-count')) ? document.querySelector('.post-actions__item-count').innerHTML : 'Unknown mediumViews'
            const badge = (document.querySelector('.post-cover__badge')) ? document.querySelector('.post-cover__badge').innerHTML : 'Unknown badge'

            let tags = []
            let impContent = []
            const tagsArticle = document.querySelectorAll('.tags-list__item')

            if (tagsArticle) {

                tagsArticle.forEach(e => {
                    const tag = e.querySelector('a').innerHTML
                    tags.push(tag)
                })
            }

            const importantContent = document.querySelectorAll('.post-content > p > strong')

            if (importantContent) {

                importantContent.forEach(e => {
                    const strong = e.innerText
                    impContent.push(strong)
                })
            }

            const detailNotice = { title, subtitle, imageSrc, mediumViews, badge, tags, impContent }

            return detailNotice

        })

        //await fs.writeFile("test-detail-notice-ct.json", JSON.stringify(objNoticeDetails))


        await browser.close()
        
        const ctBulletinProps = Object.keys(objNoticeDetails).map(key => {
            return {
                // title: (objNoticeDetails[key].includes('Unknown')) ? null: (objNoticeDetails[key].trim())
                title: (objNoticeDetails[key]),
                subtitle: (objNoticeDetails[key])
            }
        })
        debugger
        const {title, subtitle, imageSrc, mediumViews, badge, tags, impContent} = objNoticeDetails 
        
        await Bulletin.findOne({ noticeUrl })
            .then(bulletin => {
                
            })


        
            // {

            //     author: (b.author.includes('Unknown')) ? null : b.author.trim(),
            //     badge: (b.badge.includes('Unknown')) ? null : b.badge.trim(),
            //     subTitle: (b.subTitle.includes('Unknown')) ? null : b.subTitle.trim(),
            //     title: (b.title.includes('Unknown')) ? null : b.title.trim(),
            //     url: (b.url.includes('Unknown')) ? null : b.url,
            //     imageSrc: (b.imageSrc.includes('Unknown')) ? null : b.imageSrc,
            //     createdTime: (b.createdTime.includes('Unknown')) ? null : b.createdTime,
            //     source: 'cointelegraph',
            //     savedDate: new Date()

            // }
        
    })()
}

module.exports = scrapeCTBulletin