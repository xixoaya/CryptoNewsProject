//const { validateName, validateUsername, validatePassword } = require('../logic-users/helpers/validators')
const { ConflictError } = require('proyecto-errors')
const { models: { Bulletin } } = require('proyecto-data')
const bcrypt = require('bcryptjs')

function saveBulletin({url, title, badge}) {
    validateUrl(item.url)
    validateTitle(item.title)
    validateBadge(item.badge)

    return Bulletin.create({ url, title, badge})
        .then(() => { })
        .catch(error => {
            debugger
            if (error.code === 11000)
                throw new ConflictError(`Url with username ${url} already exists`)

            throw error
        })
}

module.exports = saveBulletin