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
			res.redirect(`/game/${game._id}`)
		})
		.catch(console.error)
})

router.get('/game/:id', (req,res) => {
	res.render('game')
})

module.exports = router