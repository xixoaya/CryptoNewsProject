const registerUser = require('./users/register-user')
const authenticateUser = require('./users/authenticate-user')
const retrieveUser = require('./users/retrieve-user')
const modifyUser = require('./users/modify-user')
const unregisterUser = require('./users/unregister-user')
const modifyBulletin = require('./users/modify-bulletin')
const retriveBulletinDetail = require('./users/retrieve-bulletin-detail')
const retriveBulletinsLead = require('./users/retrieve-bulletins-lead')
const retrieveHomeLatestBulletins = require('./users/retrieve-home-lattest-bulletins')
const searchBulletinsByQuery = require('./users/search-bulletins-by-query')

module.exports = {
    registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    unregisterUser,
    //new bulletins logics
    modifyBulletin,
    retriveBulletinDetail,
    retriveBulletinsLead,
    retrieveHomeLatestBulletins,
    searchBulletinsByQuery
}
