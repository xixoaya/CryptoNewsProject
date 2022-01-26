const puppeteer = require('puppeteer')
const { models: { Bulletin } } = require('proyecto-data')
/**
 * Scrape C24 news and saves them into DB.
 * 
 * @returns {Promise}
 */
function scrapeC24Cover() {
    return (async () => {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.cripto247.com/');
    
        await autoScroll(page);
    
        const arrC24Cover = await page.evaluate(() => {
    
            const articles = (document.querySelectorAll('.entry.nota-lista ')) ? document.querySelectorAll('.entry.nota-lista ') : 'articles tag failed'
    
            let results = []
    
            articles.forEach(article => {
                const title = (article.querySelector('.entry-data > h2')) ? article.querySelector('.entry-data > h2').innerText : 'Unknown Title'
    
                const url = (article.querySelector('.entry.nota-lista  > a')) ? article.querySelector('.entry.nota-lista > a').href : 'Unknown Url'
    
                const badge = (article.querySelector('.entry-data > span')) ? article.querySelector('.entry-data > span').innerText : 'Unknown Tag'
    
                results.push({ title, url, badge })
        
            })
            return results
    
        })
        
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

        const c24CoverBulletins = arrC24Cover.map(b => {
            return {

                badge: (b.badge.includes('Unknown')) ? null : b.badge.trim(),
                title: (b.title.includes('Unknown')) ? null : b.title.trim(),
                url: (b.url.includes('Unknown')) ? null : b.url,
                source: 'cripto247',
                scrapedType: 'cover',
                savedDate: new Date()

            }
        })

        const checksPromises = c24CoverBulletins.map(({url}) => Bulletin.exists({ url }))

        const exists = await Promise.all(checksPromises)

        const insertions = c24CoverBulletins.reduce((accum, bulletin, index) => {
            if (!exists[index]) accum.push(bulletin)

            return accum
        }, [])

        const creates = insertions.map( async (element) => {

            await Bulletin.create(element)
                    
        })

        await Promise.all( creates )
    })()
}

module.exports = scrapeC24Cover