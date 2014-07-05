var http = require('http')
var url = require('url')
var status_log = require('status-log')
var safe_match = require('safe-routes-match')
var router = require('./lib/router')

http.createServer(function (req, res) {
  var path = url.parse(req.url).pathname
  var match = router.match(path)
  status_log(req, res)
  safe_match(req, res, match)
}).listen(5000, function () {
  console.log('listening on port 5000')
})
