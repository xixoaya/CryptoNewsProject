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
                const date = (article.querySelector('.post-card__footer > time')) ? article.querySelector('.post-card__footer > time').dateTime : 'Unknown Created Time'
                const badge = (article.querySelector('.post-card__figure > span')) ? article.querySelector('.post-card__figure > span').innerHTML : 'Unknown badge'
    
                results.push({ title, subTitle, url, badge, imageSrc, author, date })
            })
        }

        return results

    })

    await fs.writeFile("test-titles-ct.json", JSON.stringify(arrCTCover))


    await browser.close()
}

// scrapCTCover()

module.exports = scrapCTCover