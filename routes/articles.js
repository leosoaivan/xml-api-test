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

const fetchAndParseXML = async () => {
  const response = await fetch(`${API_ENDPOINT}/query?${params}`)

  if (response.ok) {
    const data = await response.text()
    return parser.parseStringPromise(data)
  }

  throw new Error('Could not fetch or parse XML')
}

const transformResults = (results) => {
  const { entry: entries } = results?.feed || { entries: [] }

  return entries
}

const rootHandler = async (req, res) => {
  const results = await fetchAndParseXML()
  const entries = transformResults(results)

  res.render('articles/index', { entries })
}

router.get('/', rootHandler)

module.exports = {
  router,
  fetchAndParseXML,
  transformResults,
}
