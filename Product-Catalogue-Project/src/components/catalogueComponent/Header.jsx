import { BookmarkMinus, ChartLine, ChevronLeft, Funnel, Pin, Search, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import BookmarkedProductsModal from './BookmarkedProductsModal'

const Header = ({ currentDataset, onDatasetSwitch, selectedCount = 0, bookmarkCount = 0, pinCount = 0, bookmarkedProducts = [] }) => {
  const [showBookmarkedModal, setShowBookmarkedModal] = useState(false)

  return (
    <>
      <div className='m-2 md:m-4'>
        {/* Desktop Layout */}
        <div className='hidden md:flex items-center justify-between gap-4'>
          {/* Left Side */}
          <div className='flex flex-row items-center gap-2 shrink-0'>
            <ChevronLeft size={20}/>
            <h1 className='text-lg md:text-xl text-black font-semibold'>Economic Monitor</h1>
          </div>

          {/* Right Side - Desktop */}
          <div className='flex items-center gap-3 md:gap-4 flex-wrap justify-end'>     
            <div className='flex items-center gap-3 md:gap-4 pr-0 md:pr-10'>
              <Search size={32} className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg hover:shadow-md transition'/>
              <div className='relative'>
                <button
                  onClick={() => setShowBookmarkedModal(true)}
                  className='hover:bg-gray-100 transition rounded-lg'
                >
                  <BookmarkMinus size={32} className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg hover:shadow-md transition' />
                </button>
                {bookmarkCount > 0 && (
                  <span className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                    {bookmarkCount}
                  </span>
                )}
              </div>
              <Funnel size={32} className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg hover:shadow-md transition'/>
              <div className="hidden md:block w-px h-8 bg-white shadow-sm border border-gray-300 ml-1 mr-3"></div>
            </div>

            <p className='text-sm md:text-base whitespace-nowrap'>Selected ({selectedCount})</p>

            <ShoppingCart size={32} className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg hover:shadow-md transition'/>
            <div className='relative'>
              <div className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg flex items-center justify-center hover:shadow-md transition'>
                <Pin size={18} className='rotate-320'/>
              </div>
              {pinCount > 0 && (
                <span className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                  {pinCount}
                </span>
              )}
            </div>

            <button className='bg-blue-950 text-white flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm md:text-base hover:bg-blue-900 transition'>
              <ChartLine size={18}/>
              <span className='hidden sm:inline'>View Graph</span>
              <span className='sm:hidden'>Graph</span>
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className='md:hidden'>
          {/* Top Row */}
          <div className='flex items-center justify-between mb-3'>
            <div className='flex items-center gap-2 shrink-0'>
              <ChevronLeft size={18}/>
              <h1 className='text-base md:text-lg text-black font-semibold'>Economic Monitor</h1>
            </div>
          </div>

          {/* Middle Row - Action Icons */}
          <div className='flex items-center gap-2 mb-3 overflow-x-auto pb-2'>
            <Search size={28} className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg shrink-0 hover:shadow-md transition'/>
            <div className='relative shrink-0'>
              <button
                onClick={() => setShowBookmarkedModal(true)}
                className='hover:bg-gray-100 transition rounded-lg'
              >
                <BookmarkMinus size={28} className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg hover:shadow-md transition' />
              </button>
              {bookmarkCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center'>
                  {bookmarkCount}
                </span>
              )}
            </div>
            <Funnel size={28} className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg shrink-0 hover:shadow-md transition'/>
            <ShoppingCart size={28} className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg shrink-0 hover:shadow-md transition'/>
            <div className='relative shrink-0'>
              <div className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg flex items-center justify-center hover:shadow-md transition'>
                <Pin size={16} className='rotate-320'/>
              </div>
              {pinCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center'>
                  {pinCount}
                </span>
              )}
            </div>
          </div>

          {/* Bottom Row - Counters and Button */}
          <div className='flex items-center justify-between gap-2 flex-wrap'>
            <p className='text-xs md:text-sm'>Selected: {selectedCount}</p>
            <button className='bg-blue-950 text-white flex items-center gap-1 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm hover:bg-blue-900 transition whitespace-nowrap'>
              <ChartLine size={16}/>
              Graph
            </button>
          </div>
        </div>
      </div>

      <BookmarkedProductsModal 
        isOpen={showBookmarkedModal} 
        onClose={() => setShowBookmarkedModal(false)} 
        bookmarkedProducts={bookmarkedProducts}
      />
    </>
  )
}

export default Header