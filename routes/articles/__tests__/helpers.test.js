const helpers = require('../helpers')

describe('Articles helpers', () => {
  describe('fetchAndParseXML', () => {
    /**
     * TODO:
     * - Test that a mocked fetch is made with specific articles-related params
     * - Test that the results of a call to mocked parser gets returned
     */
  })
  describe('transformResults', () => {
    test('Returns an array of entries from the parsed XML object feed key', () => {
      const entry = [{name: 'obj1'}, {name: 'obj2'}]
      const input = {
        feed: { entry }
      }
      const results = helpers.transformResults(input)
      expect(results).toEqual(expect.arrayContaining(entry))
    })
    test('Returns an empty array for null inputs', () => {
      const results = helpers.transformResults(undefined)
      expect(results).toEqual([])
    })
  })
})
