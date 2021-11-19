const {readFile} = require('fs')

const retrieve = (user, token, callback) => {
    const {email: _email, password: _password} = user
    readFile(`${__dirname}/../users.json`, 'utf-8', (err, json) => {
        if (err) callback(err)
        else {
            const users = JSON.parse(json)
            const user = users.find(({email}) => email === _email)
            if (!user) callback(new Error('User not found'))
            else if (user.password !== _password) callback(new Error('Wrong credentials'))
            else callback(null, user)
        }
    })

}

module.exports = retrieve