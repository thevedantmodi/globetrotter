const express = require('express')
const pool = require('./db')
const { configDotenv } = require('dotenv')
const port = 3000

const airportsRoute = require('./routes/airports')
const signUpRoute = require('./routes/sign-up')

const app = express()
app.use(express.json()) /* allows for application/json requests */

app.use('/airports', airportsRoute)
app.use('/sign-up', signUpRoute)

app.listen(port, () => {
  console.log('Port has started on', port)
})
