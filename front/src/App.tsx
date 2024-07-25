import { useState, useEffect } from 'react'
import axios from 'axios'
/* TimeAgo was here, consider using for something */

import DeckGLMap from './components/DeckGLMap'

import './App.css'

function App () {
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

  return (
    <div className='App'>
      <DeckGLMap />
    </div>
  )
}

export default App
