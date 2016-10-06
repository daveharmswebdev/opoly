'use strict'

const { Router } = require('express')
const router = Router()

const Game = require('../models/game')

router.get('/', (req,res) => {
	res.render('index')
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