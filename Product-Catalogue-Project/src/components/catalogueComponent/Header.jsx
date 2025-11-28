import { BookmarkMinus, ChartLine, ChevronLeft, Funnel, Pin, Search, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import BookmarkedProductsModal from './BookmarkedProductsModal'

const Header = ({ currentDataset, onDatasetSwitch, selectedCount = 0, bookmarkCount = 0, pinCount = 0, bookmarkedProducts = [] }) => {
  const [showBookmarkedModal, setShowBookmarkedModal] = useState(false)

  return (
    <>
      <div className='m-4'>
        <div className='flex items-center justify-between'>
          {/* Left Side */}
          <div className='flex flex-row items-center gap-2'>
            <ChevronLeft size={18}/>
            <h1 className='text-xl text-black font-semibold'>Economic Monitor</h1>
          </div>

          {/* Right Side */}
          <div className='flex items-center gap-4'>     
            <div className='flex items-center gap-4 pr-10'>
              <Search size={34} className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg'/>
              <div className='relative'>
                <button
                  onClick={() => setShowBookmarkedModal(true)}
                  className='hover:bg-gray-100 transition rounded-lg'
                >
                  <BookmarkMinus size={34} className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg' />
                </button>
                {bookmarkCount > 0 && (
                  <span className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                    {bookmarkCount}
                  </span>
                )}
              </div>
              <Funnel size={34} className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg'/>
              <div className="w-px h-8 bg-white shadow-sm border border-gray-300 ml-1 mr-3"></div>
            </div>

            <p>Selected ({selectedCount})</p>

            <ShoppingCart size={34} className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg'/>
            <div className='relative'>
              <Pin size={34} className='bg-white shadow-sm border border-gray-300 p-2 rounded-lg'/>
              {pinCount > 0 && (
                <span className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                  {pinCount}
                </span>
              )}
            </div>

            <button className='bg-blue-950 text-white flex items-center gap-2 px-4 py-2 rounded-lg'>
              <ChartLine size={18}/>
              View Graph
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