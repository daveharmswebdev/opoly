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

router.get('/create', gameCtrl.create)

router.get('/game/:id', gameCtrl.join)

module.exports = router