import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Circle, AirplaneTakeoff } from '@phosphor-icons/react'
import axios from 'axios'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
import DeckGL from '@deck.gl/react'
import { MapViewState, FlyToInterpolator } from '@deck.gl/core'
import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css'

TimeAgo.addDefaultLocale(en)

function App () {
  const current_user = 'vedantmodi'

  //   const [viewState, setViewState] = useState({
  //     latitude: -27.470125,
  //     longitude: 153.021072,
  //     zoom: 14
  //   })

  const [viewState, setViewState] = useState({
    latitude: 30,
    longitude: 0,
    zoom: 1.5
  })

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

  const onMarkerClick = (id, lat, long) => {
    setCurrentPlace(id)
    setViewState({
      ...viewState,
      latitude: lat,
      longitude: long,
      transitionDuration: 1000
    })
  }

  const onMapClick = e => {
    const [lat, long] = [e.lngLat.lat, e.lngLat.lng]
    setNewPlace({ lat, long })
  }

  const [newPlace, setNewPlace] = useState(null)

  return (
    <div className='App'>
      <ReactMapGL
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onDblClick={onMapClick}
        projection='globe'
      >
        {pins.map(p => (
          <div>
            <Marker
              longitude={p.lon}
              latitude={p.lat}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <Circle
                weight='fill'
                style={{
                  fontSize: viewState.zoom * 2.2,
                  color: p.username === current_user ? 'red' : 'black',
                  cursor: 'pointer'
                }}
                onClick={() => onMarkerClick(p._id, p.lat, p.lon)}
              />
            </Marker>
            {/* If the current place is desired, show the popup */}
            {p._id === current_place && (
              <Popup
                longitude={p.lon}
                latitude={p.lat}
                closeButton={true}
                closeOnClick={false}
                anchor='right'
                onClose={() =>
                  setCurrentPlace(null)
                } /* Clear after we're done */
              >
                <div className='info-card'>
                  <h2>
                    {p.title} <AirplaneTakeoff size={32} />
                  </h2>
                  <p>
                    Post was made <ReactTimeAgo date={p.createdAt} />
                  </p>
                </div>
              </Popup>
            )}

            {newPlace && (
              <Popup
                longitude={newPlace.long}
                latitude={newPlace.lat}
                closeButton={true}
                closeOnClick={false}
                anchor='right'
                onClose={() => setNewPlace(null)} /* Clear after we're done */
              />
            )}
          </div>
        ))}
      </ReactMapGL>
    </div>
  )
}

export default App
