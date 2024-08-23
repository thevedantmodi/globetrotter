const router = require('express').Router()
const pool = require('../db')

router.post('/options', async (request, response) => {
  try {
    const query_string = `%${request.body.query}%`

    const command = {
      name: 'get-carriers',
      text:
        'SELECT iata, airline FROM carriers ' +
        // 'ORDER BY size DESC ' +
        'WHERE (iata LIKE $1 or airline LIKE $1) ',
      values: [query_string]
    }
    const data = await pool.query(command)
    const carriers = data.rows

    const options = carriers.map(carrier => {
      return {
        id: carrier.iata,
        label: `${carrier.airline} (${carrier.iata})`
      }
    })

    response.status(200).json(options)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
