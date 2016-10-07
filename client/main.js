'use strict'

const rollDisplay = document.getElementById('rollDisplay')
const roll = document.getElementById('roll')
const socket = io()

const rollDie = () => Math.floor(Math.random() * 6) + 1

roll.addEventListener('click', () => {
	const roomId = window.location.pathname.split('/').slice(-1)[0]
	let roll = [rollDie(), rollDie()]
	let rollSum = roll.reduce((a,b) => a+b)
	let doubles = roll[0] === roll[1] ? ' DOOUBLES!' : ''
	rollDisplay.innerHTML = `<p>${roll[0]} and ${roll[1]} = ${rollSum}${doubles}</p>`

	socket.emit('diceRollResult', {roll, roomId})
})

socket.on('reportDiceRollResult', report => console.log('report', report))
socket.on('player joined', msg => console.log('msg', msg))
