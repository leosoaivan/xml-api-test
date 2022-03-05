const fetch = require('node-fetch')
const xml2js = require('xml2js')

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

module.exports = {
  fetchAndParseXML: async () => {
    const response = await fetch(`${API_ENDPOINT}/query?${params}`)

    if (response.ok) {
      const data = await response.text()
      return parser.parseStringPromise(data)
    }

    throw new Error('Could not fetch or parse XML')
  },

  transformResults: (results) => {
    const { entry: entries } = results?.feed || { entries: [] }

    return entries
  }
}