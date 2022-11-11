const express = require('express')

const { getWinners, getlosers, getMatches, getMatchWinner, getOneMatch, createMatch, deleteMatch } = require('../controllers/matchesController')


const router = express.Router()

router.get('/winners', getWinners)

router.get('/losers', getlosers)

router.get('/', getMatches)

router.get('/matchWinners/:id', getMatchWinner)

// GET One obj with specific time
router.get('/:id', getOneMatch)

// POST new Match obj in database
router.post('/', createMatch)

//DELETE Match obj in database
router.delete('/:id', deleteMatch)


module.exports = router
