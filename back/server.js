const express = require('express')
const pool = require('./db')
const { configDotenv } = require('dotenv')
const port = 3000

const airportsRoute = require('./routes/airports')

const app = express()
app.use(express.json()) /* allows for application/json requests */

app.use('/airports', airportsRoute)

app.listen(port, () => {
  console.log('Port has started on', port)
})
