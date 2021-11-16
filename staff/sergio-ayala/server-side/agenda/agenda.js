const fs = require('fs')
const { readFile, writeFile } = fs

const { argv: [, , command] } = process

if (command === 'list') // $ node agenda.js list
    readFile('./contacts.json', 'utf8', (error, json) => {
        if (error) {
            console.error(error)

            return
        }

        const contacts = JSON.parse(json)

        contacts.forEach(({ name, phone, email }) => console.log(name, phone, email))
    })
else if (command === 'save') // $ node agenda.js save Mario 456456456 mario@mail.com
    readFile('./contacts.json', 'utf8', (error, json) => {
        if (error) {
            console.error(error.message)

            return
        }

        const contacts = JSON.parse(json)

        const { argv: [, , , name, phone, email] } = process

        contacts.push({ id:  contacts.length + 1, name, phone, email })

        const json2 = JSON.stringify(contacts, null, 4)

        writeFile('./contacts.json', json2, error => {
            if (error) {
                console.error(error.message)

                return
            }
        })
    })
else if (command === 'find') // $ node agenda.js find peter
    readFile('./contacts.json', 'utf8', (error, json) => {
        if (error) {
            console.error(error)

            return
        }

        const contacts = JSON.parse(json)
        const { argv: [, , , query] } = process

        // const index = contacts.indexOf(o => o.name || o.phone || o.email === query)

        // if (index < 0) {
        //     return console.log('nothing found with that name, email or phone')

        // } else if (index > 0) {

        //     return console.log(contacts[index])
        // }

        contacts.forEach(({name, phone, email}) => {
            if (name.toLowerCase().includes(query.toLowerCase()) || phone.toLowerCase().includes(query.toLowerCase()) || email.toLowerCase().includes(query.toLowerCase())) {
                console.log(e)
            }

        });



    })
else if (command === 'remove') // $ node agenda.js remove 3 
    readFile('./contacts.json', 'utf8', (error, json) => {
        if (error) {
            console.error(error)

            return
        }

        const contacts = JSON.parse(json)
        const { argv: [, , , userId] } = process

        const index = contacts.findIndex(({id}) => id == userId )

        if (index < 0) {
            return console.log('nothing found with that name, email or phone')

        } else {

            contacts.splice(index, 1)

            const json2 = JSON.stringify(contacts, null, 4)

            writeFile('./contacts.json', json2, error => {
                if (error) {
                    console.error(error.message)

                    return
                }
                else console.log('Jugador eliminado')
            })

        }
        //    contacts.forEach(e => {
        //         if (e.name === query || e.phone === query || e.email === query) {
        //             console.log(e)
        //         }
        //         });

    })

else if (command === 'modify') // $ node agenda.js modify 3 * * peter3@mail.com
    readFile('./contacts.json', 'utf8', (error, jason) => {
        if (error) {
            console.error(error.message)
            return
        }
        const contacts = JSON.parse(jason)

        const { argv: [, , , id, name, phone, email] } = process

        const index = contacts.findIndex(user => user.id == id)

        if (index < 0) {
            return console.log('nothing found with that id')

        } else {

            const contact = contacts[index]            
            
            const newContact = {
                id: id,
                name: (name === '*' || !name) ? contact.name : name,
                phone: (phone === '*' || !phone) ? contact.phone : phone,
                email: (email === '*' || !email) ? contact.email : email
            }

            contacts[index] = newContact

            const json2 = JSON.stringify(contacts, null, 4)

            writeFile('./contacts.json', json2, error => {
                if (error) {
                    console.error(error.message)

                    return
                }
                else console.log('Jugador modificado')
            })

        }

    })