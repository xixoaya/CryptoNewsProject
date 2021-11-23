// const { readFile } = require("fs");
const context = require('./context')

function authenticateUser(username, password, callback) {
    if (typeof username !== 'string') throw new TypeError( 'username is not a string')
    if (!username.trim().length) throw new Error('username is empty or blank')
    if (/\r?\n|\r|\t| /g.test(username)) throw new Error('username has blank spaces')
    if (username.length < 6) throw new Error ('username is to short')

    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (!password.trim().length) throw new Error('password is empty or blank')
    if (/\r?\n|\r|\t| /g.test(password)) throw new Error('password has blank spaces')
    if (password.length < 6) throw new Error ('password is to short')

    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    const users = context.db.collection('users')

    users.findOne({username, password}, (error, user) => {
        if (error) return callback(error)
        if (!user) return callback(new Error('Wrong credentials'))
        callback(null, user._id.toString())
    })

    // readFile(`${__dirname}/../users.json`, 'utf8', (error, json) => {
    //     if (error) return callback(error)

    //     const users = JSON.parse(json)

    //     const user = users.find(user => user.username === username && user.password === password)

    //     if (!user) return callback(new Error ('No user found with those credentials'))

    //     callback(null, user.id)

    // })


}
module.exports = authenticateUser