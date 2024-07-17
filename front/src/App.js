import React from 'react'
import { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { MapPin, AirplaneTakeoff } from '@phosphor-icons/react'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css'

function App () {
  const [viewState, setViewState] = useState({
    latitude: -27.470125,
    longitude: 153.021072,
    zoom: 4
  })

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
      <ReactMapGL
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      >
        {pins.map(p => (
          <div>
            <Marker
              longitude={p.long}
              latitude={p.lat}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <MapPin
                weight='fill'
                style={{ fontSize: viewState.zoom * 10, color: 'black' }}
              />
            </Marker>
            <Popup
              longitude={p.long}
              latitude={p.lat}
              closeButton={true}
              closeOnClick={false}
              anchor='right'
            >
              <div className='info-card'>
                <h2>
                  Brisbane, AU <AirplaneTakeoff size={32} />
                </h2>
              </div>
            </Popup>
          </div>
        ))}
      </ReactMapGL>
    </div>
  )
}

export default App
