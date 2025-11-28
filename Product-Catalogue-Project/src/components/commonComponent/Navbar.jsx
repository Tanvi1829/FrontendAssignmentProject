import React, { useState, useEffect, useContext } from 'react'
import { ChevronDown, LogIn, Search, User, LogOut } from 'lucide-react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import MonthCalendarModal from './MonthCalendarModal'


const Navbar = ({ isLoggedIn: propIsLoggedIn, onLogin }) => {
    // support controlled prop (propIsLoggedIn) or fallback to local state
    const [localLoggedIn, setLocalLoggedIn] = useState(false);
    const isLoggedIn = typeof propIsLoggedIn === 'boolean' ? propIsLoggedIn : localLoggedIn;
    const navigate = useNavigate();
    const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
    const [showCalendarModal, setShowCalendarModal] = useState(false)

    useEffect(() => {
      // if parent controls login state, keep local state in sync (optional)
      if (typeof propIsLoggedIn === 'boolean') setLocalLoggedIn(propIsLoggedIn);
    }, [propIsLoggedIn]);

    const handleLogout = () => {
      if (typeof setCurrentUser === 'function') setCurrentUser(null);
      setIsLoggedIn(false);
      navigate('/login');
    };
  return (
    <>
    <header className='bg-[#2b0b66] shadow-md w-full'>
      <div className=' mx-auto py-4 px-4 flex items-center justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-white text-2xl font-bold leading-none'>IndiaDataHub</h1>
          <div className='text-gray-300 flex gap-3 text-xs mt-1'>
            <span>Data</span>
            <span>|</span>
            <span>Analytics</span>
            <span>|</span>
            <span>Intelligence</span>
          </div>
        </div>

        <div className='flex-1 flex px-36'>
          <div className='w-full max-w-3xl'>
            <div className='flex items-center bg-white  rounded-lg shadow-sm px-4 py-2'>
                <div className='flex items-center border-r border-gray-300 mr-3'>
                    <Search className='text-gray-400 mr-3' size={18} />
                </div>
              <input
                type='text'
                placeholder='Search for data and analytics'
                className='flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent'
              />
              <button className='ml-3 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 shadow-sm'>
                Search
              </button>
            </div>
          </div>
        </div>

    
        <div className='flex items-center gap-6 shrink-0' />
       <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
        Database
        <ChevronDown aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-white/10 rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Database 1
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Database 2
            </a>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Database 3
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Database 4
            </a>
          </MenuItem>
        </div>

      </MenuItems>
    </Menu>
     <div className='flex  gap-6 text-white text-sm mr-5'>
            <button onClick={() => setShowCalendarModal(true)} className='hover:text-gray-300 cursor-pointer'>Calendar</button>
            <a href="#" className='hover:text-gray-300'>Help</a>
          </div>
          {isLoggedIn ? (
            <Menu as="div" className="relative inline-block">
              <MenuButton className="flex items-center gap-2 text-white cursor-pointer hover:bg-white/10 rounded-md p-2 transition">
                <User size={22} />
                <ChevronDown size={16} className="text-gray-400" />
              </MenuButton>
              
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden hover:bg-white/5"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          ) : (
            <button
              onClick={() => {
                if (typeof onLogin === 'function') onLogin();
                else setLocalLoggedIn(true);
              }}
              className='flex items-center gap-2 px-4 py-2 bg-white/10  rounded-md text-white text-sm hover:bg-white/20 transition'
            >
              <LogIn />
              Login
            </button>
          )}
      </div>
    </header>
    <MonthCalendarModal isOpen={showCalendarModal} onClose={() => setShowCalendarModal(false)} />
    </>
  )
}

export default Navbar