const mongoose = require('mongoose')

const Schema = mongoose.Schema

const hamsterSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true
    }, 
    favFood: {
        type: String,
        required: true
    }, 
    loves: {
        type: String,
        required: true
    }, 
    imgName: {
        type: String,
        required: true
    }, 
    wins: Number,
    defeats: Number,
    games: Number
}, {timestamps: true})

module.exports = mongoose.model('hamsters', hamsterSchema)

