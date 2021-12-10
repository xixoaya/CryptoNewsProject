const { Schema } =require('mongoose')

const comment = new Schema ({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: [{
            type: ObjectId,
            ref: 'User'
        }],
        required: true
    },
})

module.exports = comment