const {argv: [,,command], argv} = process
const {register, unregister, modify, retrieve, changePassword} = require('./logic/index.js')

if(command === 'register') {
    const user = {
        name: argv[3],
        username: argv[4],
        email: argv[5],
        password: argv[6]
    }
    register(user, (err, res) => {
        if(err) console.log(err.message)
        else console.log(res)
    })
}

else if(command === 'retrieve') {
    const user = {
        email: argv[3],
        password: argv[4] === '*' ? null: argv[4] || null
    }
    retrieve(user, (err, res) => {
        if(err) console.log(err.message)
        else console.log(res)
    })
}

else if(command === 'modify') {
    const user = {
        email: argv[3],
        name: argv[4] === '*' ? null: argv[4] || null,
        username: argv[5] === '*' ? null: argv[5] || null,
        password: argv[6] === '*' ? null: argv[6] || null
    }
    modify(user, (err, res) => {
        if(err) console.log(err.message)
        else console.log(res)
    })
}

else if(command === 'change-password') {
    const user = {
        email: argv[3],
        password: argv[4] === '*' ? null: argv[4] || null,
        newPassword: argv[5] === '*' ? null: argv[5] || null,
    }
    changePassword(user, (err, res) => {
        if(err) console.log(err.message)
        else console.log(res)
    })
}

else if(command === 'unregister') {
    const user = {
        email: argv[3],
        password: argv[4]
    }
    unregister(user, (err, res) => {
        if(err) console.log(err.message)
        else console.log(res)
    })
}