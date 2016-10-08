'use strict'

const socket = io()
const board = document.getElementById('board')

socket.emit('dashboardInit', 'hello')

socket.on('dashBoardReport', report => {
	console.log('report', report)
	// report.forEach( item => {
	// 	let node = document.createElement('li')
	// 	let textnode = document.createTextNode(item)
	// 	node.appendChild(textnode)
	// 	board.appendChild(node)		
	// })
})
socket.on('dashBoardUpdate', update => {
	console.log('update', update)
})