const router = require('express').Router()

router.post('/', async (request, response) => {
  if (request.body.email === 'bad@bad.com') {
    response.status(500).json({
      success: false
    })
  } else {
    response.status(200).json({
        success: true
    })
  }
})

module.exports = router