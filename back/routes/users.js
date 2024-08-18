const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')


/* Login */

router.post('/login', async (request, response) => {
  try {
    /* find user */
    const user = await User.findOne({ username: request.body.username })
    !user && response.status(400).json('Wrong username or password!')
    /* validate pwd */

    const valid_pwd = await bcrypt.compare(request.body.password, user.password)
    !valid_pwd && response.status(400).json('Wrong username or password!')

    /* send response */
    response.status(200).json({ _id: user._id, username: user.username })
  } catch (err) {
    response.status(500).json(err)
  }
})

module.exports = router
