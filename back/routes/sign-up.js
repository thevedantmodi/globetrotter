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
router.post('/', async (request, response) => {
  if (request.body.email === 'bad@bad.com') {
    response.status(200).json({
      success: false,
      errors: {
        "email": "Email is not available. An existing account is likely registered under this email."
      },
    })
  } else {
    response.status(200).json({
        success: true
    })
  }
})

module.exports = router