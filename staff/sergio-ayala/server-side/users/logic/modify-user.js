const { readFile, writeFile } = require('fs')

function modifyUser(userId, data, callback) { // data => { name: ?, username: ?, password: ? }
    // TODO implement me
    readFile( `${__dirname}/../users.json`, 'utf8', (error, json) => {
        if (error) return callback(error)

        const users = JSON.parse(json)

        const index = users.findIndex(({id}) => id == userId )

        const user = users[index]

        const {name, username, oldPassword, newPassword} = data 

        if (!user) return callback(new Error(`No user with that ${id}`))

        if (username) {
            const exist = users.some(u => u.username === username)
            if (exist) return callback(new Error (`${username} already exist as a username`))
            user.username = username
        }

        if (newPassword) { 
            if (oldPassword!==user.password) {return callback(new Error(`Wrong credentials to change password`))} 
            user.password = newPassword
        }

        for (const property in data)
        if (property !== 'username' && property !== 'newPassword' && property !== 'oldPassword') {
            user[property] = data[property]
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

