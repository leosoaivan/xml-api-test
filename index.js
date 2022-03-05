const express = require('express')
const setAppMiddleware = require('./lib/setAppMiddleware')
const setAppRoutes = require('./lib/setAppRoutes')

const app = express()
const PORT = 3000

setAppMiddleware(app)
setAppRoutes(app)

// Routes
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/authors', (req, res) => {
  res.render('authors/index')
})

// Listen
app.listen(PORT, () => {
  console.log(`Example add listening on port ${PORT}`)
})
