const { readFile } = require("fs");

function findUsers(query, callback) {
    // TODO implement me
    readFile(`${__dirname}/../users.json`, 'utf8', (error, json) => {
        if (error) return callback(error)

        const users = JSON.parse(json)

        const usersMatch = users.filter(({ id, name, username }) => id.toLowerCase().includes(query.toLowerCase()) || name.toLowerCase().includes(query.toLowerCase()) || username.toLowerCase().includes(query.toLowerCase()))

        if (!usersMatch) return callback(new Error(`No user found with ${query} input`))

        const publicData = usersMatch.map(element => {
            return {
                name: element.name,
                username: element.username
            }
        })

        callback(null, publicData)

    })
}
module.exports = findUsers