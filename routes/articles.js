const express = require('express')
const fetch = require('node-fetch')
const xml2js = require('xml2js')

const router = express.Router()
const parser = new xml2js.Parser();

const API_ENDPOINT = 'http://export.arxiv.org/api';
const KEYWORDS = [
  'data science',
  'machine learning',
  'psychiatry',
  'therapy',
]
const paramsObj = {
  search_query: KEYWORDS.join('OR'),
  sortBy: 'lastUpdatedDate',
  sortOrder: 'descending',
}
const params = new URLSearchParams(paramsObj)

const transformResults = (results) => {
  const { entry: entries } = results?.feed || { entries: [] }

  return entries
}

const rootHandler = async (req, res) => {
  const response = await fetch(`${API_ENDPOINT}/query?${params}`)

  if (response.ok) {
    const data = await response.text()
    const results = await parser.parseStringPromise(data)
    const entries = transformResults(results)

    console.log(entries)

    res.render('articles/index', { entries })
  } else {
    res.send('Something broke')
  }
}

router.get('/', rootHandler)

module.exports = router
