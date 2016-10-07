'use strict'

const mongoose = require('mongoose')
const {app, server, io} = require('./socketFactory')
const express = require('express')
const Game = require('../models/game')
const bodyParser = require('body-parser')

// for login
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const routes = require('../routes')

// constants
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/opoly'

// set view enging
app.set('view engine', 'pug')
app.use(express.static('client'))
app.use(bodyParser.urlencoded({ extended:false }))

// middlewares
app.use(session({
	store: new RedisStore({
		url: process.env.REDIS_URL || 'redis://localhost:6379'
	}),
	secret: 'secretsquirrel'
}))

require('./passport-strategies')
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
	// why does this work?
	app.locals.user = req.user && req.user.user
	app.locals.id = req.user && req.user._id
	console.log('the user is', app.locals.user)
	console.log('app.locals.id', app.locals.id)
	next()
})

app.use(routes)

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () => {
	server.listen(PORT, () => {
		console.log(`now listening on ${PORT}`)
	})
})

io.on('connect', socket => {
	const id = socket.handshake.headers.referer.split('/').slice(-1)[0]

	Game
		.findById(id)
		.then( g => {
			socket.join(g._id)
			socket.gameId = g._id
			io.to(g._id).emit('player joined', g)
		})

	socket.on('diceRollResult', result => {
		console.log('result', result)
		io.emit('reportDiceRollResult',result)
	})


})