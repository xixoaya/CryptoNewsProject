const registerUser = require('./logic/register-user')
const unregisterUser = require('./logic/unregister-user')
const retrieveUser = require('./logic/retrieve-user')
const findUsers = require('./logic/find-users')
const modifyUser = require('./logic/modify-user')

const { argv: [, , command] } = process

if (command === 'register') { // $ node manager register "Peter Pan" peterpan 123123123
    const { argv: [, , , name, username, password] } = process

    registerUser(name, username, password, error => {
        if (error) {
            console.log(error.message)

            return
        }

        console.log('user registered')
    })
} else if (command === 'unregister') { // $ node manager unregister kw0mnxlk 123123123
    const { argv: [, , , id, password] } = process

    unregisterUser(id, password, error => {
        if (error) {
            console.log(error.message)

            return
        }

        console.log(`user ${id} unregistered`)
    })
} else if (command === 'retrieve') { // $ node manager retrieve kw0ms3h9
    // TODO implement me
    const { argv: [, , , id] } = process

    retrieveUser(id, (error, user) => {
        if (error) {
            console.log(error.message)

        } else if (user) {
            console.log(user)
        }
    })

} else if (command === 'find') { // $ node manager find pan
    // TODO implement me
    const { argv: [, , , query] } = process

    findUsers(query, (error, user) => {
        if (error) {
            console.log(error.message)

        } else if (user) {
            console.log(user)
        }
    })

} else if (command === 'modify') { // $ node manager modify kw0ms3h9 * * 123123123 234234234
    const { argv: [, , , id, name, username, oldPassword, newPassword] } = process

    modifyUser(id, {name, username, oldPassword, newPassword}, (error)=> {
        if (error) {
            console.log(error.message)
        } else {console.log('User updated')}
        
    })
    // $ node manager modify kw0ms3h9 "Juanito Perez" * *
    // TODO implement me
}