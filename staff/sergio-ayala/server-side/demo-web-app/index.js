const express = require('express')
const bodyParser = require('body-parser')
const formBodyParser = bodyParser.urlencoded({ extended: false })
const { registerUser, authenticateUser, retrieveUser } = require('users')
const { signUp, signIn, postSignUp, fail, home, landing } = require('./components')
const { getCookieId, noCookieGoHome } = require('./helpers')

const server = express()

server.use(express.static('public'))

server.get('/', (req, res) => {
    const { headers: { cookie } } = req
    const id = getCookieId(cookie)

        if (id) {
            try {
                retrieveUser(id, (error, user) => {
                    if (error) {
                        res.send(fail({feedback : error.message}))
                    } else {
                        res.send(home({user}))
                    }
                })
            } catch (error) {
                res.send(fail({feedback : error.message}))
            }
    
        } else res.send(landing())
})

server.get('/signup', (req, res) => {
    const { headers: { cookie } } = req
    const id = getCookieId(cookie)
    if (id) return res.redirect('/')
    res.send(signUp())
})

server.post('/signup', formBodyParser, (req, res) => {
    const { headers: { cookie } } = req
    noCookieGoHome(cookie)

    const { body: { name, username, password } } = req

    try {
        registerUser(name, username, password, (error) => {
            if (error) {
                res.send(signUp({name, username, feedback: error.message}))
            } else {
                // res.redirect('signin')
                res.send(postSignUp({name}))
            }
        })

    } catch (error) {
        res.send(signUp({name, username, feedback: error.message}))
    }
})

server.get('/signin', (req, res) => {
    const { headers: { cookie } } = req
    noCookieGoHome(cookie)
    res.send(signIn())
})

server.post('/signin', formBodyParser, (req, res) => {
    const { headers: { cookie } } = req 
    noCookieGoHome(cookie)
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password, (error, id) => {
            if (error) {
                res.send(signIn({username, feedback:error.message}))
            }
            res.setHeader('Set-Cookie', `user-id=${id} ; Max-Age=3600`)
            res.redirect('/')
        })
    } catch (error) {
        res.send(signIn({username, feedback:error.message}))
    }
})

server.post('/logout', formBodyParser, (req, res) => {
    res.setHeader('Set-Cookie', `user-id=null ; Max-Age=0`)
    res.redirect('/')
})

server.all('*', (req, res) => {
    res.send(fail({ feedback: 'sorry, this page isn\'t available' }))
})

server.listen(8000, () => {
    console.log('Server ready waiting for you on localhost 8000');
})