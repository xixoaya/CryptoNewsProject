const puppeteer = require('puppeteer')
const fs = require('fs/promises')

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// códio de la consola que funciona

// const articles = document.querySelectorAll('.d-md-flex.mg-posts-sec-post')

// let results = []

// articles.forEach(article => {
//     const title = article.querySelector('.entry-title.title').innerText
//     const subTitle = article.querySelector('.mg-content').innerText
//     const url = article.querySelector('.entry-title.title > a').href
//     const author = (article.querySelector('.auth')) ? article.querySelector('.auth').innerText : 'Unknown Author'
//     const createdTime = article.querySelector('.mg-blog-date > a').innerText
//     const badge = (article.querySelector('.mg-blog-category > a')) ? article.querySelector('.mg-blog-category > a').innerText : 'Unknown Tag'

//     results.push({ title, subTitle, url, badge, author, createdTime })

// })

// Vamnos a ver puppeteer
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

async function scrapOBCover() {

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

    await fs.writeFile("test-titles-ob.json", JSON.stringify(arrOBCover))


    await browser.close()
}

scrapOBCover()

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

async function scrapOBNoticeDetail(noticeUrl) {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(noticeUrl)


    const objNoticeDetailsOB = await page.evaluate(() => {

        var title = (document.querySelector('.title.single')) ? document.querySelector('.title.single').innerText : 'Unknown Title'
        const subtitle = (document.querySelector('h2')) ? document.querySelector('h2').innerHTML : 'Unknown subTitle'
        const imageSrc = (document.querySelector('.mg-blog-post-box > img')) ? document.querySelector('.mg-blog-post-box > img').src : 'Unknown imageSrc'
        const badge = (document.querySelector('.mg-blog-category > a')) ? document.querySelector('.mg-blog-category > a').innerText : 'Unknown badge'

        let tags = []
        let content = []
        const tagsArticle = document.querySelectorAll('.newsup-tags > a')

        if (tagsArticle) {
            tagsArticle.forEach(e => {
                const tag = e.innerText
                tags.push(tag)
            })

        }

        const importantContent = document.querySelectorAll('.small.single > p ')

        if (importantContent) {
            importantContent.forEach(e => {
                const strong = e.innerText
                content.push(strong)
            })

        }

        const impContent = content.slice(0, 3)

        const detailNotice = { title, subtitle, imageSrc, badge, tags, impContent }

        return detailNotice

    })

    await fs.writeFile("test-detail-notice-ob.json", JSON.stringify(objNoticeDetailsOB))


    await browser.close()
}

scrapOBNoticeDetail("https://observatorioblockchain.com/defi/wbtc-el-bitcoin-tokenizado-en-ethereum-acumula-casi-4-000-millones-en-las-defi/")

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



async function scrapOBSearch(query) {

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

    await fs.writeFile("test-search-by-query-ob.json", JSON.stringify(arrOBSearch))


    await browser.close()
}

scrapOBSearch("btc")