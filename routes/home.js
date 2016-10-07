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

module.exports = router