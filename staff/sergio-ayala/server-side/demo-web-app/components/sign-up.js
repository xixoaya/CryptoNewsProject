function signUp(args = {}) {

    const {name, username, feedback} = args
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
        <h1>who is there ?? </h1>
        
        <form method='POST' action="/signup">
            <input type="text" placeholder="name" name="name" ${name? `value="${name}"`: ''} required>
            <input type="text" placeholder="username" name="username" ${username? `value="${username}"`: ''} required>
            <input type="password" placeholder="password" name="password">
            <button type="submit">Sign Up</button>
            ${feedback? `<p>${feedback}</p>`: ''}
        </form>
        <a href='/signin'><button type='button'>Sign In</button></a>
    </body>
    </html>

`
}

module.exports = signUp