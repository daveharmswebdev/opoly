'use strict'

const {io} = require('./socketFactory')
const Game = require('../models/game')
// const { report } = require('./dashBoardReport')

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
      io.to(roomId).emit('reportDiceRollResult', rollString)
      Game
        .findByIdAndUpdate(roomId, { lastRoll: rollString }, { new: true })
        .then(() => {
          Game
            .find()
            .then(sendReport())
            .catch(console.error)
        })
        .catch(console.error)
      console.log('roll', roll)
    })

    function getReport(id, cb) {
      Game
        .findById(id)
        .then( g => cb(g))
    }

    function sendReport() {
      const keys = Object.keys(socket.adapter.rooms)
      let ids = keys
        .filter(key => key.slice(0,2) != '/#')
        .filter(key => key != 'DASHBOARD')
        .map( id => {
          return new Promise((resolve) => {
            getReport(id, resolve)
          })
        })

      Promise.all(ids).then( ids => io.emit('dashBoardReport', ids))
      io.emit('dashBoardReport', 'hello brother')
    }

    socket.on('dashboardInit', () => {
      sendReport()
    })
  })  
}
