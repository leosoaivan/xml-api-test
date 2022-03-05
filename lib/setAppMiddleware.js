const handlebars = require('express-handlebars')

module.exports = (app) => {
  app.engine('handlebars', handlebars.engine())
  app.set('view engine', 'handlebars')
  app.set('views', './views')
}
