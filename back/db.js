const { Pool } = require('pg')
const pool = new Pool({
  host: 'db',
  port: 5432,
  user: 'admin',
  password: '7CdNsT3pTbFd45r',
  database: 'globetrotter'
})

module.exports = pool
