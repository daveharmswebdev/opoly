'use strict'

const express = require('express')
const { Server } = require('http')
const socketio = require('socket.io')
const mongoose = require('mongoose')

const app = express()
const server = Server(app)
const io = socketio(server)

const routes = require('../routes')

// constants
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/opoly'

// middleware
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

	socket.on('diceRollResult', result => {
		console.log('result', result)
		io.emit('reportDiceRollResult',result)
	})
})