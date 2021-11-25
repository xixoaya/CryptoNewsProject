const express = require('express')
require('dotenv').config()
const { registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    findUsers,
    unregisterUser } = require('users')
const jwt = require('jsonwebtoken')
const { MongoClient } = require('mongodb')
const context = require('../users/logic/context')

const { env: { PORT, SECRET, MONGO_URL }, argv: [, , port = PORT || 8000] } = process

MongoClient.connect(MONGO_URL, (error, client) => {
    if (error) return console.error(error)

    context.db = client.db()


    const app = express()
    app.use(express.json()) //midleware

    app.post('/api/users/auth', (req, res) => {
        const { body: { username, password } } = req
        try {
            authenticateUser(username, password, (err, userId) => {
                if (err) res.send({ error: err.message })
                else {
                    const token = jwt.sign({ sub: userId, exp: Math.floor(Date.now() / 1000) + 3600 }, SECRET)
                    res.send({ token })
                }
            })

        } catch ({ message }) {
            res.send({ error: message })
        }
    })

    app.post('/api/users/register', (req, res) => {
        const { body: { name, username, password } } = req
        try {
            registerUser(name, username, password, (err, data) => {
                if (err) res.send({ error: err.message })
                else res.send(data)
            })

        } catch ({ message }) {
            res.send({ error: message })
        }
    })

    app.delete('/api/users/unregister', (req, res) => {
        const { headers: { authorization }, body: {password} } = req

        try {
            const [, token] = authorization.split(' ')
            const payload = jwt.verify(token, SECRET)
            const { sub: id } = payload
            unregisterUser(id, password, (err) => {
                if (err) res.send({ error: err.message })
                else res.send()
            })

        } catch ({ message }) {
            res.send({ error: message })
        }
    })

    app.post('/api/users', (req, res) => {
        const { headers: { authorization } } = req

        try {
            const [, token] = authorization.split(' ')
            const payload = jwt.verify(token, SECRET)
            const { sub: id } = payload

            retrieveUser(id, (err, data) => {
                if (err) res.send({ error: err.message })
                else res.send(data)
            })
        } catch ({ message }) {
            res.send({ error: message })
        }
    })

    app.patch('/api/users', (req, res) => {
        const { headers: { authorization }, body: data } = req
        try {
            const [, token] = authorization.split(' ')
            const payload = jwt.verify(token, SECRET)
            const { sub: id } = payload
            modifyUser(id, data, (err) => {
                if (err) res.send({ error: err.message })
                else res.send()
            })

        } catch ({ message }) {
            res.send({ error: message })
        }
    })

    app.listen(port, () => console.log(`Server listen on port ${port}`))

})