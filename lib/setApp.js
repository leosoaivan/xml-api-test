const express = require('express')
const setAppMiddleware = require('./setAppMiddleware')
const setAppRoutes = require('./setAppRoutes')

module.exports = () => {
  const app = new express();

  setAppMiddleware(app)
  setAppRoutes(app)

  return app
}
