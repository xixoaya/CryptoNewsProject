const { Schema } =require('mongoose')

const user = new Schema({

    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator(username){
                    return username.length > 3
                },
                message: 'username too short'
            },
            {
                validator(username){
                    return !username.includes(' ')
                },
                message: 'username cant have blank spaces'
            }
        ]
    },
    password: {
        type: String,
        required: true,
        validate : [
            {
                validator(password){
                    return password.length > 5
                },
                message: 'password too short'
            },
            {
                validator(password){
                    return !password.includes(' ')
                },
                message: 'password cant have blank spaces'
            }
        ]
    },
    queue: {
        type: [{
            type: ObjectId,
            ref: 'Bulletin'
        }],
        required: false
    },
    history: {
        type: [{
            type: ObjectId,
            ref: 'Bulletin'
        }],
        required: false
    },
    favs: {
        type: [{
            type: ObjectId,
            ref: 'Bulletin'
        }],
        required: false
    },
})

module.exports = user