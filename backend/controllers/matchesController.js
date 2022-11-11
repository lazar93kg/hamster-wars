const Matches = require('../models/matchesModel')
const Hamster = require('../models/hamsterModel')
const mogoose = require('mongoose')


// GET Array with all match object
const getMatches = async (req, res) => {
    const matches = await Matches.find({})
    res.status(200).json(matches)
}

// 'GET One obj with specific time'
const getOneMatch = async (req, res) => {
    const { id } = req.params
    // Check if is valid match object 
    if (!mogoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Match not found' })
    }
    const match = await Matches.findById(id)

    if (!match) {
        return res.status(404).json({ error: 'Match not found' })
    }

    res.status(200).json(match)
}
const getMatchWinner = async (req, res) => {
    const { id } = req.params
    // Check if is valid object
    if (!mogoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Match not found, please try again' })
    }
    try {
        // Find match winner
        const winnerHamster = await Matches.find({ winnerId: id })
        console.log(winnerHamster)
        res.status(200).json(winnerHamster)
    } catch (error) {
        return res.status(404).json({ error: 'Match is not found in database, please try again' })
    }

}
// POST Create new Match 
const createMatch = async (req, res) => {
    const newMatch = req.body
    try {
        const match = await Matches.create({ winnerId: newMatch[0][0]._id, loserId: newMatch[1][0]._id })
        res.status(200).json(match)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// DELETE match obj in database
const deleteMatch = async (req, res) => {
    const { id } = req.params

    // Check if is valid match object 
    if (!mogoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Match not found' })
    }// Find and delete match object 

    try {
        const match = await Matches.findOneAndDelete({ _id: id })
        res.status(200).json(match)
    } catch (error) {
        res.status(404).json({ error: 'Match not found' })
    }

}

// 'GET list of top 5 Winners'
const getWinners = async (req, res) => {
    try {
    const hamsters = await Hamster.find({})
    const winners = hamsters.sort((a, b) =>   b.wins- a.wins); 
    res.status(200).json(winners)
    } catch (error) {
    res.status(404).json({error: 'Not found'})
    }
    
}


// 'GET list of top 5 losers'
const getlosers = async (req,res) => {
    try {
         const hamsters = await Hamster.find({})
    const losers = hamsters.sort((a, b) =>   b.defeats - a.defeats  );
    res.status(200).json(losers)
    } catch (error) {
    res.status(404).json({error: 'Not found'})
    }  
}


module.exports = {
    getMatches,
    getOneMatch,
    getMatchWinner,
    createMatch,
    deleteMatch,
    getWinners,
    getlosers,
}
