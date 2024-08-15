const express = require('express')
const pool = require('./db')
const { configDotenv } = require('dotenv')
const port = 3000

const airportsRoute = require('./routes/airports')

const app = express()
app.use(express.json()) /* allows for application/json requests */

app.use('/airports', airportsRoute)

app.get('/', async (request, response) => {
  const data = await pool.query('SELECT * FROM schools')
  response.status(200).send(data.rows)
})

app.post('/', async (request, response) => {
  console.log(request.body)

  const { name, location } = request.body

  try {
    await pool.query('INSERT INTO schools (name, address) VALUES ($1, $2)', [
      name,
      location
    ])
    response.status(200).send({ message: 'Successfully added child' })
  } catch (err) {
    console.log(err)
    response.sendStatus(500)
  }

  response.status(200).send({
    message: `HI ${name}, WELCOME TO ${location}`
  })
})

app.get('/delete', async (request, response) => {
  try {
    const res = await pool.query('DROP TABLE IF EXISTS public.schools;')
    console.log(res)
    response.sendStatus(200)
  } catch (err) {
    console.log(err)
    response.sendStatus(500)
  }
})

app.get('/show', async (request, response) => {
  try {
    const res = await pool.query('SELECT * FROM pg_catalog.pg_tables;')
    console.log(res)
    response.sendStatus(200)
    return
  } catch (err) {
    console.log(err)
    response.sendStatus(500)
  }
})

app.get('/setup', async (request, response) => {
  try {
    await pool.query(
      'CREATE TABLE airports ( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100) )'
    )
    response.status(200).send({ message: 'Successfully created table' })
  } catch (err) {
    console.log(err)
    response.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log('hello!')
  console.log('Port has started on', port)
})
