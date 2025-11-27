import { BookmarkMinus, ChartLine, ChevronLeft, Funnel, Pin, Search, ShoppingCart } from 'lucide-react'
import React from 'react'

const Header = ({ currentDataset, onDatasetSwitch }) => {
  return (
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
                <Search size={34} className='bg-gray-300 p-2 rounded-lg'/>
                <BookmarkMinus size={34} className='bg-gray-300 p-2 rounded-lg' />
                <Funnel size={34} className='bg-gray-300 p-2 rounded-lg'/>
                  <div className="w-px h-8 bg-gray-300 ml-1 mr-3"></div>

                </div>

                <p>Selected (2)</p>

                <ShoppingCart size={34} className='bg-gray-300 p-2 rounded-lg'/>
                <Pin size={34} className='bg-gray-300 p-2 rounded-lg'/>

                <button className='bg-blue-950 text-white flex items-center gap-2 px-4 py-2 rounded-lg'>
                    <ChartLine size={18}/>
                    View Graph
                </button>
            </div>
        </div>
            
    </div>
  )
}

export default Header;