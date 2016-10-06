'use strict'

const { Router } = require('express')
const router = Router()
const Game = require('../models/game')

// controllers
const gameCtrl = require('../controllers/game')

router.get('/', (req,res) => {
	Game
		.find()
		.then( games => res.render('index', {games}))
		.catch(console.error)
})

router.get('/create', gameCtrl.join)

router.get('/game/:id', (req,res) => {
	res.render('game')
})

module.exports = router