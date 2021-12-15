const { Schema, Types: { ObjectId } } = require('mongoose')
const comment = require('./comment')

const bulletin = new Schema ({
    url: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: false
    },
    createdTime: {
        type: String,
        required: false
    },
    savedDate: {
        type: Date,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    imageSrc: {
        type: String,
        required: false
    },
    tags: {
        type: [{
            type: String
        }],
        required: false
    },
    impContent: {
        type: [{
            type: String
        }],
        required: false
    },
    badge: {
        type: String,
        required: false
    },
    source: {
        type: String,
        required: true
    },
    comments: {
        type: [comment]
    }
})

module.exports = bulletin