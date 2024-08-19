const pool = require('../db')
const bcrypt = require('bcryptjs')
const router = require('express').Router()

router.post('/sign-up', async (request, response) => {
  const username = request.body.username
  const email_addr = request.body.email

  const salt = await bcrypt.genSalt(10)
  const hash_pwd = await bcrypt.hash(request.body.password, salt)

  try {
    const query = {
      name: 'create-user',
      text:
        'INSERT INTO users (username, email, hashed_pwd, hometown, km_flown) ' +
        'VALUES($1, $2, $3, $4, $5)' +
        'RETURNING *',
      values: [username, email_addr, hash_pwd, hometown, 0]
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
  const email_addr = request.body.email
  const username = request.body.username

  /* username and email are both non null, so "" won't be returned */
  const query = {
    name: 'login-user',
    text: 'SELECT * FROM users ' + 'WHERE (email = $1 OR username = $2);',
    values: [email_addr, username]
  }

  try {
    /* find user */
    const find_user = await pool.query(query)

    console.log(find_user)

    /* validate password */
    const hash_pwd = find_user.rows[0].hashed_pwd
    const username = find_user.rows[0].username

    const valid_pwd = await bcrypt.compare(request.body.password, hash_pwd)

    /* send response */

    response.status(200).json({
      message: `Welcome back ${username}!`,
      username: username
    })
  } catch (err) {
    console.log(err)
    response.status(500).json({
      errors: {
        /* Client doesn't get to know what went wrong */
        user_or_email: 'Incorrect username, email, or password',
        password: 'Incorrect username, email, or password'
      }
    })
  }
})

module.exports = router
