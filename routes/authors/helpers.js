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

    const results = entry.reduce((acc, article) => {
      // Loop through the author array and add each author name form the object to the results object, with a count of +=1 for articles written
      article.author.forEach((auth) => {
        // If the author is not the object, add them. Else, add 1 to articlesCount
        const name = auth.name[0]
        if (!acc[name]) {
          acc[name] = {
            name,
            articlesCount: 1
          }
        } else {
          acc[name]['articlesCount'] += 1
        }

        // Add the most recent updated date
        if (!acc[name]['updated']) {
          acc[name]['updated'] = article.updated[0]
        } else {
          // Compare the two dates
          acc[name]['updated'] = new Date(article.updated[0]) < new Date(acc[name]['updated']) ? article.updated[0] : acc[name]['updated']
        }
      })

      return acc
    }, {})

    return Object.values(results).sort((a, b) => new Date(a.articlesCount) < new Date(b.articlesCount))
  }
}
