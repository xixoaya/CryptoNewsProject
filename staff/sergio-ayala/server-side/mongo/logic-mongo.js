const createUser = (collection, data, callback) => {
    // Collection es la coleción de Mongo y data es el objeto a introducir

    collection.insertOne(data, error => {
        if (error) return callback(error)
        collection.find({}).toArray((error, users) => {
            if (error) return callback(error)
            callback(null, users)
        })
    })
}

const updateUser = (collection, data, callback) => {
}

const findUser = (collection, data, callback) => {
}

const deleteUser = (collection, data, callback) => {
}

module.exports = {
    createUser,
    updateUser,
    findUser,
    deleteUser
}