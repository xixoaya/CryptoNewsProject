const { readFile } = require("fs");

function retrieveUser(id, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')

    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')
    // TODO implement me
    readFile( `${__dirname}/../users.json`, 'utf8', (error, json) => {
        if (error) return callback(error)

        const users = JSON.parse(json)

        const user = users.find(user => user.id === id)

        if (!user) return callback(new Error(`No user with the id: ${id}`))

        delete user.id
        delete user.password
        
        // const publicDataUser = {
        //     name: user.name,
        //     username: user.username
        // }

        callback(null, user)
    })
}
module.exports = retrieveUser