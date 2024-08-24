import { useState, useCallback, useEffect, useMemo } from 'react'

import { useTheme } from "next-themes"

import DeckGL, {
  _GlobeView as GlobeView,
  MapView,
  FlyToInterpolator,
  ScatterplotLayer


} from 'deck.gl'

import { ModeToggle } from '../components/DarkModeButton'
import { ArcLayer, GeoJsonLayer } from '@deck.gl/layers'
import { MapViewState } from '@deck.gl/core'
import type { PickingInfo } from '@deck.gl/core'
import { Feature, Geometry } from 'geojson'

import type { FlightInputValues } from './AddFlightForm'

import axios from 'axios'
import flightsData from '../test-flights.json'

import ReactMapGL from 'react-map-gl'
import { ProjectionSpecification, StyleSpecification } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { UnitsModeButton } from './UnitsModeButton'

const globe_mapbox: ProjectionSpecification = {
  name: 'globe'
}

const flat_mapbox: ProjectionSpecification = {
  name: 'mercator'
}

const globe_view = new GlobeView({
  id: 'globe',
  controller: true,
  nearZMultiplier: 0.1,
  farZMultiplier: 1
})

const map_view = new MapView({
  id: 'map',
  controller: true,
  repeat: true
})

type Airport = {
  icao: string
  iata: string
  name: string
  city: string
  subd: string
  country: string
  lat: number
  lon: number
  tz: string
  size: string
}

/* TODO: Add values for flight API and flights API  */
interface FlightValues {
  departure: {
    date: string
    port: Airport
  }
  arrival: {
    date: string
    port: Airport
  }
  carrier: string
  number: number
  price: number
}

function DeckGLMap({ expanded }: { expanded: boolean }) {
  const { theme, setTheme, systemTheme } = useTheme()
  // const [viewState, setViewState] = useState<MapViewState>({
  //   latitude: 30,
  //   longitude: 0,
  //   zoom: 1.5,
  //   pitch: 0,
  //   bearing: 0
  // })

  const [airports, setAirports] = useState([])
  const [flights, setFlights] = useState([])


  const CITIES: { [name: string]: MapViewState } = {
    "BRISBANE": {
      latitude: -27.470125,
      longitude: 153.021072,
      zoom: 14,
      minZoom: 1,
      bearing: 0,
      pitch: 0
    },
    "NYC": {
      longitude: -74.0,
      latitude: 40.7,
      zoom: 14,
      minZoom: 1,
      bearing: 0,
      pitch: 0
    },
    "SINGAPORE": {
      longitude: 103.8198,
      latitude: 1.3521,
      zoom: 14,
      minZoom: 1,
      bearing: 0,
      pitch: 0
    },
    "ATLANTA": {
      longitude: -84.3877,
      latitude: 33.7488,
      zoom: 14,
      minZoom: 1,
      bearing: 0,
      pitch: 0
    },
    "WORLD": {
      longitude: 0,
      latitude: 30,
      zoom: 1,
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

  const [viewState, setViewState] = useState<MapViewState>(CITIES['WORLD'])

  const memoizedViewState = useMemo(() => viewState, [viewState])

  const handleViewStateChange = useCallback(({ viewState }:
    { viewState: MapViewState }) => {
    if (viewState !== memoizedViewState) {
      setViewState(viewState)
    }
  }, [memoizedViewState])

  const flyToCity = useCallback((evt: { target: { id: string } }) => {
    setViewState({
      ...CITIES[evt.target.id],
      transitionInterpolator: new FlyToInterpolator({ speed: 4 }),
      transitionDuration: 'auto'
    })
  }, [])

  const createPointRadius = (f: Feature<Geometry, Airport>) => {
    const port_size: string = f.properties.size

    if (port_size === "large") {
      return 6
    } else if (port_size === "medium") {
      return 4
    } else if (port_size === "small") {
      return 1
    } else {
      return 200
    }

  }

  const createPointColor = (f: Feature<Geometry, Airport>) => {
    const port_size: string = f.properties.size
    if (port_size === "large") {
      return [233, 57, 57]
    } else if (port_size === "medium") {
      return [196, 164, 47]
    } else if (port_size === "small") {
      return [42, 135, 98]
    } else {
      return [0, 0, 0, 255]
    }
  }
  const airportsLayer = new GeoJsonLayer<Airport>({
    id: 'airports',
    data: airports,

    stroked: true,
    filled: true,
    pointType: 'circle',
    pickable: true,
    getPointRadius: (f: Feature<Geometry, Airport>) => createPointRadius(f),
    // @ts-ignore
    getFillColor: (f: Feature<Geometry, Airport>) => createPointColor(f),
    getText: (f: Feature<Geometry, Airport>) => f.properties.iata,
    getLineWidth: 3000,
    textFontFamily: 'Manrope',
    getTextSize: 12,
    pointRadiusScale: 10000,

  })




  const flights = new ArcLayer<FlightValues>({
    id: 'flights',
    data: flightsData,

    getSourcePosition: (d: FlightValues) =>
      [d.departure.port.lon, d.departure.port.lat],
    getTargetPosition: (d: FlightValues) =>
      [d.arrival.port.lon, d.arrival.port.lat],
    getSourceColor: [0, 0, 0],
    getTargetColor: [0, 0, 0],
    getWidth: 2,
    pickable: true,
    getHeight: 0,
    greatCircle: true,
    numSegments: 500,
    wrapLongitude: true
  })

  /* <div>
    {Object.keys(CITIES).map(name => (
      <button id={name} onClick={flyToCity} className='fly-button'>
        {name}
      </button>
    ))}
  </div> */

  function mapbox_style() {
    switch (theme) {
      case 'system':
        return systemTheme === 'light' ? "mapbox://styles/mapbox/streets-v12" :
          "mapbox://styles/mapbox/dark-v11"
      case 'dark':
        return "mapbox://styles/mapbox/dark-v11";
      case 'light':
        return "mapbox://styles/mapbox/streets-v12"
    }

  }

  return (
    <div
      id='deckgl-map'
      style={{ display: 'flex' }}
    >
      <DeckGL
        // @ts-ignore
        initialViewState={viewState}
        onViewStateChange={handleViewStateChange}
        controller={true}
        layers={[airportsLayer, flights]}
        // @ts-ignore
        getTooltip={({
          object
        }: PickingInfo<Feature<Geometry, Airport>>) =>
          object &&
          object.properties &&
          object.properties.city + ' (' + object.properties.iata + ')'
        }
        views={
          [
            // globe_view
            map_view
          ]}
        eventHandler={false}
        style={{
          position: 'absolute', left: expanded ? '22%' : '7%',
          transition: 'left 0.3s ease-in-out',
          width: expanded ? '78%' : '93%',
          zIndex: '3',
        }}

      >
        <ReactMapGL
          // @ts-ignore
          viewState={memoizedViewState}
          onViewStateChange={handleViewStateChange}
          reuseMaps
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          style={{
            position: 'absolute', left: expanded ? '22%' : '7%',
            transition: 'left 0.3s ease-in-out',
            width: expanded ? '78%' : '93%',
            zIndex: '2',
          }}
          mapStyle={mapbox_style()}
          // projection={globe_mapbox}
          projection={flat_mapbox}
        />
        <ModeToggle styles={"p-2.5"} />
        <UnitsModeButton styles={"p-2.5"} />
      </DeckGL>
    </div>
  )
}

export default DeckGLMap
