const pool = require('../db')
const router = require('express').Router()

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

    const find_carrier_id = await pool.query({
      name: 'find-carrier-id',
      text: 'SELECT iata, airline FROM carriers' + ' WHERE iata = $1',
      values: [carrier]
    })

    const dep_port = (await pool.query({
      name: 'find-dep-port',
      text: 'SELECT * FROM airports WHERE iata = $1',
      values: [departure.port]
    })).rows[0]

    const arr_port = (await pool.query({
      name: 'find-arr-port',
      text: 'SELECT * FROM airports WHERE iata = $1',
      values: [arrival.port]
    })).rows[0]

    
    const dep_tz = dep_port.tz
    const arr_tz = arr_port.tz

    const carrier_ids  = find_carrier_id.rows

    const dep_time = null

    response.status(200).json({
      user_id: user_id,
      carrier_ids: carrier_ids,
      dep_port: dep_port,
      arr_port: arr_port
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
