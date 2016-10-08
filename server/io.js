'use strict'

const {io} = require('./socketFactory')
const Game = require('../models/game')
const { report } = require('./dashBoardReport')

module.exports.init = () => {
  io.on('connect', socket => {
    const id = socket.handshake.headers.referer.split('/').slice(-1)[0]

    if (id.length > 0) {
      Game
      .findById(id)
      .then( g => {
        socket.join(g._id)
        socket.gameId = g._id
        io.to(g._id).emit('player joined', g)
      })
      .then(() => {
        io.to('DASHBOARD').emit('dashBoardReport', 'report')
      })
    }

    socket.on('diceRollResult', ({roll, roomId}) => {
      const rollString = roll.toString()
      Game
        .findByIdAndUpdate(roomId, { lastRoll: rollString }, { new: true })
        .then(() => {
          Game
            .find()
            .then( games => io.to('DASHBOARD').emit('dashBoardUpdate', games))
            .catch(console.error)
        })
        .catch(console.error)
      console.log('roll', roll)
    })

    socket.on('dashboardInit', () => {
      let board = {}
      const keys = Object.keys(socket.adapter.rooms)
      const rooms = keys
        .filter(key => key.slice(0,2) != '/#')
        .filter(key => key != 'DASHBOARD')
      console.log('test', rooms)
      rooms.forEach( room => console.log('test*****', report(room)))
      board.rooms = rooms
      socket.join('DASHBOARD')
      io.to('DASHBOARD').emit('dashBoardReport', board)
    })
  })  
}
