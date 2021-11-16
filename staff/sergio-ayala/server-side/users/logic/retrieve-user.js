const { readFile } = require("fs");

function retrieveUser(id, callback) {
    // TODO implement me
    readFile( './users.json', 'utf8', (error, json) => {
        if (error) return callback(error)

        const users = JSON.parse(json)

        const user = users.find(user => user.id === id)

        if (!user) return callback(new Error(`No user with that ${id}`))

        const publicDataUser = {
            name: user.name,
            username: user.username
        }

        callback(null, publicDataUser)
    })
}
module.exports = retrieveUser