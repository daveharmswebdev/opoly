'use strict'

const { Router } = require('express')
const router = Router()
const gameCtrl = require('../controllers/game')

router.get('/create', gameCtrl.create)

module.exports = router