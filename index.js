const setApp = require('./lib/setApp')

const PORT = 3000

// Setup app with middleware and routers
const app = setApp()

// Routes
app.get('/', (req, res) => {
  res.render('index')
})

// Listen
app.listen(PORT, () => {
  console.log(`Example add listening on port ${PORT}`)
})
