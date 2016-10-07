'use strict'

const { Router } = require('express')
const router = Router()
const Game = require('../models/game')

// routes
const register = require('./register')
const login = require('./login')
const create = require('./create')
const game = require('./game')

// pulbic routes
router.use(register)
router.use(login)

// route guard
router.use((req, res, next) => {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
})

router.get('/', (req,res) => {
	Game
		.find()
		.then( games => res.render('index', {games}))
		.catch(console.error)
})

// private routes
router.use(game)
router.use(create)

module.exports = router