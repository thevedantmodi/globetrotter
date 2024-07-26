import React, { useState } from 'react'
import { TextOutdent } from '@phosphor-icons/react'
import './SlidingMenu.css'

const SlidingMenu = () => {
  return (
    <aside className='h-screen'>
      <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
        <div className='p-4 pb-2 flex justify-between items-center'>
          <img
            src={require('../assets/logo.png')}
            alt='logo'
            className='w-120 h-32'
          />
          <button className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'>
            <TextOutdent size={40} weight='bold' />
          </button>
        </div>

        <ul className='flex-1 px-3'></ul>

        <div className='border-t flex p-3'></div>
      </nav>
    </aside>
  )
}

export default SlidingMenu
