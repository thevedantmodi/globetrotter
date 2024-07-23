import React, { useState } from 'react'

import { GeoJsonLayer } from 'deck.gl'

import NationalParks from '../national-parks-test.json'

type PropertiesType = {
  name: string
  color: string
}

const clickForName = info => {
  alert(info.object?.properties.Name)
}

/* One layer for each attribute, perhaps one for points, one for paths */
const parks = new GeoJsonLayer<PropertiesType>({
  id: 'national-parks',
  // @ts-ignore
  data: NationalParks,

  /* Styles */

  filled: true,
  pointRadiusMinPixels: 5,
  pointRadiusScale: 2000,
  getPointRadius: f => 5,
  getFillColor: [86, 144, 58, 250],
  pickable: true,
  autoHighlight: true,
  onClick: clickForName
})

export default parks
