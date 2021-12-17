const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { registerUser, authenticateUser, retrieveUser, modifyUser, unregisterUser, 
    modifyBulletin, retrieveBulletins, retrieveBulletinDetail, retrieveHomeLeads, retrieveSearchedBulletins
} = require('./handlers')
const { mongoose } = require('proyecto-data')
const { env: { PORT, MONGO_URL }, argv: [, , port = PORT || 8000] } = process
const corsOptions = {
    "Access-Control-Allow-Methods": ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
}

mongoose.connect(MONGO_URL)

    .then(() => {
        const app = express()
        app.use(cors(corsOptions))

        app.use(express.json()) //midleware

        
        app.post('/api/users/auth', authenticateUser)
        app.post('/api/users/register', registerUser)
        app.delete('/api/users/unregister', unregisterUser)
        app.post('/api/users', retrieveUser)
        app.patch('/api/users', modifyUser)


        app.patch('/api/bulletins', modifyBulletin)
        app.post('/api/bulletins', retrieveBulletins)
        app.get('/api/bulletins/:bulletinId', retrieveBulletinDetail)
        app.get('/api/bulletins/home', retrieveHomeLeads)
        app.post('/api/bulletins/search', retrieveSearchedBulletins)



        app.all('/api/*', (req, res) => {
            res.status(404).send({ message: 'Sorry this page doesnt exist' })
        })
        app.listen(port, () => console.log(`Server listen on port ${port}`))
    })


    .catch(error => console.error(error))







