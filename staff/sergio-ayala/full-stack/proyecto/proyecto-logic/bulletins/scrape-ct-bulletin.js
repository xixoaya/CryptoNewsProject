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
debugger

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
                    const tag = e.querySelector('a').innerHTML.trim()
                    tags.push(tag)
                })
            }

            const importantContent = document.querySelectorAll('.post-content > p > strong')

            if (importantContent) {

                importantContent.forEach(e => {
                    const strong = e.innerText.trim()
                    if (strong)
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
        
        const bulletin = await Bulletin.findOne({ noticeUrl })
            
                if (!bulletin) throw new NotFoundError(`No Bulletin found to update detail with url ${noticeUrl}`)
                
                if (!(title.includes('Unknown')) && (!title)) bulletin.title = title
                if (!(subtitle.includes('Unknown')) && (!subtitle)) bulletin.subtitle = subtitle
                if (!(imageSrc.includes('Unknown')) && (!imageSrc)) bulletin.imageSrc = imageSrc
                if (!(mediumViews.includes('Unknown')) && (!mediumViews)) bulletin.mediumViews = mediumViews
                if (!(badge.includes('Unknown')) && (!badge)) bulletin.badge = badge

                if (tags.length) {
                    tags.forEach(tag => {
                        const tagued = tag.trim()
        
                        if (tagued) {
                            bulletin.tags.push(tag)
                        }
                    })
                }
                if (impContent.length) {
                    impContent.forEach(content => {
                        const contnt = content.trim()
        
                        if (contnt) {
                            bulletin.impContent.push(content)
                        }
                    })
                }

                bulletin.savedDate = new Date()


                await bulletin.save()
                
        
    })()
}

module.exports = scrapeCTBulletin