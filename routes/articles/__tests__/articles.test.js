const express = require('express')
const request = require('supertest')
const setAppMiddleware = require('../../../lib/setAppMiddleware')
const articles = require('../articles')

const app = new express();

setAppMiddleware(app)
app.use('/articles', articles)
// app.engine('handlebars', handlebars.engine())
// app.set('view engine', 'handlebars')

describe('Routes - Articles', () => {
  /**
   * TODO:
   * As written, this currently makes an actual fetch request from fetchAndParseXML inside
   * indexHandler. Spying on and mocking fetchAndParseXML doesn't work. This might require a
   * global mock of node-fetch to prevent real requests during tests.
   */
  test('Responds to /articles', async () => {
    const response = await request(app).get('/articles')
    expect(response.statusCode).toBe(200)
  })
})
