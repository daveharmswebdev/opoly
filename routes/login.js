'use strict'

const { Router } = require('express')
const router = Router()
const passport = require('passport')

router.get('/login', (req, res) => res.render('login'))

router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                       failureRedirect: '/login' }))

module.exports = router