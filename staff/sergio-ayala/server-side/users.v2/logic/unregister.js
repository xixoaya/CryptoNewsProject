const {readFile, writeFile} = require('fs')

const unregister = (user, callback) => {
    const {email: _email, password: _password} = user
    readFile(`${__dirname}/../users.json`, 'utf-8', (err, json) => {
        if (err) callback(err)
        else {
            const users = JSON.parse(json)
            const existsUser = users.some(({email}) => email === _email)
            if (!existsUser) callback(new Error('User not found'))
            else {
                const newUsers = users.filter(({email}) => email !== _email)
                const newJson = JSON.stringify(newUsers, null, 4)
                writeFile(`${__dirname}/../users.json`, newJson, () => {
                    if (err) callback(err)
                    else callback(null, true)
                })
            }
        }
    })

}

module.exports = unregister