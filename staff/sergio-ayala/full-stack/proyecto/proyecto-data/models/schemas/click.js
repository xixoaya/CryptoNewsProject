const { Schema } =require('mongoose')

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
        required: false
    },
    type: {
        type: String,
        required: true,
    },
})

module.exports = click