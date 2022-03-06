const express = require('express')
const { indexHandler } = require('./helpers')

const router = express.Router()

router.get('/', indexHandler)

module.exports = router
