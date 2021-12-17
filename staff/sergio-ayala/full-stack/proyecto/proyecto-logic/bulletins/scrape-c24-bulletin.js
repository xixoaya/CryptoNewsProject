// TODO scrape news from site and save into db
const puppeteer = require('puppeteer')
const { models: { Bulletin } } = require('proyecto-data')
const { NotFoundError, ConflictError, CredentialsError } = require('proyecto-errors')
/**
 * Scrape C24 search and saves them into DB.
 * 
 * @returns {Promise}
 */
function scrapeC24Bulletin(noticeUrl) {
    // SYNC code here

    return (async () => {
        // ASYNC code here
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(noticeUrl)

        await autoScroll(page);

        const objC24BulletinDetail = await page.evaluate(() => {

            var title = (document.querySelector('.nota-title')) ? document.querySelector('.nota-title').innerText : 'Unknown Title'
            const subtitle = (document.querySelector('.lead')) ? document.querySelector('.lead').innerText : 'Unknown SubTitle'
            const imageSrc = (document.querySelector('.image > img')) ? document.querySelector('.image > img').src : 'Unknown ImageSrc'
            const badge = (document.querySelector('.nota-label')) ? document.querySelector('.nota-label').innerText : 'Unknown badge'

            let tags = []
            let contentArr = []
            const tagsArticle = (document.querySelectorAll('.cont-tags > a')) ? document.querySelectorAll('.cont-tags > a') : 'Unknown Tags'

            if (tagsArticle) {
                tagsArticle.forEach(e => {
                    const tag = e.innerText.trim()
                    
                    if (tag)
                        tags.push(tag)
                })

            }

            const importantContent = document.querySelectorAll('.nota-body > p , h1 ')

            if (importantContent) {

                importantContent.forEach(e => {
                    const cont = e.innerText.trim()

                    if (cont)
                        contentArr.push(cont)
                })
            }

            const impContent = contentArr.slice(0, 3)

            const detailNotice = { title, subtitle, imageSrc, badge, tags, impContent }

            return detailNotice

        })

        //await fs.writeFile("test-detail-notice-c24.json", JSON.stringify(objC24BulletinDetail))


        await browser.close()

        async function autoScroll(page) {
            await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                    var totalHeight = 0;
                    var distance = 100;
                    var timer = setInterval(() => {
                        var scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;

                        if (totalHeight >= scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });
        }

        const { title, subtitle, imageSrc, badge, tags, impContent } = objC24BulletinDetail

        const bulletin = await Bulletin.findOne({ noticeUrl })
            
                if (!bulletin) throw new NotFoundError(`No Bulletin found to update detail with url ${noticeUrl}`)

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

module.exports = scrapeC24Bulletin