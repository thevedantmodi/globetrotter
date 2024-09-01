import React, { createContext, useContext, useEffect, useState } from 'react'
import { TextOutdent, Circle, TextIndent } from '@phosphor-icons/react'
import './SlidingMenu.css'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import type { AuthUserData } from './RequireAuth';
import axios from 'axios';
import { Link } from 'react-daisyui';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

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

interface UserDataValues {
  fullName?: string,
  email?: string,
  km?: number,
  no_friends?: number,
  no_flights?: number,
  hometown?: string,
}



const SlidingMenu: React.FC<SlidingMenuProps> = ({ children, expanded, setExpanded }: SlidingMenuProps) => {
  const authUser = useAuthUser<AuthUserData>()
  const [UserData, setUserData] = useState<UserDataValues>({})
  const signOut = useSignOut()

  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await axios.post("/users/get-user-data",
          { username: authUser?.username })
        setUserData(result.data)
      } catch (err) {
        console.log(err);
      }
    }
    getUserData()
  }, [authUser?.username])

  console.log(authUser);
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
        {UserData.email ? (
          <div className="flex flex-col items-center gap-1">
            <div className='border-t flex p-2 dark:border-gray-700'>
              {expanded && <Circle size={150} weight='fill' className="dark:text-white" />}
              <div
                className={`flex justify-between items-center transition-all duration-300 ease-in-out ${expanded ? 'max-w-36 ml-3 opacity-100' : 'max-w-0 opacity-0'}`}
              >
                <div className='leading-4'>
                  <h4 className='font-sans font-semibold dark:text-white'>{UserData.fullName}</h4>
                  <span className='text-xs font-normal text-gray-600 dark:text-gray-400'>
                    {UserData.email}
                  </span>
                  <h6 className='font-sans font-normal text-xs dark:text-gray-400'>
                    {UserData.hometown} * {UserData.no_friends} {UserData.no_friends === 1 ? "friend" : "friends"}
                  </h6>
                  <h6 className='font-sans font-normal text-xs dark:text-gray-400'>
                    {UserData.no_flights} {UserData.no_flights === 1 ? "flight" : "flights"} * {UserData.km} {UserData.km === 1 ? "kilometer" : "kilometers"} flown
                  </h6>
                </div>
              </div>
            </div>

            {expanded && <Link
              onClick={() => {
                signOut()
                window.location.reload()
              }}
              className="bg-black text-white hover:bg-gray-500 active:bg-gray-800 focus:bg-gray-900 focus:ring-gray-500 transition-all duration-200 ease-in-out w-full sm:w-auto px-4 py-2 rounded-lg mb-1">
              Sign Out
            </Link>}
          </div>
        ) : (
          expanded &&
          <div className='border-t flex p-2 dark:border-gray-700 gap-4 mx-auto'>
            <Link href='/sign-up'
              className="bg-black text-white hover:bg-gray-500 active:bg-gray-800 focus:bg-gray-900 focus:ring-gray-500 transition-all duration-200 ease-in-out w-full sm:w-auto px-4 py-2 rounded-lg">
              Sign Up
            </Link>

            <Link href='/login'
              className="bg-black text-white hover:bg-gray-500 active:bg-gray-800 focus:bg-gray-900 focus:ring-gray-500 transition-all duration-200 ease-in-out w-full sm:w-auto px-4 py-2 rounded-lg">
              Login
            </Link>
          </div>
        )}
      </nav>
    </aside >
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