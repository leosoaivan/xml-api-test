const express = require('express')
const { fetchAndParseXML, transformResults } = require('./helpers')

const router = express.Router()

const indexHandler = async (req, res) => {
  const results = await fetchAndParseXML()
  const entries = transformResults(results)

  res.render('articles/index', { entries })
}

router.get('/', indexHandler)

module.exports = router
