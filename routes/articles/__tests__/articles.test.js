const express = require('express')
const handlebars = require('express-handlebars')
const request = require('supertest')
const articles = require('../articles')

const app = new express();
app.use('/articles', articles)
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

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
