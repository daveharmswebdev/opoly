'use strict'

const {io, app} = require('./socketFactory')
const Game = require('../models/game')
// const { report } = require('./dashBoardReport')

module.exports.init = () => {
  io.on('connect', socket => {
    const id = socket.handshake.headers.referer.split('/').slice(-1)[0]
    console.log('app.locals from io.js', app.locals)
    if (id.length > 0) {
      Game
      .findById(id)
      // .then(addPlayerTo(id))
      .then( g => {
        if (app.locals.user && g.players.indexOf(app.locals.user) === -1) {
          Game
            .findByIdAndUpdate(
              id,
              {$push: {players:app.locals.user}},
              {new:true})
            .then( g => console.log('g after adding player', g))
        }
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

    function addPlayerTo(id) {

      // console.log('add to player', app.locals.id)
      // Game
      //   .findByIdAndUpdate(id, {$push: {players:app.locals.user}}, {new:true})
      //   .then(g => console.log('g after add to player', g))
    }

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
