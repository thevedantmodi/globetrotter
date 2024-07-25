import React, { useState, useCallback, useEffect } from 'react'

import DeckGL, { _GlobeView as GlobeView, FlyToInterpolator } from 'deck.gl'

import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers'
import { MapViewState } from '@deck.gl/core'
import type { PickingInfo } from '@deck.gl/core'
import { Feature, Geometry } from 'geojson'

import axios from 'axios'
import flightsData from '../test-flights.json'

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

type Airport = {
  icao: string
  iata: string
  name: string
  city: string
  subd: string
  country: string
  elevation: number
  lat: number
  lon: number
  tz: string
  lid: string
}

function DeckGLMap () {
  // const [viewState, setViewState] = useState<MapViewState>({
  //   latitude: 30,
  //   longitude: 0,
  //   zoom: 1.5,
  //   pitch: 0,
  //   bearing: 0
  // })

  const [airports, setAirports] = useState([])

  useEffect(() => {
    const getAirports = async () => {
      try {
        const result = await axios.get('/airports')
        setAirports(result.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAirports()
  }, [])

  const [viewState, setViewState] = useState<MapViewState>({
    latitude: -27.470125,
    longitude: 153.021072,
    zoom: 14,
    minZoom: 1,
    bearing: 0,
    pitch: 0
  })

  const airportsLayer = new ScatterplotLayer<Airport>({
    id: 'airports',
    data: airports,

    getPosition: (d: Airport) => [d.lon, d.lat],
    getRadius: 1000,
    getFillColor: [255, 140, 0],
    getLineColor: [0, 0, 0],
    getLineWidth: 1000,
    radiusScale: 6,
    radiusMinPixels: 1,
    stroked: true,
    pickable: true
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
        layers={[airportsLayer /* flights */]}
        getTooltip={({ object }) =>
          object &&
          `${object.iata}
        `
        }
        // getTooltip={({object}: PickingInfo<Feature<Geometry, PropertiesType>>) => object && object.properties.name}
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
