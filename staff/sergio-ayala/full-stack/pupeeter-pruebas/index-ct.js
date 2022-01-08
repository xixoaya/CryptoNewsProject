const puppeteer = require('puppeteer')
const fs = require('fs/promises')

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// códio de la consola que funciona

// const articles = document.querySelectorAll('.post-card__article')

// let results = []

// articles.forEach(article => {
//     const title = article.querySelector('.post-card__title').innerHTML
//     const subTitle = article.querySelector('.post-card__text').innerHTML
//     const url = article.querySelector('.post-card__header > a').href
//     const imageSrc = article.querySelector('.lazy-image.post-card__cover.lazy-image_loaded > img').src
//     const author = (article.querySelector('.post-card__author > a')) ? article.querySelector('.post-card__author > a').innerHTML : 'Unknown Author'
//     const createdTime = article.querySelector('.post-card__footer > time').dateTime
//     const tag = (article.querySelector('.post-card__figure > span')) ? article.querySelector('.post-card__figure > span').innerHTML : 'Unknown Tag'

//     results.push({ title, subTitle, url, tag, imageSrc, author, createdTime })
// })

// Vamnos a ver puppeteer
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

async function scrapCTCover() {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto("https://es.cointelegraph.com/")


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

    await fs.writeFile("test-titles-ct.json", JSON.stringify(arrCTCover))


    await browser.close()
}

scrapCTCover()

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


async function scrapCTNoticeDetail(noticeUrl) {

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

    await fs.writeFile("test-detail-notice-ct.json", JSON.stringify(objNoticeDetails))


    await browser.close()
}

scrapCTNoticeDetail("https://es.cointelegraph.com/news/wisdomtree-amends-bitcoin-etf-application-naming-us-bank-as-custodian")

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



async function scrapCTSearch(query) {

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

    await fs.writeFile("test-search-by-query-ct.json", JSON.stringify(arrCTSearch))


    await browser.close()
}

scrapCTSearch("btc")