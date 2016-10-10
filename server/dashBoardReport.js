'use strict'

const Game = require('../models/game')

const report = function(id) {
	return new Promise((resolve, reject) => {
		Game
			.findById(id)
			.then( g => resolve(g))
			.catch(err => reject(err))
	})
}

module.exports = { report }