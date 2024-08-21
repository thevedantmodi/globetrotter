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

    const carrier_ids  = find_carrier_id.rows

    response.status(200).json({
      user_id: user_id,
      carrier_ids: carrier_ids
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
