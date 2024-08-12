import React, { createContext, useContext, useState } from 'react'
import { TextOutdent, Circle, TextIndent } from '@phosphor-icons/react'
import './SlidingMenu.css'

export const SlidingContext = createContext(true)
type SlidingMenuProps = {
  children: React.ReactNode;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};


interface SlidingItemProps {
  icon: React.ReactNode;
  text: string;
  alert: boolean;
  link: string;
}



const SlidingMenu: React.FC<SlidingMenuProps> = ({ children, expanded, setExpanded }: SlidingMenuProps) => {
  return (
    <aside
      className={`h-screen transition-all duration-300 ease-in-out ${expanded ? 'w-80' : 'w-24'} bg-black dark:bg-gray-900`}
    >
      <nav className='h-full flex flex-col bg-white dark:bg-gray-800 border-r shadow-sm'>
        <div className='p-4 pb-2 flex justify-between items-center'>
          <p
            onClick={() => setExpanded(curr => !curr)}
            className={`font-semibold transition-all duration-300 ease-in-out ${expanded ? 'max-w-20 opacity-100' : 'max-w-0 opacity-0'} dark:text-white`}
          >
            Closed Flights
          </p>
          <button
            onClick={() => setExpanded(curr => !curr)}
            className='p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out'
          >
            {expanded ? (
              <TextOutdent size={32} weight='bold' className="dark:text-white" />
            ) : (
              <TextIndent size={32} weight='bold' className="dark:text-white" />
            )}
          </button>
        </div>
        {/* @ts-ignore */}
        <SlidingContext.Provider value={{ expanded }}>
          <ul className='flex-1 px-3 transition-all duration-300 ease-in-out dark:bg-gray-800'>
            {children}
          </ul>
        </SlidingContext.Provider>
        <div className='border-t flex p-2 dark:border-gray-700'>
          <Circle size={150} weight='fill' className="dark:text-white" />
          <div
            className={`flex justify-between items-center transition-all duration-300 ease-in-out ${expanded ? 'max-w-36 ml-3 opacity-100' : 'max-w-0 opacity-0'}`}
          >
            <div className='leading-4'>
              <h4 className='font-sans font-semibold dark:text-white'>Vedant Modi</h4>
              <span className='text-xs font-normal text-gray-600 dark:text-gray-400'>
                vedantmodi@gmail.com
              </span>
              <h6 className='font-sans font-normal text-xs dark:text-gray-400'>
                Boston, USA * 10 friends
              </h6>
              <h6 className='font-sans font-normal text-xs dark:text-gray-400'>
                20 flights * 6,533 miles flown
              </h6>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}


export const SlidingItem: React.FC<SlidingItemProps> =
  ({ icon, text, alert, link }: SlidingItemProps) => {
    // @ts-ignore
    const { expanded } = useContext(SlidingContext)

    return (
      <li
        className='relative flex items-center py-2 px-2 my-1 font-medium rounded-md cursor-pointer transition-all duration-300 ease-in-out group hover:bg-gradient-to-tr hover:from-neutral-200 hover:to-neutral-100 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg text-neutral-800 dark:text-neutral-200'
      >
        {/* TODO: change text-yellow-600 to user preference */}
        <div className={`flex items-center`}>
          <a href={link} className="dark:text-neutral-200">{icon}</a>
        </div>
        <span
          className={`transition-all duration-300 ease-in-out ${expanded ? 'max-w-36 ml-3 opacity-100' : 'max-w-0 opacity-0'}`}
        >
          <a href={link} className="dark:text-neutral-200">{text}</a>
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-neutral-400 dark:bg-gray-500 hover:bg-slate-300 dark:hover:bg-gray-400 transition-all duration-300 ease-in-out ${expanded ? 'opacity-100' : 'opacity-0 top-2'}`}
          ></div>
        )}
        {expanded && (
          <div
            className='absolute left-full rounded-md px-2 py-1 ml-6 bg-neutral-100 dark:bg-gray-700 text-neutral-800 dark:text-neutral-200 text-sm invisible opacity-20 -translate-x-3 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100 group-hover:translate-x-0'
          ></div>
        )}
      </li>
    )
  }

export default SlidingMenu