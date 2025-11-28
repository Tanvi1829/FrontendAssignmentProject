import React, { useState, useEffect, useContext } from 'react'
import { ChevronDown, LogIn, Search, User, LogOut, Menu, X } from 'lucide-react';
import { Menu as MenuComponent, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      <div className='mx-auto py-3 md:py-4 px-3 md:px-4'>
        {/* Desktop Layout */}
        <div className='hidden md:flex items-center justify-between gap-4'>
          {/* Logo */}
          <div className='flex flex-col shrink-0'>
            <h1 className='text-white text-xl md:text-2xl font-bold leading-none'>IndiaDataHub</h1>
            <div className='text-gray-300 flex gap-3 text-xs mt-1'>
              <span>Data</span>
              <span>|</span>
              <span>Analytics</span>
              <span>|</span>
              <span>Intelligence</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className='flex-1 flex'>
            <div className='w-full max-w-3xl'>
              <div className='flex items-center bg-white rounded-lg shadow-sm px-3 md:px-4 py-2'>
                <div className='flex items-center border-r border-gray-300 mr-2 md:mr-3'>
                  <Search className='text-gray-400 mr-2 md:mr-3' size={18} />
                </div>
                <input
                  type='text'
                  placeholder='Search for data and analytics'
                  className='flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm'
                />
                <button className='ml-2 md:ml-3 px-3 md:px-4 py-1 md:py-2 bg-white border border-gray-200 rounded-lg text-gray-600 shadow-sm text-sm hover:bg-gray-50'>
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Database, Calendar, Help */}
          <div className='flex items-center gap-4 md:gap-6 shrink-0'>
            <MenuComponent as="div" className="relative inline-block">
              <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md px-2 md:px-3 py-2 text-xs md:text-sm font-semibold text-white hover:bg-white/20 transition">
                Database
                <ChevronDown aria-hidden="true" className="-mr-1 size-4 md:size-5 text-gray-400" />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 md:w-56 origin-top-right divide-y divide-white/10 rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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
            </MenuComponent>

            <div className='flex gap-4 md:gap-6 text-white text-xs md:text-sm'>
              <button onClick={() => setShowCalendarModal(true)} className='hover:text-gray-300 cursor-pointer transition'>Calendar</button>
              <a href="#" className='hover:text-gray-300 transition'>Help</a>
            </div>

            {/* Profile Dropdown / Login Button */}
            {isLoggedIn ? (
              <MenuComponent as="div" className="relative inline-block">
                <MenuButton className="flex items-center gap-1 md:gap-2 text-white cursor-pointer hover:bg-white/10 rounded-md p-1.5 md:p-2 transition">
                  <User size={20} />
                  <ChevronDown size={14} className="text-gray-400" />
                </MenuButton>
                
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 md:w-48 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs md:text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden hover:bg-white/5"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </MenuComponent>
            ) : (
              <button
                onClick={() => {
                  if (typeof onLogin === 'function') onLogin();
                  else setLocalLoggedIn(true);
                }}
                className='flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 bg-white/10 rounded-md text-white text-xs md:text-sm hover:bg-white/20 transition'
              >
                <LogIn size={16} />
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className='flex md:hidden items-center justify-between'>
          {/* Logo */}
          <div className='flex flex-col shrink-0'>
            <h1 className='text-white text-lg font-bold leading-none'>IndiaDataHub</h1>
            <div className='text-gray-300 flex gap-2 text-xs mt-0.5'>
              <span>Data</span>
              <span>|</span>
              <span>Analytics</span>
            </div>
          </div>

          {/* Search Icon & Hamburger Menu */}
          <div className='flex items-center gap-3'>
            <button className='text-white hover:bg-white/10 p-1.5 rounded transition'>
              <Search size={20} />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='text-white hover:bg-white/10 p-1.5 rounded transition'
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - shown when opened */}
        {mobileMenuOpen && (
          <div className='md:hidden mt-3 pb-3 border-t border-white/20'>
            <div className='flex items-center bg-white rounded-lg shadow-sm px-3 py-2 mt-3 mb-3'>
              <Search className='text-gray-400 mr-2' size={16} />
              <input
                type='text'
                placeholder='Search for data'
                className='flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm'
              />
            </div>

            {/* Mobile Menu Items */}
            <div className='flex flex-col gap-2 text-white text-sm'>
              <MenuComponent as="div" className="relative">
                <MenuButton className="w-full text-left flex justify-between items-center px-3 py-2 hover:bg-white/10 rounded transition">
                  Database
                  <ChevronDown aria-hidden="true" className="size-4 text-gray-400" />
                </MenuButton>
                <MenuItems className="bg-gray-700 rounded mt-1 divide-y divide-white/10">
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white">
                      Database 1
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white">
                      Database 2
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white">
                      Database 3
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white">
                      Database 4
                    </a>
                  </MenuItem>
                </MenuItems>
              </MenuComponent>

              <button onClick={() => setShowCalendarModal(true)} className='text-left px-3 py-2 hover:bg-white/10 rounded transition'>
                Calendar
              </button>
              <a href="#" className='text-left px-3 py-2 hover:bg-white/10 rounded transition'>
                Help
              </a>

              <div className='border-t border-white/20 pt-2 mt-2'>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/10 rounded transition justify-start"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (typeof onLogin === 'function') onLogin();
                      else setLocalLoggedIn(true);
                    }}
                    className='flex items-center gap-2 px-3 py-2 bg-white/20 rounded text-white hover:bg-white/30 transition w-full justify-center'
                  >
                    <LogIn size={16} />
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
    <MonthCalendarModal isOpen={showCalendarModal} onClose={() => setShowCalendarModal(false)} />
    </>
  )
}

export default Navbar