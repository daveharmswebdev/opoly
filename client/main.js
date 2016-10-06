'use strict'

const rollDisplay = document.getElementById('rollDisplay')
const roll = document.getElementById('roll')

const diceRoll = () => Math.floor(Math.random() * 6) + 1

roll.addEventListener('click', () => {
	let roll = [diceRoll(), diceRoll()]
	let rollSum = roll.reduce((a,b) => a+b)
	console.log('roll', roll)
	rollDisplay.innerHTML = `<p>${rollSum}</p>` 
})
