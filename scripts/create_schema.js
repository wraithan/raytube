#!/usr/bin/env node
var pg = require('pg')
var connString = 'postgres://wraithan@localhost/'

function create_schema(database) {
  pg.connect(connString + database, function(err, client, done) {
    if (err) {
      done(client)
      return console.error('Error while connecting to pg: ', err)
    }
    var events = 'CREATE TABLE events ('
    events += 'id serial PRIMARY KEY, '
    events += 'name text NOT NULL, '
    events += 'data json NOT NULL'
    events += ');'
    client.query(events, function (err, result) {
      if (err) {
        done(client)
        return console.error('Error while creating events table: ', err)
      }
      done()
    })
  })
}

if (require.main === module) {
  if (process.argv.length < 3) {
    console.log('Usage: ./create_schema.js <database>')
    return
  }
  create_schema(process.argv[2])
}