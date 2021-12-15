// TODO scrape news from site and save into db
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
    
        //await fs.writeFile("test-titles-c24.json", JSON.stringify(arrC24Cover))
    
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
                savedDate: new Date()

            }
        })

        const creates = c24CoverBulletins.map( async (element) => {

            // const { url } = element
            // console.log(url)
            // const result = await Bulletin.findOne({url})
            //console.log(result)
                // const { url:_url } = bulletin

                // Object.keys(bulletin)
                // console.log(Object.keys(bulletin))


            await Bulletin.create(element)
                    
        })

        await Promise.all( creates )
    })()
}

module.exports = scrapeC24Cover