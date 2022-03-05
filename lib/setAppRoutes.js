const articles = require('../routes/articles')
const authors = require('../routes/authors')

module.exports = (app) => {
  app.use('/articles', articles)
  app.use('/authors', authors)
}
