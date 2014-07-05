module.exports = {
  safe_match: function safe_match (req, res, match) {
    if (match) {
      match.fn(req, res, match)
    } else {
      res.writeHead(404)
      res.end()
    }
  }
}
