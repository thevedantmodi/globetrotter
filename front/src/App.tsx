import React, { useState, useEffect } from 'react'
import { Marker, Popup } from 'react-map-gl'
import { Circle, AirplaneTakeoff } from '@phosphor-icons/react'
import axios from 'axios'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
import { DeckGL } from '@deck.gl/react'
import { GeoJsonLayer } from 'deck.gl'
import { _GlobeView as GlobeView, MapViewState } from '@deck.gl/core'

import DeckGLMap from './components/DeckGLMap'

import type { Feature, Geometry } from 'geojson'
import { FlyToInterpolator } from '@deck.gl/core'

import './App.css'

function App () {
  // TimeAgo.addDefaultLocale(en)

  //   const [viewState, setViewState] = useState({
  //     latitude: -27.470125,
  //     longitude: 153.021072,
  //     zoom: 14
  //   })
  
  const [current_place, setCurrentPlace] = useState(null)

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

  // const onMarkerClick = (id: number, lat: number, long: number) => {
  //   setCurrentPlace(id)
  //   setViewState({
  //     ...viewState,
  //     latitude: lat,
  //     longitude: long
  //   })
  // }

  // const onMapClick = e => {
  //   const [lat, long] = [e.lngLat.lat, e.lngLat.lng]
  //   setNewPlace({ lat, long })
  // }

  // const [newPlace, setNewPlace] = useState(null)

  return (
    <div className='App'>
      <DeckGLMap />
    </div>
  )
}

export default App
