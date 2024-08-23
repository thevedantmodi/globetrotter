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

module.exports = router
