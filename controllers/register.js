'use strict'

module.exports.new = (req, res) => {
	res.render('registration')
}

module.exports.create = ({body: {email, password, confirmation}}, res) => {
	console.log('email', email)
	console.log('password', password)
	console.log('confirmation', confirmation)
	res.send('register new user')
}