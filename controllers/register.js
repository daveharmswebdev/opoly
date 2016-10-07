'use strict'

const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports.new = (req, res) => {
	res.render('registration')
}

module.exports.create = ({body: {email, password, confirmation}}, res) => {
	if ( password === confirmation ) {
		User
			.findOne({user: email})
			.then( user => {
				if (user) {
					console.log('ther is a user')
					res.render('registration', {message: 'email already being used'})
				} else {
					return new Promise((resolve, reject) => {
						bcrypt.hash(password, 15, (err,hash) => {
							if (err) {
								reject(err)
							} else {
								resolve(hash)
							}
						})
					})
				}
			})
			.then(hash => User.create({ user: email, password: hash}))
			.then(() => res.redirect('/login'))
	} else {
		res.render('registration', { message: 'password and confirmation do not match'})
	}
}