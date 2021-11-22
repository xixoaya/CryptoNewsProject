const { throws } = require('assert')
const { readFile } = require('fs')
const jwt = require('jsonwebtoken')

const retrieve = (user, validation, callback) => {

    if (!validation.token) throw new Error('Needed token not provided')
    else {
        let payload = jwt.verify(validation.token, validation.SECRET)
        const { sub: id } = payload
        const { email: _email, password: _password } = user

        readFile(`${__dirname}/../users.json`, 'utf-8', (err, json) => {
            if (err) callback(err)
            else {
                const users = JSON.parse(json)
                const user = users.find(element => element.email === _email && element.id === id)
                if (!user) callback(new Error('User not found'))
                else if (user.password !== _password) callback(new Error('Wrong credentials'))
                else {
                    delete user.password
                    callback(null, user)
                }
            }
        })
    }

}

module.exports = retrieve