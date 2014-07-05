var pg = require('pg')
var connString = 'postgres://wraithan@localhost/raytube'

module.exports = {
  insert: function insert(name, data, callback) {
    pg.connect(connString, function (err, client, done) {
      if (err) {
        callback(err)
        done(client)
        return console.error('Error occured in pg', err)
      }
      client.query('INSERT INTO events(name, data) VALUES($1, $2) RETURNING id',
                   [name, JSON.stringify(data)], function(err, result) {
        if(err) {
          callback(err)
          done(client)
          return
        }
        callback(null, result)
        done()
      })
    })
  }
}