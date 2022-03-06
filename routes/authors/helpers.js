const fetch = require('node-fetch')
const xml2js = require('xml2js')

const parser = new xml2js.Parser();
const API_ENDPOINT = 'http://export.arxiv.org/api';
const KEYWORDS = [
  'all:ginger',
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

  transformResults: (parsedXML) => {
    const { entry } = parsedXML?.feed || { entry: [] }

    /**
     * Create an object for each author that holds information about their latest article updates
     * and the number of articles they've written within the response requested from arXiv, which
     * is an indeterminate time as of now.
     */
    const results = entry.reduce((acc, article) => {
      // An article can have multiple authors
      article.author.forEach((auth) => {
        const name = auth.name[0]

        // Add new authors to the accumulator object, or add +1 to their articlesCount
        if (!acc[name]) {
          acc[name] = {
            name,
            articlesCount: 1
          }
        } else {
          acc[name]['articlesCount'] += 1
        }

        // Add new instances of the updated date, or compare the ISO 8601 date strings, and use the latest one
        if (!acc[name]['updated']) {
          acc[name]['updated'] = article.updated[0]
        } else {
          acc[name]['updated'] = new Date(article.updated[0]) < new Date(acc[name]['updated']) ? article.updated[0] : acc[name]['updated']
        }
      })

      return acc
    }, {})

    return Object.values(results).sort((a, b) => new Date(a.articlesCount) < new Date(b.articlesCount))
  }
}
