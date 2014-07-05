var config = require('../config')
var safe_match = require('safe-routes-match')
var Router = require('routes')
var router = new Router()
var datalayer = require('./datalayer')

module.exports = router

router.addRoute('/data/*', function gate(req, res, match) {
  res.setHeader('Content-Type', 'application/json')
  if (req.headers['auth-token'] === config.auth_token) {
    match = match.next()
    safe_match(req, res, match)
  } else {
    res.writeHead(401)
    res.end(JSON.stringify({error: 'Bad auth token.'}))
  }
})

router.addRoute('/data/:name', function data_dispatch(req, res, match) {
  var data = ''
  req.on('data', function (chunk) {
    data += chunk
  })
  req.on('end', function () {
    datalayer.insert(match.params.name, data, function (err, results) {
      if (err) {
        res.writeHead(500)
        res.end(JSON.stringify(err))
        return
      }
      res.end(JSON.stringify(results.rows[0]))
    })
  })
})