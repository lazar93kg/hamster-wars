const Hamster = require('../models/hamsterModel')
const Matches = require('../models/matchesModel')


const mogoose = require('mongoose')

// GET all hamsters

const getHamsters = async (req, res) => {

    try {
        const hamsters = await Hamster.find({}).sort({ createdAt: -1 })
        res.status(200).json(hamsters)
    } catch (error) {
        res.status(404).json({ error: 'Somthing went wrong, please try again' })
    }
}
// GET random hamster Obj
const getRandomHamster = async (req, res) => {
    try {
        const hamsters = await Hamster.aggregate([{ $sample: { size: 2 } }])
        res.status(200).json(hamsters)
    } catch (error) {
        res.status(404).json({ error: 'Somthing went wrong, please try again' })
    }

}
// PUT update two hamster obj wins, games, loses
const updateHamster = async (req, res) => {
    const { id: _id } = req.params
    const loser = req.body

    // Check if is valid object for winner
    if (!mogoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: 'Hamster not found, please try again ' })
    }
    // Check if is valid object for loser
    if (!mogoose.Types.ObjectId.isValid(loser[0]._id)) {
        return res.status(404).json({ error: 'Hamster not found, please try again ' })
    }

    // Update winner
    const hamsterLoser = await Hamster.findByIdAndUpdate(
        { _id: loser[0]._id },
        { $inc: { defeats: 1, games: 1 } }

    )

    // Update loser
    const hamster = await Hamster.findByIdAndUpdate(
        { _id: _id },
        { $inc: { wins: 1, games: 1 } })
    let results = [hamster, hamsterLoser]

    // Error if hamster is not found in db
    if (!hamster) {
        return res.status(404).json({ error: 'Hamster is not found in database, please try again' })
    }
    res.status(200).json(results)

}

// DELETE Hamster and matches
const deleteHamster = async (req, res) => {
    const { id } = req.params
    // Check if is valid object
    if (!mogoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Hamster not found, please try again' })
    }
    try {
        // Find and delete hamster
        const hamster = await Hamster.findOneAndDelete({ _id: id })

        // Find and delete all matches that hamster participate in
        const match = await Matches.deleteMany(
            {
                $or: [{
                    winnerId: id
                }, {
                    loserId: id
                }]
            }
        )
        res.status(200).json(hamster)
    } catch (error) {
        return res.status(404).json({ error: 'Hamster is not found in database, please try again' })
    }


}
// GET one Hamster
const getOneHamster = async (req, res) => {
    const { id: _id } = req.params

    // Check if is valid object
    if (!mogoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: 'Hamster not found, please try again' })
    }
    try {
        const hamster = await Hamster.findById(_id)
        res.status(200).json(hamster)
    } catch (error) {
        return res.status(404).json({ error: 'Hamster not found, please try again' })
    }
}

// Create Hamster
const createHamster = async (req, res) => {
    const { name, age, favFood, loves, imgName, wins, defeats, games } = req.body

    // add Hamster to mongodb
    try {
        const hamster = await Hamster.create({ name, age, favFood, loves, imgName, wins, defeats, games })
        res.status(200).json(hamster)
    } catch (error) {
        // Error if hamster is not found in db
        res.status(404).json({ error: "Hamster is not found in database, please try again" })
    }
}

module.exports = {
    createHamster,
    getHamsters,
    getOneHamster,
    deleteHamster,
    updateHamster,
    getRandomHamster
}

