const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Group = new Schema(
    {   
        name: { type: String, required: true},
        members: { type: [String]},
        key: { type: String, required: true },
    },
)

module.exports = mongoose.model('group', Group);