import React from 'react'
import { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
// import { MapPin } from '@phosphor-icons/react'

function App () {
  /*   let BLONG = 153.021072
  let BLAT = -27.470125 */

  const [viewState, setViewState] = useState({
    latitude: -27.470125,
    longitude: 153.021072,
    zoom: 4
  })

  return (
    <div className='App'>
      <ReactMapGL
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      >
        <Marker longitude={153.021072} latitude={-27.470125}>
          <h1>This is not centered</h1>
        </Marker>
      </ReactMapGL>
    </div>
  )
}

export default App
