const { query } = require('express')
const pool = require('../db')
const bcrypt = require('bcryptjs')

const router = require('express').Router()

/* SIGNUP POST:
  Check for duplicate emails
  Create a new user in database
  Hash pwd like we did before (bcrypt)
  Store hashed pwd
*/

/* LOGIN POST: 
  Refactor old procedure for login system
*/

/*   */
router.post('/sign-up', async (request, response) => {
  const username = request.body.username
  const email_addr = request.body.email

  const salt = await bcrypt.genSalt(10)
  const hash_pwd = await bcrypt.hash(request.body.password, salt)

  const hometown = 'Houston, TX'
  const km_flown = 1500

  try {
    const query = {
      name: 'create-user',
      text:
        'INSERT INTO users (username, email, hashed_pwd, hometown, km_flown) ' +
        'VALUES($1, $2, $3, $4, $5)' +
        'RETURNING *',
      values: [username, email_addr, hash_pwd, hometown, km_flown]
    }
    const res = await pool.query(query)
    /* At this point, a new user has been created in the users table */
    
    const user_id = res.rows[0].id
    response.status(200).json({
      message: `Welcome to Strava for Flights! id is ${user_id}.`
    })
  } catch (err) {
    /* Expected errors from PG should be added here */
    switch (err.constraint) {
      case 'users_username_key':
        response.status(500).json({
          errors: {
            username: 'A previous user has already taken this username.'
          }
        })
        break
      case 'users_email_key':
        response.status(500).json({
          errors: {
            email:
              'Email is not available. An existing account is likely registered under this email.'
          }
        })
      default:
        break
    }
  }
})

router.post('/login', async (request, response) => {
  


  const query = {
    name: 'login-user',
    text:
        'INSERT INTO users (username, email, hashed_pwd, hometown, km_flown) ' +
        'VALUES($1, $2, $3, $4, $5)' +
        'RETURNING *',
      values: [username, email_addr, hash_pwd, hometown, km_flown]
  }

  try {
    /* find user */

    const username = await pool.query(query)

    /* validate password */

    /* send response */
  } catch (err) {
    
  }
})

module.exports = router
