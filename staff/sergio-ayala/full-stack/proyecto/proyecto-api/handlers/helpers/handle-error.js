const { CredentialsError, ConflictError, FormatError, NotFoundError } = require('proyecto-errors')
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken')

function handleError(err, res) {
    let status = 500

    if (err instanceof CredentialsError || err instanceof TokenExpiredError)
        status = 401
    else if (err instanceof TypeError || err instanceof FormatError || err instanceof JsonWebTokenError)
        status = 400
    else if (err instanceof NotFoundError)
        status = 404
    else if (err instanceof ConflictError)
        status = 409

    res.status(status).send({ error: err.message })
}


module.exports = handleError