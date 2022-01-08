const { Schema, Types: { ObjectId } } = require('mongoose')

const search = new Schema ({
    user: {
        type: [{
            type: ObjectId,
            ref: 'User'
        }],
        required: false
    },
    bulletins: {
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
    lastUpdate: {
        type: Date,
        required: true
    },
    source: {
        type: String,
        required: true
    },

})

module.exports = search