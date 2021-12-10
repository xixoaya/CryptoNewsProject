const { model } = require('mongoose')
const { user, source, search, comment, click, bulletin } = require('./schemas')

module.exports = {
    User: model('User', user),
    Source: model('Source', source),
    Search: model('Search', search),
    Comment: model('Comment', comment),
    Click: model('Click', click),
    Bulletin: model('Bulletin', bulletin)
}