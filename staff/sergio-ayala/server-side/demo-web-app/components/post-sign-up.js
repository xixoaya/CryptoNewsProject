function postSignUp(arg = {}) {
    const { name } = arg

    return `<!DOCTYPE html>
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

`
}

module.exports = postSignUp