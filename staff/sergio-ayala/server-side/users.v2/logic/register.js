const {readFile, writeFile} = require('fs')

const register = (user, callback) => {
    const {email: _email} = user
    readFile(`${__dirname}/../users.json`, 'utf-8', (err, json) => {
        if (err) callback(err)
        else {
            const users = JSON.parse(json)
            const duplicateUser = users.find(({email}) => email === _email)
            if (duplicateUser) callback(new Error('User alredy exists'))
            else {
                user.id = users[users.length - 1].id + 1
                const newUsers = [...users, user]
                const newJson = JSON.stringify(newUsers, null, 4)
                writeFile(`${__dirname}/../users.json`, newJson, () => {
                    if (err) callback(err)
                    else callback(null, true)
                })
            }
        }
    })

}

module.exports = register