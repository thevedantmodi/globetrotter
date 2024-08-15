const { Pool } = require('pg')
const pool = new Pool({
  host: 'db',
  port: 5432,
  user: 'admin',
  password: process.env.POSTGRES_PWD,
  database: 'closed-flights'
})

module.exports = pool