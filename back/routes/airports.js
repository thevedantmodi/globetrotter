/* Add HTTP requests for uploading airports */
const router = require('express').Router()
const Airport = require('../models/Airport')

/* Create an airport */

router.post('/', async (request, response) => {
  const new_airport = new Airport(request.body)
  try {
    const saved_airport = await new_airport.save()
    response.status(200).json(saved_airport)
  } catch (err) {
    response.status(500).json(err)
  }
})

/* Get all airports */

router.get('/', async (request, response) => {
    try {
        const airports = await Airport.find()
        response.status(200).json(airports)
    } catch (err) {
        response.status(500).json(err)
    }
})

module.exports = router
