import { useState, useEffect } from 'react'
import axios from 'axios'

const [pins, setPins] = useState([])

useEffect(() => {
  const getPins = async () => {
    try {
      const res = await axios.get('/pins')
      setPins(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  getPins()
}, [])
