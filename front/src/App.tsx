/* TimeAgo was here, consider using for something */
import { useState } from 'react'
import SlidingWrapper from './components/SlidingWrapper'
import DeckGLMap from './components/DeckGLMap'

import './tailwind.css'

function App() {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className='flex gap-4'>
      <div className='w-1/3'>
        <SlidingWrapper expanded={expanded} setExpanded={setExpanded} />
      </div>
      <div className='h-3/3 w-2/3'>
        <DeckGLMap expanded={expanded} />
      </div>

    </div>
  )
}

export default App
