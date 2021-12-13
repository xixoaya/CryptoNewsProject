const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { registerUser, authenticateUser, retrieveUser, modifyUser, unregisterUser } = require('./handlers')

const { mongoose } = require('proyecto-data')
// const context = require('../users/logic/context')

const { env: { PORT, MONGO_URL }, argv: [, , port = PORT || 8000] } = process

const corsOptions = {
    "Access-Control-Allow-Methods" : ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}

// res.header("Access-Control-Allow-Origin", "*");
// res.header("Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE");
// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");


mongoose.connect(MONGO_URL)

    .then(() => {

        // context.db = mongoose.connection.db

        const app = express()

         app.use(cors(corsOptions));

         // app.use(cors(corsOptions));

        // app.use(function (req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        //     next();
        // });

        app.use(express.json()) //midleware

        app.post('/api/users/auth', authenticateUser)

        app.post('/api/users/register', registerUser)

        app.delete('/api/users/unregister', unregisterUser)

        app.post('/api/users', retrieveUser)

        app.patch('/api/users', modifyUser)
        
        app.all('/api/*', (req, res) => {
            res.status(404).send({message: 'Sorry this page doesnt exist'})
        })
        
        app.listen(port, () => console.log(`Server listen on port ${port}`))
    })

    .catch(error => console.error(error))

