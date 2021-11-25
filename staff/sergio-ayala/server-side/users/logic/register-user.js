const context = require('./context')

function registerUser( name, username, password , callback) {
    if (typeof name !== 'string') throw new TypeError('name is not a string')
    if (!name.trim().length) throw new Error('Name is empty or blank')
    if (name.trim() !== name) throw new Error('Name has spaces around')

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

    users.insertOne({ name, username, password }, error => {
        if (error) {
            if (error.code === 11000) callback(new Error(`User with username ${username} already exists`))
            else callback(error)
        } else
        callback(null)
    })
}

module.exports = registerUser