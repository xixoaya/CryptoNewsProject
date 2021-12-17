// TODO scrape news from site and save into db
const puppeteer = require('puppeteer')
const { models: { Bulletin } } = require('proyecto-data')
const { NotFoundError, ConflictError, CredentialsError } = require('proyecto-errors')
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


        const objCTBulletinDetail = await page.evaluate(() => {

            const title = (document.querySelector('.post__title')) ? document.querySelector('.post__title').innerHTML.trim() : 'Unknown Title'
            const subtitle = (document.querySelector('.post__lead')) ? document.querySelector('.post__lead').innerHTML.trim() : 'Unknown subtitle'
            const imageSrc = (document.querySelector('.lazy-image.post-cover__image.lazy-image_loaded.lazy-image_immediate > picture > img')) ? document.querySelector('.lazy-image.post-cover__image.lazy-image_loaded.lazy-image_immediate > picture > img').srcset : 'Unknown imageSrc'
            const mediumViews = (document.querySelector('.post-actions__item-count')) ? document.querySelector('.post-actions__item-count').innerHTML.trim() : 'Unknown mediumViews'
            const badge = (document.querySelector('.post-cover__badge')) ? document.querySelector('.post-cover__badge').innerHTML.trim() : 'Unknown badge'

            let tags = []
            let arrContent = []
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
                    arrContent.push(strong)
                })
            }

            const impContent = arrContent.slice(0,5)
            const detailNotice = { title, subtitle, imageSrc, mediumViews, badge, tags, impContent }

            return detailNotice

        })

        await browser.close()
 
        debugger
        const {title , subtitle , imageSrc, mediumViews, badge, tags, impContent} = objCTBulletinDetail 
        
        await Bulletin.findOne({ noticeUrl })
            .then(bulletin => {
                if (!bulletin) throw new NotFoundError(`No Bulletin found to update detail with url ${noticeUrl}`)
                
                if (!(title.includes('Unknown')) && (!title)) bulletin.title = title
                if (!(subtitle.includes('Unknown')) && (!subtitle)) bulletin.subtitle = subtitle
                if (!(imageSrc.includes('Unknown')) && (!imageSrc)) bulletin.imageSrc = imageSrc
                if (!(mediumViews.includes('Unknown')) && (!mediumViews)) bulletin.mediumViews = mediumViews
                if (!(badge.includes('Unknown')) && (!badge)) bulletin.badge = badge

                if (tags.length) {
                    tags.forEach(e => {
                        if (e) {
                            e.trim()
                            bulletin.tags.push(e)
                        }
                    })                    
                }
                if (impContent.length) {
                    impContent.forEach( e => {
                        if (e) {
                            e.trim()
                            bulletin.impContent.push(e)
                        }
                    })
                }

                bulletin.savedDate = new Date()


                return bulletin.save()
                    .then(() => { })
                
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