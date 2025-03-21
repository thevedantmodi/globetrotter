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

function cosineDistanceBetweenPoints (lat1, lon1, lat2, lon2) {
  const R = 6371e3
  const p1 = (lat1 * Math.PI) / 180
  const p2 = (lat2 * Math.PI) / 180
  const deltaP = p2 - p1
  const deltaLon = lon2 - lon1
  const deltaLambda = (deltaLon * Math.PI) / 180
  const a =
    Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
    Math.cos(p1) *
      Math.cos(p2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2)
  const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R
  return d
}

function haversine (lat1, lon1, lat2, lon2) {
  // distance between latitudes
  // and longitudes
  let dLat = ((lat2 - lat1) * Math.PI) / 180.0
  let dLon = ((lon2 - lon1) * Math.PI) / 180.0

  // convert to radiansa
  lat1 = (lat1 * Math.PI) / 180.0
  lat2 = (lat2 * Math.PI) / 180.0

  // apply formulae
  let a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2)
  let rad = 6371
  let c = 2 * Math.asin(Math.sqrt(a))
  return rad * c
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

    const flight_result = await pool.query({
      name: 'add-flight',
      text:
        'INSERT INTO flights (carrier, fl_no, dep_port,' +
        ' dep_date, arr_port, arr_date, price, ' +
        ' passenger_id)' +
        ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8)' +
        ' RETURNING id',
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
    const flight_id = flight_result.rows[0].id

    await pool.query({
      name: 'calculate-duration',
      text:
        'UPDATE flights ' +
        'SET duration = arr_date - dep_date ' +
        'WHERE duration IS NULL;'
    })

    const [dep_lat, dep_lon] = [dep_port.lat, dep_port.lon]
    const [arr_lat, arr_lon] = [arr_port.lat, arr_port.lon]

    const distance = haversine(
      dep_lat,
      dep_lon,
      arr_lat,
      arr_lon
    )

    await pool.query({
      name: 'calculate-distance',
      text: 'UPDATE flights ' + 'SET distance = $2 ' + 'WHERE id = $1;',
      values: [flight_id, distance]
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
    const user_id = find_user_id?.rows[0]?.id

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

        const a = {
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
        return a
      })
    )

    res.status(200).json({
      flights: new_flights
    })
  } catch (err) {
    console.log('ERROR in /flights/get')
    console.log(err)
    res.status(500)
  }
})

module.exports = router
