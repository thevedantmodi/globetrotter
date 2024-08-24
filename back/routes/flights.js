const { response } = require('express')
const pool = require('../db')
const router = require('express').Router()

const splitISODateTime = input => {
  return [input.slice(0, 10), input.slice(11, 23)]
}

const prepareTimeStamp = (input, timezone) => {
  const [date, time] = splitISODateTime(input)

  return `${date} ${time} ${timezone}`
}

router.post('/add', async (request, response) => {
  const username = request.body.username
  const arrival = request.body.arrival
  const departure = request.body.departure
  const carrier = request.body.carrier
  const number = request.body.number
  const price = request.body.price

  try {
    const find_user_id = await pool.query({
      name: 'find-user-id',
      text: 'SELECT id from users where username = $1',
      values: [username]
    })
    const user_id = find_user_id.rows[0].id

    await pool.query({
      name: 'find-carrier-id',
      text: 'SELECT iata, airline FROM carriers' + ' WHERE iata = $1',
      values: [carrier]
    })

    const dep_port = (
      await pool.query({
        name: 'find-dep-port',
        text: 'SELECT * FROM airports WHERE iata = $1',
        values: [departure.port]
      })
    ).rows[0]

    const arr_port = (
      await pool.query({
        name: 'find-arr-port',
        text: 'SELECT * FROM airports WHERE iata = $1',
        values: [arrival.port]
      })
    ).rows[0]

    const dep_dt_tz = prepareTimeStamp(departure.date, dep_port.tz)
    const arr_dt_tz = prepareTimeStamp(arrival.date, arr_port.tz)

    await pool.query({
      name: 'add-flight',
      text:
        'INSERT INTO flights (carrier, fl_no, dep_port,' +
        ' dep_date, arr_port, arr_date, price, ' +
        ' passenger_id)' +
        ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [
        carrier,
        number,
        dep_port.iata,
        dep_dt_tz,
        arr_port.iata,
        arr_dt_tz,
        price,
        /* Must calculate duration after insertion */
        user_id
      ]
    })

    await pool.query({
      name: 'calculate-duration',
      text:
        'UPDATE flights ' +
        'SET duration = arr_date - dep_date ' +
        'WHERE duration IS NULL;'
    })

    response.status(200).json({
      message: 'Successfully added flight!'
    })
  } catch (err) {
    console.log(err)
  }
})

router.post('/get', async (req, res) => {
  const username = req.body.username

  try {
    const find_user_id = await pool.query({
      name: 'find-user-id',
      text: 'SELECT id from users where username = $1',
      values: [username]
    })
    const user_id = find_user_id.rows[0].id

    const flights = (
      await pool.query({
        name: 'get-user-flights',
        text: 'SELECT * from flights WHERE passenger_id = $1',
        values: [user_id]
      })
    ).rows

    const new_flights = await Promise.all(
      flights.map(async flight => {
        const dep = (
          await pool.query({
            name: 'get-dep-port',
            text: 'SELECT * from airports WHERE iata = $1',
            values: [flight.dep_port]
          })
        ).rows[0]

        const arr = (
          await pool.query({
            name: 'get-arr-port',
            text: 'SELECT * from airports WHERE iata = $1',
            values: [flight.arr_port]
          })
        ).rows[0]

        return {
          departure: {
            date: flight.dep_date,
            port: dep
          },
          arrival: {
            date: flight.arr_date,
            port: arr
          },
          carrier: flight.carrier,
          number: flight.number,
          price: flight.price,
          currency: flight.currency,
          duration: {
            ...flight.duration
          }
        }
      })
    )

    res.status(200).json({
      flights: new_flights
    })
  } catch (err) {
    console.log(err)
    res.status(500)
  }
})

module.exports = router
