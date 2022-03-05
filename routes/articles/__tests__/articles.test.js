const express = require('express')
const handlebars = require('express-handlebars')
const request = require('supertest')
const articles = require('../articles')

const app = new express();
app.use('/articles', articles.router)
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

describe('Routes - Articles', () => {
  beforeEach(() => {
    fetchAndParseXMLMock = jest.spyOn(articles, 'fetchAndParseXML').mockResolvedValue({ feed: {}})
  })
  test('Responds to /articles', async () => {
    const response = await request(app).get('/articles')

    console.log('RESPONSE: ', response)

    expect(response.statusCode).toBe(200)
  })
})
