function signIn(args = {}) {
    const { username, feedback } = args
    return ` <!DOCTYPE html>
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
            <input type="text" placeholder="username" name="username" ${username? `value="${username}"`: ''} required>
            <input type="password" placeholder="password" name="password" required>
            <button type="submit">Sign In</button>
            ${feedback? `<p>${feedback}</p>`: ''}
        </form>
        <a href='/signup'><button type='button'>Sign Up</button></a>
    </body>
    </html>

`
    
}

module.exports = signIn