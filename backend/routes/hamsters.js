const express = require('express')
const {
    createHamster,
    getHamsters,
    getOneHamster,
    deleteHamster,
    updateHamster,
    getRandomHamster
} = require('../controllers/hamsterController')

const router = express.Router()

// GET all hamsters
router.get('/', getHamsters)

// GET two random hamsters
router.get('/random', getRandomHamster)

// GET one specific hamster
router.get('/:id', getOneHamster)

// POST create new hamster in database
router.post('/', createHamster)

// PUT update hamsters wins, games, loses
router.put('/:id', updateHamster)

// DELETE hamster
router.delete('/:id', deleteHamster)

module.exports = router