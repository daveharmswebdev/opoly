'use strict'

const { app } = require('../server/socketFactory')
const Game = require('../models/game')

module.exports.edit = (req, res) =>
	res.render('logout', { page: 'logout' })

module.exports.destroy = (req, res) => {
	Game
		.findByIdAndUpdate(
			app.locals.game,
			{$pull:{players: app.locals.user}},
			{new:true})
		.then(g => {
			console.log('g after pull', g)
			req.logout()
			res.redirect('/login')
		})
}