function fail(args) {
    const {feedback} = args
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
        <h1>Somethings wrong </h1>
        
        <span>${feedback}</span>
        
        <a href='/signup'><button type='button'>Sign Up</button></a>
    </body>
    </html>`
}

module.exports = fail