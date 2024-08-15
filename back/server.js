const express = require('express')
const pool = require('./db')
const { configDotenv } = require('dotenv')
const port = 8800

const app = express()
app.use(express.json()) /* allows for application/json requests */

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

app.get('/setup', async (request, response) => {
  try {
    await pool.query(
      'CREATE TABLE schools ( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100)'
    )
    response.status(200).send({ message: 'Successfully created table' })
  } catch (err) {
    console.log(err)
    response.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log('Port has started on', port)
})
