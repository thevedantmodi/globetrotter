/* TimeAgo was here, consider using for something */
import { useState } from 'react'
import SlidingWrapper from '../components/SlidingWrapper'
import DeckGLMap from '../components/DeckGLMap'

import '../tailwind.css'
import { ModeToggle } from '../components/DarkModeButton'

function MapPage() {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className='flex gap-4'>
      <div>
        <SlidingWrapper expanded={expanded} setExpanded={setExpanded} />
        <ModeToggle></ModeToggle>
      </div>
      <div>
        <DeckGLMap expanded={expanded} />
      </div>
    </div>
  )
}

export default MapPage
