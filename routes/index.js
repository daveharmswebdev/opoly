'use strict'

const { Router } = require('express')
const router = Router()

const Game = require('../models/game')

router.get('/', (req,res) => {
	Game
		.find()
		.then( games => res.render('index', {games}))
		.catch(console.error)
})

router.get('/create', (req,res) => {
	Game
		.create({})
		.then( game => {
			console.log('game', game)
			res.render('game')
		})
		.catch(console.error)
})

module.exports = router