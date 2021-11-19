const {readFile, writeFile} = require('fs')

const changepassword = (user, callback) => {
    const {email: _email, password: _password, newPassword: _newPassword = ""} = user
    readFile(`${__dirname}/../users.json`, 'utf-8', (err, json) => {
        if (err) callback(err)
        else {
            const users = JSON.parse(json)
            const userIndex = users.findIndex(({email}) => email === _email)
            const user = users.find(({email}) => email === _email)
            if (userIndex < 1) callback(new Error('User not found'))
            else if (!(user.password === _password)) callback(new Error('Wrong credentials'))
            else if (!_newPassword || _newPassword.length < 1) callback(new Error('New Password is empy'))
            else {
                const {id, name, username, email, password} = users[userIndex]
                users[userIndex] = {
                    id,
                    name,
                    username,
                    email,
                    password: _newPassword
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

module.exports = changepassword