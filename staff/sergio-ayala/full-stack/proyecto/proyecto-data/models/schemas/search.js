const { Schema } =require('mongoose')

const search = new Schema ({
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
    query: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },

})

module.exports = search