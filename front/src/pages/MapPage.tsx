/* TimeAgo was here, consider using for something */
import { useState } from 'react'
import SlidingWrapper from '../components/SlidingWrapper'
import DeckGLMap from '../components/DeckGLMap'

import '../tailwind.css'


function MapPage() {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className='flex flex-row'>
      <div>
        <SlidingWrapper expanded={expanded} setExpanded={setExpanded} />
      </div>
      <div className='w-1/3'>
        <DeckGLMap expanded={expanded} />
      </div>
    </div>
  )
}

export default MapPage


