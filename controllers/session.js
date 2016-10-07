'use strict'

module.exports.edit = (req, res) =>
	res.render('logout', { page: 'logout' })

module.exports.destroy = (req, res) => {
	req.logout()
	res.redirect('/login')
}