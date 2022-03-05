const express = require('express')
const handlebars = require('express-handlebars')

const app = express();
const PORT = 3000;

// Middleware
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

// Routes
app.get('/', (req, res) => {
  res.render('index')
})
app.get('/articles', (req, res) => {
  res.render('articles/index')
})
app.get('/authors', (req, res) => {
  res.render('authors/index')
})


// Listen
app.listen(PORT, () => {
  console.log(`Example add listening on port ${PORT}`)
})
