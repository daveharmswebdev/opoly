'use strict'

const {io} = require('./socketFactory')
const Game = require('../models/game')




module.exports.init = () => {
  io.on('connect', socket => {
    const id = socket.handshake.headers.referer.split('/').slice(-1)[0]

    Game
    .findById(id)
    .then( g => {
      socket.join(g._id)
      socket.gameId = g._id
      io.to(g._id).emit('player joined', g)
    })

    socket.on('diceRollResult', ({roll, roomId}) => {
      console.log('roll', roll)
      io.to(roomId).emit('reportDiceRollResult', roll)
    })
  })  
}
