const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv') /* Maybe not needed */

const userRoute = require('./routes/users.js')
const pinRoute = require('./routes/pins.js')
const airportsRoute = require('./routes/airports.js')
const signInRoute = require('./routes/signin.js')

const app = express()

dotenv.config() /* Maybe not needed */

app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Successful connection! to MongoDB')
  })
  .catch(err => console.log(err))

app.use('/api/users', userRoute)
app.use('/api/pins', pinRoute)
app.use('/api/airports', airportsRoute)
app.use('/api/sign-in', signInRoute)

app.listen(8800, () => {
  console.log('So the backend begins Here we go!')
})
