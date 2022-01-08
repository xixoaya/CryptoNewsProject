const { FormatError, ConflictError } = require('proyecto-errors')


function validateName(name) {
    if (typeof name !== 'string') throw new TypeError('name is not a string')
        if (!name.trim().length) throw new FormatError('name is empty or blank')
        if (name.trim() !== name) throw new FormatError('name has spaces around')
}

function validateUsername(username) {
    if (typeof username !== 'string') throw new TypeError( 'username is not a string')
    if (!username.trim().length) throw new FormatError('username is empty or blank')
    if (/\r?\n|\r|\t| /g.test(username)) throw new FormatError('username has blank spaces')
    if (username.length < 4) throw new FormatError ('username has less than 4 characters')  
}

function validateId(id) {
    if (typeof id !== 'string') throw new TypeError('id is not a string')
    if (!id.trim().length) throw new FormatError('id is empty or blank')
    if (/\r?\n|\r|\t| /g.test(id)) throw new FormatError('id has blank spaces')
    if (id.length !== 24) throw new FormatError('id doesn\'t have 24 characters') 
}

function validatePassword(password) {
    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (!password.trim().length) throw new FormatError('password is empty or blank')
    if (/\r?\n|\r|\t| /g.test(password)) throw new FormatError('password has blank spaces')
    if (password.length < 6) throw new FormatError ('password has less than 6 characters')
}

function validateOldPassword(oldPassword) {
    if (typeof oldPassword !== 'string') throw new TypeError('old password is not a string')
        if (!oldPassword.trim().length) throw new FormatError('old password is empty or blank')
        if (/\r?\n|\r|\t| /g.test(oldPassword)) throw new FormatError('old password has blank spaces')
        if (oldPassword.length < 6) throw new FormatError('old password has less than 6 characters')
}

function validateCallback(callback) {
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')
}

function validateNumber(number) {
    if (typeof number !== 'number') throw new TypeError('value is not a number')
        if (!(number.toString().trim().length)) throw new FormatError('value is empty or blank')
}

function validatequery(query) {
    debugger
    let queryOk
    if (query.includes('%20')) {
        queryOk = {
            queryCt: query,
            queryOb: query.replace('%20', '+'),
            queryC24: query
        }
    } else {
        queryOk = {
            queryCt: query,
            queryOb: query,
            queryC24: query
        }
    }
    return queryOk
}

function validateData(data) {
    if (typeof data !== 'object' || data.constructor.name !== 'Object') throw new TypeError('data is not an object')

    const { name, username, oldPassword, password, clicks, clicksFav, clicksQueue } = data

    if (typeof name !== 'undefined') {
        validateName(name)
    }

    if (typeof username !== 'undefined') {
        validateUsername(username)
    }

    if (typeof oldPassword === 'undefined' && typeof password !== 'undefined') throw new ConflictError('old password is not defined')
    if (typeof password === 'undefined' && typeof oldPassword !== 'undefined') throw new ConflictError('password is not defined')

    if (typeof password !== 'undefined') {
        validatePassword(password)
    }

    if (typeof oldPassword !== 'undefined') {
        validateOldPassword(oldPassword)
    }

    if (typeof clicks !== 'undefined') {
        validateNumber(clicks)
    }
    if (typeof clicksFav !== 'undefined') {
        validateNumber(clicksFav)
    }
    if (typeof clicksQueue !== 'undefined') {
        validateNumber(clicksQueue)
    }
    if (typeof id !== 'undefined') {
        validateId(id)
    }
}

module.exports = {
    validateName,
    validateUsername,
    validateId,
    validatePassword,
    validateOldPassword,
    validateCallback,
    validateData,
    validatequery
}