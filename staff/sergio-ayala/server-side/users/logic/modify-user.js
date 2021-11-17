const { readFile, writeFile } = require('fs')

function modifyUser(userId, data, callback) { // data => { name: ?, username: ?, password: ? }
    // TODO implement me
    readFile( `${__dirname}/../users.json`, 'utf8', (error, json) => {
        if (error) return callback(error)

        const users = JSON.parse(json)

        const index = users.findIndex(({id}) => id == userId )

        const user = users[index]

        if (!user) return callback(new Error(`No user with that ${id}`))

        if (data.name !== '.') {
            user.name = data[0]
        }
        if (data.username !== '.') {
            user.username = data[1]
        }
        if (data.oldPassword !== '.') {
            if (data.oldPassword!==user.password) {return callback(new Error(`Wrong credentials to change password`))} 
            user.password = data.newPassword
        }

        users[index] = user
        const json2 = JSON.stringify(users, null, 4)

        writeFile('./users.json', json2, error => {
            if (error) return callback(error)

            callback(null)
        })
    })
}
module.exports = modifyUser