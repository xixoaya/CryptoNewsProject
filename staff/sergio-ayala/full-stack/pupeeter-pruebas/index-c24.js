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


const scrapC24Cover = (async () => {
    const browser = await puppeteer.launch({
        // headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.cripto247.com/');
    // await page.setViewport({
    //     width: 1200,
    //     height: 800
    // });

    await autoScroll(page);

    const arrC24Cover = await page.evaluate(() => {

        const articles = (document.querySelectorAll('.entry.nota-lista ')) ? document.querySelectorAll('.entry.nota-lista ') : 'articles tag failed'

        let results = []

        articles.forEach(article => {
            const title = (article.querySelector('.entry-data > h2')) ? article.querySelector('.entry-data > h2').innerText : 'Unknown Title'

            const url = (article.querySelector('.entry.nota-lista  > a')) ? article.querySelector('.entry.nota-lista > a').href : 'Unknown Url'

            const badge = (article.querySelector('.entry-data > span')) ? article.querySelector('.entry-data > span').innerText : 'Unknown Tag'

            results.push({ title, url, badge })

            //console.log(badge)

        })
        return results

    })

    await fs.writeFile("test-titles-c24.json", JSON.stringify(arrC24Cover))


    await browser.close()
});

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

 scrapC24Cover()


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

async function scrapC24NoticeDetail(noticeUrl) {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(noticeUrl)

    await autoScroll(page);

    const objNoticeDetailsC24 = await page.evaluate(() => {

        var title = (document.querySelector('.nota-title')) ? document.querySelector('.nota-title').innerText : 'Unknown Title'
        const subtitle = (document.querySelector('.lead ')) ? document.querySelector('.lead ').innerText : 'Unknown SubTitle'
        const imageSrc = (document.querySelector('.image > img')) ? document.querySelector('.image > img').src : 'Unknown ImageSrc'
        const badge = (document.querySelector('.nota-label')) ? document.querySelector('.nota-label').innerText : 'Unknown badge'

        let tags = []
        let contentArr = []
        const tagsArticle = (document.querySelectorAll('.cont-tags > a')) ? document.querySelectorAll('.cont-tags > a') : 'Unknown Tags'

        if (tagsArticle) {
            tagsArticle.forEach(e => {
                const tag = e.innerText
                tags.push(tag)
            })
            
        } 
        
        const importantContent = document.querySelectorAll('.nota-body > p , h1 ')

        if (importantContent) {
            
            importantContent.forEach(e => {
                const cont = e.innerText
    
                if (cont)
                    contentArr.push(cont)
            })
        } 

        const impContent = contentArr.slice(0, (contentArr.length / 2))

        const detailNotice = { title, subtitle, imageSrc, badge, tags, impContent }

        return detailNotice

    })

    await fs.writeFile("test-detail-notice-c24.json", JSON.stringify(objNoticeDetailsC24))


    await browser.close()
}

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

scrapC24NoticeDetail("https://www.cripto247.com/comunidad-cripto/crece-en-mexico-el-interes-en-las-criptomonedas-190509")

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


const scrapC24Search = (async (query) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.cripto247.com/buscar/${query}`);

    await autoScrollTwoTimes(page);

    const arrC24Search = await page.evaluate(() => {

        const articles = (document.querySelectorAll('.entry.nota-lista ')) ? document.querySelectorAll('.entry.nota-lista ') : 'articles tag failed'

        let results = []

        articles.forEach(article => {
            const title = (article.querySelector('.entry-data > h2')) ? article.querySelector('.entry-data > h2').innerText : 'Unknown Title'

            const url = (article.querySelector('.entry.nota-lista  > a')) ? article.querySelector('.entry.nota-lista > a').href : 'Unknown Url'

            const badge = (article.querySelector('.entry-data > span')) ? article.querySelector('.entry-data > span').innerText : 'Unknown Tag'

            results.push({ title, url, badge })

            //console.log(badge)

        })
        return results

    })

    await fs.writeFile("test-search-by-query-c24.json", JSON.stringify(arrC24Search))


    await browser.close()
});

async function autoScrollTwoTimes(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight === 5000) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

scrapC24Search("juan")
