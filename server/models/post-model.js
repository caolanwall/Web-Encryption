const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema(
    {
        userName: { type: String, required: true },
        postContent: { type: String, required: true },
        group: { type: String, required: false },
    },
)

module.exports = mongoose.model('post', Post);