function home(args) {
    const { user } = args
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
        <h1>Wellcome back ${user.name}</h1>

        <h2>you are at home </h2>

        <form method="POST" action="/logout">
            <button type="submit">Log Out</button>
        </form>
        
    </body>
    </html>

`
}
module.exports = home