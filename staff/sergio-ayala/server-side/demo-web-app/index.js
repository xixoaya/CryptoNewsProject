const express = require('express')
const bodyParser = require('body-parser')
const formBodyParser = bodyParser.urlencoded({ extended: false })
const { registerUser, authenticateUser } = require('users')

const server = express()

server.use(express.static('public'))

server.get('/signup', (req, res) => {
    res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Demo Web App</title>
        
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <h1>who is there ?? </h1>
            
            <form method='POST' action="/signup">
                <input type="text" placeholder="name" name="name">
                <input type="text" placeholder="username" name="username">
                <input type="password" placeholder="password" name="password">
                <button type="submit">Sign Up</button>
            </form>
            <a href='/signin'><button type='button'>Sign In</button></a>
        </body>
        </html>
   
    `)
})

server.post('/signup', formBodyParser, (req, res) => {

    const { body: { name, username, password } } = req

    registerUser(name, username, password, (error) => {
        if (error) {
            res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Demo Web App</title>
        
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <h1>Nice try, but noo</h1>

            <h2>${error.message}</h2>
            
            <a href='/signup'><button type='button'>Try Again</button></a>
        </body>
        </html>
   
    `)
        } else {
            // res.redirect('signin')
            res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Demo Web App</title>
        
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <h1>Well done ${name}</h1>

            <h2>you can now go to sign in to get in </h2>
            
            <a href='/signin'><button type='button'>Sign In</button></a>
        </body>
        </html>
   
    `)}
        
    })
})


server.get('/signin', (req, res) => {
    res.send(` <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Demo Web App</title>
        
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <h1>welcome back </h1>
            
            <form method='POST' action="/signin">
                <input type="text" placeholder="username" name="username">
                <input type="password" placeholder="password" name="password">
                <button type="submit">Sign In</button>
            </form>
            <a href='/signup'><button type='button'>Sign Up</button></a>
        </body>
        </html>
   
    `)
})

server.post('/signin', formBodyParser, (req, res) => {
    const { body: { username, password } } = req

    authenticateUser(username, password, (error, id) => {
        if (error) {
            res.send(` <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Demo Web App</title>
                
                    <link rel="stylesheet" href="style.css">
                </head>
                <body>
                    <h1>welcome back </h1>
                    
                    <form method='POST' action="/signin">
                        <input type="text" placeholder="username" name="username">
                        <input type="password" placeholder="password" name="password">
                        <button type="button">Sign In</button>
                        <span>${error.message}</span>
                    </form>
                    <a href='/signup'><button type='button'>Sign Up</button></a>
                </body>
                </html>
   
    `)}
    res.setHeader('Set-Cookie', `user-id=${id} ; Max-Age=3600`)
    res.redirect('/private')
            
    })

})

server.listen(8000, () => {
    console.log('Server ready waiting for you on localhost 8000');
})