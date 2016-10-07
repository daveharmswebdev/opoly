'use strict'

const { Router } = require('express')
const router = Router()


// routes
const register = require('./register')
const login = require('./login')
const create = require('./create')
const game = require('./game')
const home = require('./home')
const logout = require('./logout')

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

// private routes
router.use(logout)
router.use(home)
router.use(game)
router.use(create)

module.exports = router