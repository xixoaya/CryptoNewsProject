const jwt = require('jsonwebtoken')
const {readFile} = require('fs')

// retrieve(user, (err, data) => {
//     if (err) res.send(err.message)
//     else {
//         const token = jwt.sign({ sub: data.id, exp: Math.floor(Date.now() / 1000) + 3600 }, SECRET)

//         res.send({token})
//     }
// })


const auth = (user, secret, callback) => {
    const {email: _email, password: _password} = user
    
    readFile(`${__dirname}/../users.json`, 'utf-8', (err, json) => {
        if (err) callback(new Error(err.message))
   
        const users = JSON.parse(json)
        const {id} = users.find(({email}) => email === _email)
        if (!id) callback(new Error('User not found baby'))

        const token = jwt.sign({ sub: id, exp: Math.floor(Date.now() / 1000) + 3600 }, secret)

        callback(null, token)

    })
    
}

module.exports = auth