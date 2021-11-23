const { readFile, writeFile } = require('fs')

function unregisterUser(id, password, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')

    if (!typeof password === 'string') {throw new TypeError(password +' is not a string')}
    if (!password.trim().length) throw new Error('Password is empty')
    if (/\r?\n|\r|\t| /g.test(password)) throw new Error('Password has blank spaces')
    if (password.length < 5) {throw new Error ('Password has less than five characters')}

    if (!typeof callback === 'function') {throw new TypeError(callback + 'is not a function')}


    readFile(`${__dirname}/../users.json`, 'utf8', (error, json) => {
        if (error) return callback(error)

        const users = JSON.parse(json)

        const index = users.findIndex(user => user.id === id)

        if (index < 0) return callback(new Error(`user with id ${id} not found`))

        const user = users[index]

        if (user.password !== password) return callback(new Error(`wrong credentials`))

        users.splice(index, 1)

        const json2 = JSON.stringify(users, null, 4)

        writeFile(`${__dirname}/../users.json`, json2, error => {
            if (error) return callback(error)

            callback()
        })
    })
}

module.exports = unregisterUser