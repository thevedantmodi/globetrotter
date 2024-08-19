const router = require('express').Router()
const pool = require('../db')
const dotenv = require('dotenv')
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3')
const { Client } = require('pg')

dotenv.config()

router.post('/create', async (request, response) => {
  const username = request.body.username
  const first_name = request.body.first_name
  const last_name = request.body.last_name
  const hometown = request.body.hometown
  const dp = request.body.dp
  const AWS_client = new S3Client({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_PRIV_KEY
    }
  })

  const command = new PutObjectCommand({
    Body: 'hello world',
    Bucket: 'closed-flights',
    Key: 'myfile.txt',
  })

  const res = await AWS_client.send(command)

  console.log(res)

  console.log(dp)

  /* TODO: Upload dp to AWS */

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

    // console.log(update_user)
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
