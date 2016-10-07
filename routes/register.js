'use strict'

const { Router } = require('express')
const router = Router()
const registerCtrl = require('../controllers/register')

router.get('/register', registerCtrl.new)

router.post('/register', registerCtrl.create)

module.exports = router