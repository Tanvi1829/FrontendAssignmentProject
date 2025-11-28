import React, { useState } from 'react'
import { ChevronDown, LayoutDashboard, Menu, X } from 'lucide-react'

const SideBar = ({ categories, selectedCategory, onSelectCategory, onSwitchDataset, currentDataset   }) => {
     const [isOpen, setIsOpen] = useState(false);
     const [isMobileOpen, setIsMobileOpen] = useState(false);
     
  return (
  <>
    {/* Desktop Sidebar */}
    <div className='hidden md:block w-full md:w-64 shrink-0 rounded-lg'>
      <div className=' '>
        <div className='p-4 bg-blue-100 rounded-lg cursor-pointer mb-4' onClick={() => setIsOpen(!isOpen)}>
        <p className='text-sm font-semibold text-gray-600 '>Category:</p>
        <div className="flex items-center mt-1">
          <span className='text-xl font-bold text-gray-800'>{currentDataset === "response1" ? "India & States" : "IMF"}</span>
          <ChevronDown size={18}  className={`ml-auto text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        </div>
         {isOpen && (
          <div className='mt-2 border border-gray-200 rounded-md bg-white shadow-md'>
            <button
              onClick={() => {
                onSwitchDataset("response1");  // response1.json
                setIsOpen(false);
              }}
              className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
            >
              India & States
            </button>

            <button
              onClick={() => {
                onSwitchDataset("response2");  // response2.json
                setIsOpen(false);
              }}
              className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
            >
              IMF
            </button>
          </div>
        )}
      </div>

      <div className="space-y-1 p-4 bg-blue-50 max-h-[calc(100vh-140px)] overflow-auto rounded-lg">
        <div className="bg-blue-50 rounded-xl">
          <div className="bg-white px-4 py-3 rounded-lg w-full ">
            <h1 className="text-base font-semibold text-gray-900">Homepage</h1>
          </div>
        </div>

        {categories.map((category) => {
          const isActive = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[15px] transition rounded-lg
                ${isActive
                  ? "bg-blue-200 font-semibold text-gray-900"
                  : "text-gray-700 hover:bg-[#E9EEFF] "
                }
              `}
            >
              {/* Arrow Icon Left */}
              <span className="text-gray-500 text-lg">▸</span>

              {/* Category Name */}
              <span>{category.name}</span>

              {/* Right small grid icon only for specific categories (or if category provides gridIcon) */}
              {((['external-sector', 'foreign-trade'].includes(category.id)) || category.gridIcon) && (
                <span className="ml-auto text-blue-600">
                  {category.gridIcon ? category.gridIcon : <LayoutDashboard size={18} />}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>

    {/* Mobile Sidebar Toggle Button */}
    <button
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className='md:hidden fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition'
    >
      {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

    {/* Mobile Sidebar Drawer */}
    {isMobileOpen && (
      <>
        {/* Overlay */}
        <div
          className='md:hidden fixed inset-0 bg-black/30 z-30'
          onClick={() => setIsMobileOpen(false)}
        />
        
        {/* Drawer */}
        <div className='md:hidden fixed left-0 top-0 bottom-0 w-64 bg-white z-40 shadow-xl overflow-y-auto'>
          <div className='p-4'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-lg font-bold text-gray-900'>Filters</h2>
              <button onClick={() => setIsMobileOpen(false)} className='text-gray-500 hover:text-gray-900'>
                <X size={24} />
              </button>
            </div>

            {/* Dataset Selector */}
            <div className='p-4 bg-blue-100 rounded-lg cursor-pointer mb-4' onClick={() => setIsOpen(!isOpen)}>
              <p className='text-sm font-semibold text-gray-600'>Category:</p>
              <div className="flex items-center mt-1">
                <span className='text-lg font-bold text-gray-800'>{currentDataset === "response1" ? "India & States" : "IMF"}</span>
                <ChevronDown size={18} className={`ml-auto text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {isOpen && (
              <div className='mt-2 border border-gray-200 rounded-md bg-white shadow-md mb-4'>
                <button
                  onClick={() => {
                    onSwitchDataset("response1");
                    setIsOpen(false);
                  }}
                  className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                >
                  India & States
                </button>
                <button
                  onClick={() => {
                    onSwitchDataset("response2");
                    setIsOpen(false);
                  }}
                  className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                >
                  IMF
                </button>
              </div>
            )}

            {/* Categories */}
            <div className="space-y-1 bg-blue-50 p-3 rounded-lg">
              <div className="bg-white px-3 py-2 rounded-lg w-full mb-2">
                <h1 className="text-sm font-semibold text-gray-900">Homepage</h1>
              </div>

              {categories.map((category) => {
                const isActive = selectedCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      onSelectCategory(category.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition rounded
                      ${isActive
                        ? "bg-blue-200 font-semibold text-gray-900"
                        : "text-gray-700 hover:bg-[#E9EEFF]"
                      }
                    `}
                  >
                    <span className="text-gray-500">▸</span>
                    <span className='flex-1'>{category.name}</span>
                    {((['external-sector', 'foreign-trade'].includes(category.id)) || category.gridIcon) && (
                      <span className="text-blue-600">
                        {category.gridIcon ? category.gridIcon : <LayoutDashboard size={16} />}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </>
    )}
  </>
  )
}

export default SideBar