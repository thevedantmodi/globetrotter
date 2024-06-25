import React from 'react'
// import { useState } from 'react';
import Map, { Marker } from 'react-map-gl'

function App () {
  // const [viewport, setViewport] = useState({
  //   width: 400,
  //   height: 400,
  //   latitude: 37.7577,
  //   longitude: -122.4376,
  //   zoom: 8
  // })
  return (
    <div className='App'>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={{
          longitude: 153.021072,
          latitude: -27.470125,
          zoom: 14
        }}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <Marker longitude={0} latitude={0} anchor='bottom'>
          <div>This is the center</div>
        </Marker>
      </Map>
    </div>
  )
}

export default App
