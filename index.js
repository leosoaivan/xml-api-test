const setApp = require('./lib/setApp')

const PORT = 3000
const app = setApp()

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
