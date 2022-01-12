const { Schema, Types: { ObjectId } } = require('mongoose')

const click = new Schema ({
    user: {
        type: [{
            type: ObjectId,
            ref: 'User'
        }],
        required: true
    },
    bulletin: {
        type: [{
            type: ObjectId,
            ref: 'Bulletin'
        }],
        required: true
    },
    type: {
        type: String,
        required: true,
    },
})

module.exports = click