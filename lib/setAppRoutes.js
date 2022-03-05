const articles = require('../routes/articles/articles')

module.exports = (app) => {
  app.use('/articles', articles)
}
