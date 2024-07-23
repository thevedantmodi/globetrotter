import React, { useState, useCallback } from 'react'

import DeckGL, { _GlobeView as GlobeView, FlyToInterpolator } from 'deck.gl'
import GoogleMapsOverlay from 'deck.gl'

import { ArcLayer } from '@deck.gl/layers'
import { MapViewState } from '@deck.gl/core'

import parks from './NationalParks'
import flightsData from '../test-flights.json'
// import Map from './Map'
import ReactMapGL from 'react-map-gl'
import { ProjectionSpecification } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const globe_mapbox: ProjectionSpecification = {
  name: 'globe'
}

const globe_view = new GlobeView({ id: 'globe', controller: true })

type Flight = {
  no?: number
  date?: string
  from: {
    name: string
    coordinates: [longitude: number, latitude: number]
  }
  to: {
    name: string
    coordinates: [longitude: number, latitude: number]
  }
}

function DeckGLMap () {
  // const [viewState, setViewState] = useState<MapViewState>({
  //   latitude: 30,
  //   longitude: 0,
  //   zoom: 1.5,
  //   pitch: 0,
  //   bearing: 0
  // })

  const [viewState, setViewState] = useState<MapViewState>({
    latitude: -27.470125,
    longitude: 153.021072,
    zoom: 14,
    minZoom: 1,
    bearing: 0,
    pitch: 0
  })
  const flights = new ArcLayer<Flight>({
    id: 'flights',
    data: flightsData,

    getSourcePosition: (d: Flight) => d.from.coordinates,
    getTargetPosition: (d: Flight) => d.to.coordinates,
    getSourceColor: [0, 0, 0],
    getTargetColor: [0, 0, 0],
    getWidth: 2,
    pickable: true,
    getHeight: 0,
    greatCircle: true,
    numSegments: 500
  })

  return (
    <div id='deckgl-map'>
      <DeckGL
        initialViewState={viewState}
        controller={true}
        layers={[flights]}
        // views={globe_view}
      >
        <ReactMapGL
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          mapStyle={'mapbox://styles/mapbox/streets-v9'}
        //   projection={globe_mapbox}
        />
      </DeckGL>
    </div>
  )
}

export default DeckGLMap
