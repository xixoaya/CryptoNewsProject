const { Schema } =require('mongoose')

const source = new Schema ({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
})

module.exports = source