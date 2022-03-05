const articles = require('../routes/articles')

module.exports = (app) => {
  app.use('/articles', articles)
}
