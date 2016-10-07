'use strict'

const { Router } = require('express')
const router = Router()
const gameCtrl = require('../controllers/game')

router.get('/game/:id', gameCtrl.join)

module.exports = router