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
    lead: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    saveDate: {
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
    tag: {
        type: String,
        required: false
    },
    source: {
        type: [{
            type: ObjectId,
            ref: 'Source'
        }],
        required: true
    },
    comments: {
        type: [comment]
    }
})

module.exports = bulletin