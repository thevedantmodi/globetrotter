const router = require('express').Router()
const pool = require('../db')
const dotenv = require('dotenv')
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3')

dotenv.config()
const AWS_client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_PRIV_KEY
  }
})

router.post('/set', async (request, response) => {
  const username = request.body.username
  const first_name = request.body.first_name
  const last_name = request.body.last_name
  const hometown = request.body.hometown

  const query = {
    name: 'create-profile',
    text:
      'UPDATE users ' +
      'SET first_name = $1, ' +
      'last_name = $2, ' +
      'hometown = $3 ' +
      'WHERE username = $4 ' +
      'RETURNING *',
    values: [first_name, last_name, hometown, username]
  }

  try {
    const update_user = await pool.query(query)

    response.status(200).json({
      message: 'Profile updated!'
    })
  } catch (err) {
    console.log(err)
    response.status(500).json({
      /* leave nothing so fatal error */
    })
  }
})

module.exports = router
