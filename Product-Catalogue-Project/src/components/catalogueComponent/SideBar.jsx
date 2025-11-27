import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const SideBar = ({ categories, selectedCategory, onSelectCategory, onSwitchDataset, currentDataset   }) => {
     const [isOpen, setIsOpen] = useState(false);
     
  return (
  <div className='w-64 shrink-0 rounded-lg'>
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

      {/* Category Links */}
      {/* <div className='divide-y divide-gray-200 max-h-screen overflow-y-auto'>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left px-4 py-3 text-sm font-medium transition ${
              selectedCategory === category.id
                ? 'bg-blue-50 text-blue-950 border-l-2 border-blue-950'
                : 'text-gray-700 hover:bg-gray-50 border-l-2 border-transparent'
            }`}>
            <span className='mr-2'>{category.icon || '▸'}</span>
            {category.name}
          </button>
        ))}
      </div> */}
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
              className={`w-full flex items-center gap-3 px-4 py-3 text-[15px] transition
                ${isActive
                  ? " font-semibold "
                  : "text-gray-700 hover:bg-[#E9EEFF] "
                }
              `}
            >
              {/* Arrow Icon Left */}
              <span className="text-gray-500 text-lg">▸</span>

              {/* Category Name */}
              <span>{category.name}</span>

              {/* Right small grid icon (if exists) */}
              {category.gridIcon && (
                <span className="ml-auto text-blue-600">{category.gridIcon}</span>
              )}
            </button>
          );
        })}

      </div>
    </div>
  )
}

export default SideBar