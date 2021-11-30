const express = require('express')
require('dotenv').config()
const { registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    findUsers,
    unregisterUser } = require('./handlers')
const jwt = require('jsonwebtoken')
const { MongoClient } = require('mongodb')
const context = require('../users/logic/context')

const { env: { PORT, SECRET, MONGO_URL }, argv: [, , port = PORT || 8000] } = process

MongoClient.connect(MONGO_URL, (error, client) => {
    if (error) return console.error(error)

    context.db = client.db()

    const app = express()
    
    app.use(express.json()) //midleware

    app.post('/api/users/auth', authenticateUser)

    app.post('/api/users/register', registerUser)

    app.delete('/api/users/unregister', unregisterUser)

    app.post('/api/users', retrieveUser)

    app.patch('/api/users', modifyUser)

    app.listen(port, () => console.log(`Server listen on port ${port}`))

})