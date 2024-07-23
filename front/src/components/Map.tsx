import React, { useState, useEffect } from 'react'

import ReactMapGL from 'react-map-gl'

import { ProjectionSpecification } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const Globe: ProjectionSpecification = {
  name: 'globe'
}

export type MapProps = {
  viewState: {
    longitude: number
    latitude: number
    zoom: number
  }
}

function Map () {
  return (
    <div id='map'>
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle={'mapbox://styles/mapbox/streets-v9'}
      />
    </div>
  )
}

export default Map
