const { Schema, Types: { ObjectId } } = require('mongoose')

const lastScrap = new Schema({
    lastUpdate: {
        type: Date,
        required: false
    },
})

module.exports = lastScrap