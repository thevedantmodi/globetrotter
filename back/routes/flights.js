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

    const id = find_user_id.rows[0].id
    response.status(200).json({
        id: id
    })
    
    
  } catch (err) {
    console.log(err);
  }
})

module.exports = router
