'use strict'

const Game = require('../models/game')
const { app } = require('../server/socketFactory')

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
	console.log('req.params.id ======= ', req.params.id)
	app.locals.game = req.params.id
	console.log('app.locals ========== ', app.locals)
	res.render('game')
}