'use strict'

const mongoose = require('mongoose')
const {app, server, io} = require('./socketFactory')
const express = require('express')
const Game = require('../models/game')

const routes = require('../routes')

// constants
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/opoly'

// set view enging
app.set('view engine', 'pug')
app.use(express.static('client'))

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