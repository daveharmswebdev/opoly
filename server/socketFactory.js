'use strict'

const socketio = require('socket.io')
const express = require('express')
const app = express()
const { Server } = require('http')
const server = Server(app)
const io = socketio(server)

module.exports = { app, server, io }