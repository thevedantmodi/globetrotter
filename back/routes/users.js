const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

/* Register */

router.post('/sign-up', async (request, response) => {
  try {
    /* generate new password */
    const salt = await bcrypt.genSalt(10) /* 10 is a large number for this */
    const hash_pwd = await bcrypt.hash(request.body.password, salt)

    /* save user */

    const user = await new_user.save()

    /* send response */

    response.status(200).json(user._id)
  } catch (err) {
    response.status(500).json(err)
  }
})

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
