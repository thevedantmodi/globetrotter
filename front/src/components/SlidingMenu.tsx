import React, { createContext, useContext, useState } from 'react'
import { TextOutdent, Circle, TextIndent } from '@phosphor-icons/react'
import './SlidingMenu.css'

export const SlidingContext = createContext(true)

const SlidingMenu = ({ children, expanded, setExpanded }) => {
  return (
    <aside
      className={`h-screen transition-all duration-300 
          ease-in-out ${expanded ? 'w-80' : 'w-24'
        }`}
    >
      <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
        <div className='p-4 pb-2 flex justify-between items-center'>
          <p
            onClick={() => setExpanded(curr => !curr)}
            className={`font-semibold transition-all duration-300 ease-in-out ${expanded ? 'max-w-20 opacity-100' : 'max-w-0 opacity-0'
              }`}
          >
            Closed Flights
          </p>
          <button
            onClick={() => setExpanded(curr => !curr)}
            className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-in-out'
          >
            {expanded ? (
              <TextOutdent size={32} weight='bold' />
            ) : (
              <TextIndent size={32} weight='bold' />
            )}
          </button>
        </div>
        {/* @ts-ignore */}
        <SlidingContext.Provider value={{ expanded }}>
          <ul className='flex-1 px-3 transition-all duration-300 ease-in-out'>
            {children}
          </ul>
        </SlidingContext.Provider>
        <div className='border-t flex p-2'>
          <Circle size={150} weight='fill' />
          <div
            className={`flex justify-between items-center transition-all duration-300 ease-in-out ${expanded ? 'max-w-36 ml-3 opacity-100' : 'max-w-0 opacity-0'
              }`}
          >
            <div className='leading-4'>
              <h4 className='font-sans font-semibold'>Vedant Modi</h4>
              <span className='text-xs font-normal text-gray-600'>
                vedantmodi@gmail.com
              </span>
              <h6 className='font-sans font-normal text-xs'>
                Boston, USA * 10 friends
              </h6>
              <h6 className='font-sans font-normal text-xs'>
                20 flights * 6,533 miles flown
              </h6>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SlidingItem({ icon, text, alert, link }) {
  // @ts-ignore
  const { expanded } = useContext(SlidingContext)

  return (
    <li
      className='relative flex items-center py-2 px-2 my-1 font-medium 
      rounded-md cursor-pointer transition-all duration-300 ease-in-out group 
      hover:bg-gradient-to-tr hover:from-neutral-200 hover:to-neutral-100
      hover:text-blue-600 hover:shadow-lg
      text-neutral-800'
    >
      {/* TODO: change text-yellow-600 to user preference */}
      <div className={`flex items-center`}>
        <a href={link}>{icon}</a>
      </div>
      <span
        className={`transition-all duration-300 ease-in-out ${expanded ? 'max-w-36 ml-3 opacity-100' : 'max-w-0 opacity-0'
          }`}
      >
        <a href={link}>{text}</a>
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-neutral-400 hover:bg-slate-300 
            transition-all duration-300 ease-in-out 
            ${expanded ? 'opacity-100' : 'opacity-0 top-2'
            }
            `}
        ></div>
      )}
      {expanded && (
        <div
          className='absolute left-full rounded-md px-2 py-1 ml-6
         bg-neutral-100 text-neutral-800 text-sm invisible 
         opacity-20 -translate-x-3 transition-all duration-300 
         ease-in-out group-hover:visible group-hover:opacity-100 
         group-hover:translate-x-0'
        ></div>
      )}
    </li>
  )
}

export default SlidingMenu
