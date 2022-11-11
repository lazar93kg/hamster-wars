const mongoose = require('mongoose')

const Schema = mongoose.Schema

const matchesSchema = new Schema({
    winnerId: String,
    loserId: String
}, {timestamps: true})

module.exports = mongoose.model('matches', matchesSchema)

