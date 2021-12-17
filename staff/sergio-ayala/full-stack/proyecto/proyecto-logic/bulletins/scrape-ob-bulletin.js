// TODO scrape news from site and save into db
const puppeteer = require('puppeteer')
const { models: { Bulletin } } = require('proyecto-data')
const { NotFoundError, ConflictError, CredentialsError } = require('proyecto-errors')
/**
 * Scrape CT news and saves them into DB.
 * 
 * @returns {Promise}
 */
function scrapeOBBulletin(noticeUrl) {
    return (async () => {
        // ASYNC code here
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(noticeUrl)

        debugger
        const objOBBulletinDetail = await page.evaluate(() => {

            var title = (document.querySelector('.title.single')) ? document.querySelector('.title.single').innerText.trim() : 'Unknown Title'
            const subtitle = (document.querySelector('h2')) ? document.querySelector('h2').innerHTML.trim() : 'Unknown subTitle'
            const imageSrc = (document.querySelector('.mg-blog-post-box > img')) ? document.querySelector('.mg-blog-post-box > img').src : 'Unknown imageSrc'
            const badge = (document.querySelector('.mg-blog-category > a')) ? document.querySelector('.mg-blog-category > a').innerText.trim() : 'Unknown badge'

            let tags = []
            let content = []
            const tagsArticle = document.querySelectorAll('.newsup-tags > a')

            if (tagsArticle) {
                tagsArticle.forEach(e => {
                    const tag = e.innerText.trim()
                    
                    if (tag)
                        tags.push(tag)
                })

            }

            const importantContent = document.querySelectorAll('.small.single > p ')

            if (importantContent) {
                importantContent.forEach(e => {
                    const strong = e.innerText.trim()

                    if (strong)
                        content.push(strong)
                })

            }

            const impContent = content.slice(0, 3)

            const detailNotice = { title, subtitle, imageSrc, badge, tags, impContent }

            return detailNotice

        })

        //await fs.writeFile("test-detail-notice-ob.json", JSON.stringify(objOBBulletinDetail))

        await browser.close()

        const { title, subtitle, imageSrc, badge, tags, impContent } = objOBBulletinDetail

        const bulletin = await Bulletin.findOne({ url: noticeUrl })

        if (!bulletin) throw new NotFoundError(`No Bulletin found to show detail with url ${noticeUrl}`)

        if (!(title.includes('Unknown')) && (!title)) bulletin.title = title
        if (!(subtitle.includes('Unknown')) && (!subtitle)) bulletin.subtitle = subtitle
        if (!(imageSrc.includes('Unknown')) && (!imageSrc)) bulletin.imageSrc = imageSrc
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

        debugger

        await bulletin.save()
    
    })()
}
module.exports = scrapeOBBulletin