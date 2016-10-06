'use strict'

const Game = require('../models/game')

module.exports.create = (req, res, err) => {
	Game
		.create({})
		.then( game => {
			console.log('game', game)
			res.redirect(`/game/${game._id}`)
		})
		.catch(err)
}

module.exports.join = (req, res) => {
	res.render('game')
}