const express = require('express')
const setAppMiddleware = require('./lib/setAppMiddleware')
// const handlebars = require('express-handlebars')
// const app = require('./app')
const app = express();
const PORT = 3000;

setAppMiddleware(app);

// Middleware
// app.engine('handlebars', handlebars.engine())
// app.set('view engine', 'handlebars')
// app.set('views', './views')

// Routes
app.get('/', (req, res) => {
  res.render('index')
})

app.use('/articles', require('./routes/articles/articles'))

app.get('/authors', (req, res) => {
  res.render('authors/index')
})

// Listen
app.listen(PORT, () => {
  console.log(`Example add listening on port ${PORT}`)
})
