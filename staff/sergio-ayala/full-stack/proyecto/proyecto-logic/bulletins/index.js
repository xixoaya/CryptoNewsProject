const scrapeCTBulletin = require('./scrape-ct-bulletin')
const scrapeCTCover = require('./scrape-ct-cover-bulletins')
const scrapCTSearch = require('./scrape-ct-search-bulletins')

const scrapeOBBulletin = require('./scrape-ob-bulletin')
const scrapeOBCover = require('./scrape-ob-cover-bulletins')
const scrapOBSearch = require('./scrape-ob-search-bulletins')

const scrapeC24Bulletin = require('./scrape-c24-bulletin')
const scrapeC24Cover = require('./scrape-c24-cover-bulletins')
const scrapeC24Search = require('./scrape-c24-search-bulletins')

module.exports = {
    scrapeCTBulletin,
    scrapeCTCover,
    scrapCTSearch,
    scrapeOBBulletin,
    scrapeOBCover,
    scrapOBSearch,
    scrapeC24Bulletin,
    scrapeC24Cover,
    scrapeC24Search
}