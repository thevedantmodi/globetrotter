import { useState, useCallback, useEffect } from 'react'

import DeckGL, {
  _GlobeView as GlobeView,
  MapView,
  FlyToInterpolator
} from 'deck.gl'

import { ArcLayer, GeoJsonLayer } from '@deck.gl/layers'
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

const flat_mapbox: ProjectionSpecification = {
  name: 'equirectangular'
}

const globe_view = new GlobeView({
  id: 'globe',
  controller: true,
  nearZMultiplier: 0.1,
  farZMultiplier: 1
})
const map_view = new MapView({
  repeat: true
})


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

function DeckGLMap({ expanded }) {
  // const [viewState, setViewState] = useState<MapViewState>({
  //   latitude: 30,
  //   longitude: 0,
  //   zoom: 1.5,
  //   pitch: 0,
  //   bearing: 0
  // })

  const [airports, setAirports] = useState([])

  const CITIES: { [name: string]: MapViewState } = {
    BRISBANE: {
      latitude: -27.470125,
      longitude: 153.021072,
      zoom: 14,
      minZoom: 1,
      bearing: 0,
      pitch: 0
    },
    NYC: {
      longitude: -74.0,
      latitude: 40.7,
      zoom: 14,
      minZoom: 1,
      bearing: 0,
      pitch: 0
    },
    SINGAPORE: {
      longitude: 103.8198,
      latitude: 1.3521,
      zoom: 14,
      minZoom: 1,
      bearing: 0,
      pitch: 0
    }
  }

  useEffect(() => {
    const getAirports = async () => {
      /* TODO: Add loading capability here */
      try {
        const result = await axios.get('/airports')
        setAirports(result.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAirports()
  }, [])

  const [viewState, setViewState] = useState<MapViewState>(CITIES['BRISBANE'])

  const flyToCity = useCallback(evt => {
    setViewState({
      ...CITIES[evt.target.id],
      transitionInterpolator: new FlyToInterpolator({ speed: 4 }),
      transitionDuration: 'auto'
    })
  }, [])

  const airportsLayer = new GeoJsonLayer<Airport>({
    id: 'airports',
    data: airports,

    stroked: false,
    filled: true,
    pointType: 'circle',
    pickable: true,
    /* TODO: Make this a function based on size of airport */
    getPointRadius: (f: Feature<Geometry, Airport>) => 2000,

    getFillColor: [160, 160, 180, 200],
    getText: (f: Feature<Geometry, Airport>) => f.properties.iata,
    getLineWidth: 20,
    textFontFamily: 'Manrope',
    getTextSize: 12
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
    numSegments: 500,
    wrapLongitude: true
  })

  return (
    <div >
      {/* <div>
        {Object.keys(CITIES).map(name => (
          <button id={name} onClick={flyToCity} className='fly-button'>
            {name}
          </button>
        ))}
      </div> */}
      <div
        id='deckgl-map'
      // style={{ display: 'flex' }}
      >
        <DeckGL
          style={{ height: '100%', width: '100%' }}
          initialViewState={viewState}
          controller={true}
          layers={[airportsLayer, flights]}
          // getTooltip={({ object }) =>
          //   object &&
          //   `${object.properties.iata}
          // `
          // }
          getTooltip={({
            object
          }: PickingInfo<Feature<Geometry, Airport>>) =>
            object &&
            object.properties &&
            object.properties.city + ', ' + object.properties.iata
          }
          views={map_view}
        // views={globe_view}
        >
          <ReactMapGL
            style={{ height: '100%', width: '100%' }}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX}
            mapStyle={'mapbox://styles/mapbox/streets-v9'}
          // projection={globe_mapbox}
          // projection={flat_mapbox}
          />
        </DeckGL>
      </div>
    </div>
  )
}

export default DeckGLMap
