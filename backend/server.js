require('dotenv').config()
const cors = require("cors");
const express = require('express')
const mongoose = require('mongoose')
const hamstersRoutes = require('./routes/hamsters')
const hamsterMatches = require('./routes/matches')




// express app
const app = express()
// middleware
app.use(cors());
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/hamsters', hamstersRoutes)
app.use('/api/matches', hamsterMatches)

// connect to DB and listen on port
mongoose.connect(process.env.MONG_DB)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB and Listening on port 4000')
        })
    })
    .catch((err) => {
        console.log(err)
    })

