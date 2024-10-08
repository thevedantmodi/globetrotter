const express = require('express')
const pool = require('./db')
const { configDotenv } = require('dotenv')
const port = 3000

const airportsRoute = require('./routes/airports')
const signUpRoute = require('./routes/users')
const profileRoute = require('./routes/profiles')
const flightsRoute = require('./routes/flights')
const carriersRoute = require('./routes/carriers')

const app = express()
app.use(express.json()) /* allows for application/json requests */

app.use('/airports', airportsRoute)
app.use('/users', signUpRoute)
app.use('/profiles', profileRoute)
app.use('/flights', flightsRoute)
app.use('/carriers/', carriersRoute)

app.listen(port, () => {
  console.log("Bello!")
  console.log('Port has started on', port)
})
