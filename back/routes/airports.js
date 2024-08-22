/* Add HTTP requests for uploading airports */
const router = require('express').Router()
const pool = require('../db')

/* Get all airports */

router.get('/', async (request, response) => {
  try {
    /* Guaranteed to have no empty IATA */
    const data = await pool.query('SELECT * FROM airports')
    const airports = data.rows

    /* Embed each airport JSON in a GeoJSON */
    const geo_airports = airports.map(airport => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [airport.lon, airport.lat]
        },
        properties: {
          iata: airport.iata,
          lat: airport.lat,
          lon: airport.lon,
          country: airport.country,
          icao: airport.icao,
          city: airport.city,
          subd: airport.subd,
          size: airport.size
        }
      }
    })

    /* Wrap in GeoJSON FeatureCollection */
    const AirportsFeatures = {
      type: 'FeatureCollection',
      features: geo_airports
    }

    response.status(200).json(AirportsFeatures)
  } catch (err) {
    response.status(500).json(err)
  }
})

router.post('/port-options', async (request, response) => {
  try {
    const query_string = `'%${request.body.query}%'`
    const command = {
      name: 'get-airports-ports',
      text:
        'SELECT iata, city FROM airports ' +
        'ORDER BY size DESC LIMIT 20' +
        'WHERE iata LIKE $1',
      values: [query_string]
    }
    const data = await pool.query(command)
    const airports = data.rows

    console.log(airports)

    const options = airports.map(airport => {
      return {
        id: airport.iata,
        label: `${airport.city} (${airport.iata})`
      }
    })

    response.status(200).json(options)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
