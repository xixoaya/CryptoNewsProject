const context = require('./context')

function registerUser(name, username, password, callback) {
    if (!typeof name === 'string') {throw new TypeError(name + ' is not a string')}
    if (!name.trim().length) throw new Error('Name is empty')
    if (!name.trim() === name) throw new Error('Name has spaces around')

    if (!typeof username === 'string') {throw new TypeError( username + ' is not a string')}
    if (!username.trim().length) throw new Error('Email is empty')
    if (username.length < 4) {throw new Error ('Username is to short')}

    if (!typeof password === 'string') {throw new TypeError(password +' is not a string')}
    if (!password.trim().length) throw new Error('Password is empty')
    if (/\r?\n|\r|\t| /g.test(password)) throw new Error('Password has blank spaces')
    if (password.length < 5) {throw new Error ('Password has less than five characters')}

    if (!typeof callback === 'function') {throw new TypeError(callback + 'is not a function')}

    const users = context.db.collection('users')

    users.insertOne({ name, username, password }, error => {
        if (error) {
            if (error.code === 11000) callback(new Error(`User with username ${username} already exists`))
            else callback(error)
        } else
        callback(null)
    })

    // readFile(`${__dirname}/../users.json`, 'utf8', (error, json) => {
    //     if (error) return callback(error)

    //     const users = JSON.parse(json)

    //     const user = users.find(user => user.username === username)

    //     if (user) return callback(new Error(`user with username ${username} already exists`))

    //     users.push({ id: Date.now().toString(36), name, username, password })

    //     const json2 = JSON.stringify(users, null, 4)

    //     writeFile(`${__dirname}/../users.json`, json2, error => {
    //         if (error) return callback(error)

    //         callback()
    //     })
    // })
}

module.exports = registerUser