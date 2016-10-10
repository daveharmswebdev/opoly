'use strict'

const mongoose = require('mongoose')

// a game turn has occurred when all players have exhausted
// all actions, including moves forward and backward or move forfeit
// whoseTurn represents the current active player in the gameTurn

module.exports = mongoose.model('Game', {
	players: [],
	whoseTurn: String,
	turnCounter: { type: Number, default: 0 },
	finished: { type: Boolean, default: false },
	winner: { type: String, default: 'none' },
	lastRoll: String
})