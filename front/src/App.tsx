/* TimeAgo was here, consider using for something */
import { useState } from 'react'
import SlidingWrapper from './components/SlidingWrapper'
import DeckGLMap from './components/DeckGLMap'

import './tailwind.css'

function App() {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className='flex'>
      <SlidingWrapper expanded={expanded} setExpanded={setExpanded} />
      <DeckGLMap expanded={expanded} />
    </div>
  )
}

export default App
