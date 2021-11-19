const {readFile, writeFile} = require('fs')

const modify = (user, callback) => {
    const {name: _name, username: _username, email: _email} = user
    readFile(`${__dirname}/../users.json`, 'utf-8', (err, json) => {
        if (err) callback(err)
        else {
            const users = JSON.parse(json)
            const userIndex = users.findIndex(({email}) => email === _email)
            if (userIndex < 1) callback(new Error('User not found'))
            else {
                const {id, name, username, email, password} = users[userIndex]
                users[userIndex] = {
                    id,
                    name: _name || name,
                    username: _username || username,
                    email,
                    password
                }
                const newJson = JSON.stringify(users, null, 4)
                writeFile(`${__dirname}/../users.json`, newJson, () => {
                    if (err) callback(err)
                    else callback(null, true)
                })
            }
        }
    })

}

module.exports = modify