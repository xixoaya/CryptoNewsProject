const express = require('express')
const { register, unregister, modify, retrieve, changePassword, auth } = require('users')

require('dotenv').config()
// const jwt = require('jsonwebtoken')

const { env: { PORT, SECRET }, argv: [, , port = PORT || 8000] } = process

const app = express()
app.use(express.json()) //midleware

app.post('/api/users/auth', (req, res) => {
    const { body: user } = req
    auth(user, SECRET, (err, token) => {
        if (err) res.send(err.message)
        else res.send({token})
    })
})

app.post('/api/users/register', (req, res) => {
    const { body: user } = req
    register(user, (err, data) => {
        if (err) res.send(err.message)
        else res.send(data)
    })
})

app.post('/api/users/unregister', (req, res) => {
    const { body: user } = req
    unregister(user, (err, data) => {
        if (err) res.send(err.message)
        else res.send(data)
    })
})

app.post('/api/users', (req, res) => {
    const {  headers: { authorization }, body: user } = req
    retrieve(user, (err, data) => {
        if (err) res.send(err.message)
        else res.send(data)
    })
})

app.patch('/api/users', (req, res) => {
    const { body: user } = req
    modify(user, (err, data) => {
        if (err) res.send(err.message)
        else res.send(data)
    })
})

app.patch('/api/users/password', (req, res) => {
    const { body: user } = req
    changePassword(user, (err, data) => {
        if (err) res.send(err.message)
        else res.send(data)
    })
})

app.listen(port, () => console.log(`Server listen on port ${port}`))