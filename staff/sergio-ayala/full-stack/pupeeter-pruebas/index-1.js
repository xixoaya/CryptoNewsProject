const puppeteer = require('puppeteer')
const fs = require('fs/promises')

// async function start() {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()

//     await page.goto("https://es.cointelegraph.com/")
//     // await page.screenshot({path: "fullpagetest.png", fullPage: true})



//     // Ha de devolver un array de elementos HTML que tengan la query pasada
//     const extractElements = async query => { // Ha de devolver el elemento pasado por parámetro

//         const results = await page.evaluate(() => {
//             return Array.from(document.querySelectorAll(".post-card__article"))
//                 .map(x => document.createElement("div").innerHTML = x.innerHTML)
//         })
//         // let res = []
//         // for (let i = 0; i < results.length; i++) {

//         //     const element = document.createElement('div')
//         //     element.innerHTML = results[i]
//         //     res.push(element)
//         // }

//         // return res

//     }
//     const foo = document.createElement

//     // const elements = await extractElements()

//     // const foo = new HTMLAnchorElement()

//     // await fs.writeFile("test-titles.html", elements[0]/*.querySelectorAll('.post-card__text')*/)


//     debugger
//     await browser.close()
// }

// start()

// const puppeteer = require('puppeteer')

// async function start() {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()

//     await page.goto("https://www.instagram.com/ibaillanos/")
//     await page.screenshot({path: "testinstagramfullpage.png", fullPage: true})

//     await browser.close()
// }

// start()

// async function start() {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()

//     await page.goto("https://learnwebcode.com/courses/")

//     const titles = await page.evaluate( () => {
//         return Array.from(document.querySelectorAll(".info strong")).map( x => x.textContent)
//     })

//     await fs.writeFile("test-page.txt", titles.join("\r\n"))

//     await browser.close()
// }

// start()

// async function start() {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()

//     await page.goto("https://es.cointelegraph.com/")
//     // await page.screenshot({path: "fullpagetest.png", fullPage: true})

//     const articles = await page.evaluate( () => {
//         return Array.from(document.querySelectorAll(".post-card__article"))
//     })
//     console.log(articles[0])

//     // debugger
//     await fs.writeFile("test-titles.txt", JSON.stringify(articles))


//     await browser.close()
// }

// start()


// async function start() {

//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()

//     await page.goto("https://es.cointelegraph.com/")


//     const arrBulletins = await page.evaluate( () => {

//         const model = {
//             url: null,
//             title: null,
//             subtitle: null,
//         }

//         const bulletins = Array.from(document.querySelectorAll(".post-card__article")).map(x => x.innerHTML)

//         // return bulletins
//         return bulletins.map(e => {
//             const div = document.createElement("div")
//             div.innerHTML = e


//             div.querySelector(".post-card__title").innerText
//             div.querySelector(".post-card__text").innerText

//             return {
//                 title,
//                 subtitle,
//                 // tag: div.querySelector(".post-card__badge span").innerText,
//             }
//         })

//     })

//     await fs.writeFile("test-titles.json", JSON.stringify(arrBulletins))


//     await browser.close()
// }

// start()

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


    const arrBulletins = await page.evaluate(() => {

        const articles = document.querySelectorAll('.post-card__article')

        let results = []

        articles.forEach(article => {
            const title = (article.querySelector('.post-card__title')) ? article.querySelector('.post-card__title').innerHTML : 'Unknown title'
            const subTitle = (article.querySelector('.post-card__text')) ? article.querySelector('.post-card__text').innerHTML : 'Unknown subTitle'
            const url = (article.querySelector('.post-card__header > a')) ? article.querySelector('.post-card__header > a').href : 'Unknown url'
            const imageSrc = (article.querySelector('.lazy-image.post-card__cover.lazy-image_loaded > img')) ? article.querySelector('.lazy-image.post-card__cover.lazy-image_loaded > img').src : 'Unknown image Src'
            const author = (article.querySelector('.post-card__author > a')) ? article.querySelector('.post-card__author > a').innerHTML : 'Unknown Author'
            const date = (article.querySelector('.post-card__footer > time')) ? article.querySelector('.post-card__footer > time').dateTime : 'Unknown Created Time'
            const badge = (article.querySelector('.post-card__figure > span')) ? article.querySelector('.post-card__figure > span').innerHTML : 'Unknown badge'

            results.push({ title, subTitle, url, badge, imageSrc, author, date })
        })

        return results

    })

    await fs.writeFile("test2-titles.json", JSON.stringify(arrBulletins))


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

        const title = document.querySelector('.post__title').innerHTML
        const subtitle = document.querySelector('.post__lead').innerHTML
        const imageSrc = document.querySelector('.lazy-image.post-cover__image.lazy-image_loaded.lazy-image_immediate > picture > img').srcset
        const mediumViews = document.querySelector('.post-actions__item-count').innerHTML
        const badge = document.querySelector('.post-cover__badge').innerHTML

        let tags = []
        let content = []
        const tagsArticle = document.querySelectorAll('.tags-list__item')

        tagsArticle.forEach(e => {
            const tag = e.querySelector('a').innerHTML
            tags.push(tag)
        })

        const importantContent = document.querySelectorAll('.post-content > p > strong')

        importantContent.forEach(e => {
            const strong = e.innerText
            content.push(strong)
        })

        const detailNotice = { title, subtitle, imageSrc, mediumViews, badge, tags, content }

        return detailNotice

    })

    await fs.writeFile("test-detail-notice-ct.json", JSON.stringify(objNoticeDetails))


    await browser.close()
}

scrapCTNoticeDetail("https://es.cointelegraph.com/news/wisdomtree-amends-bitcoin-etf-application-naming-us-bank-as-custodian")

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////