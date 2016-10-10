'use strict'

const socket = io()
const board = document.getElementById('board')

socket.emit('dashboardInit', 'hello')

socket.on('dashBoardReport', report => {
	console.log('report', report)
})
socket.on('dashBoardUpdate', update => {
	console.log('update', update)
})