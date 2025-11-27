import React, { useMemo, useState } from 'react'
import { MoreVertical, BookmarkMinus, Pin, Plus } from 'lucide-react'

const ProductTable = ({ data, currentPage, itemsPerPage, onPageChange }) => {
  const [activeActions, setActiveActions] = useState({})
  const { startIndex, endIndex, paginatedData, totalPages } = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return {
      startIndex: start,
      endIndex: end,
      paginatedData: data.slice(start, end),
      totalPages: Math.ceil(data.length / itemsPerPage),
    }
  }, [currentPage, data, itemsPerPage])

  const getCoverageColor = (coverage) => {
    if (coverage === 'S') return 'bg-red-100 text-red-700'
    if (coverage === 'R') return 'bg-orange-100 text-orange-700'
    if (coverage === 'N') return 'bg-blue-100 text-blue-700'
    if (coverage === 'D') return 'bg-red-100 text-red-700'
    return 'bg-gray-100 text-gray-700'
  }

  const toggleAction = (itemId, actionType) => {
    const key = `${itemId}-${actionType}`
    setActiveActions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    // make this a column container and limit its height so only the table body scrolls
  <div className='flex-1 bg-white rounded-lg shadow-sm flex flex-col max-h-[calc(100vh-130px)]'>
      {/* Table Header */}
      <div className='grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 font-bold text-xl bg-gray-50 text-blue-900'>
        <div className='col-span-5'>New Releases ({data.length})</div>
        <div className='col-span-3'>Range</div>
        <div className='col-span-1'>Unit</div>
        <div className='col-span-1 text-center'>Coverage</div>
        <div className='col-span-2 text-center'>Actions</div>
      </div>

      {/* Table Body - scrollable area */}
  <div id='product-table-body' className='divide-y divide-gray-200 overflow-auto flex-1'>
        {paginatedData.map((item) => (
          <div key={item.id} className='grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition items-center text-sm'>
            {/* Title & Category */}
            <div className='col-span-5'>
              <p className='font-medium text-gray-900'>{item.title}</p>
              <p className='text-xs text-blue-600 mt-1 bg-blue-100 w-[7rem] p-1 rounded-lg text-center'>{item.category}</p>
            </div>

            {/* Range */}
            <div className='col-span-3'>
                <p className='font-medium text-gray-900'>{item.range}</p>
              <p className='text-xs text-gray-600 mt-1'>{item.frequency}</p>
            </div>

            {/* Unit */}
            <div className='col-span-1 text-gray-700'>{item.unit}</div>

            {/* Coverage Badges */}
            <div className='col-span-1 flex gap-2 justify-center'>
              {item.coverage.map((cov, idx) => (
                <span key={idx} className={`px-2 py-1 rounded text-xs font-medium ${getCoverageColor(cov)}`}>
                  {cov}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className='col-span-2 flex gap-3 justify-end'>
              <button 
                onClick={() => toggleAction(item.id, 'bookmark')}
                className={`p-1.5 rounded transition ${activeActions[`${item.id}-bookmark`] ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 text-gray-600'}`}
                title='Bookmark'>
                <BookmarkMinus size={18} className={activeActions[`${item.id}-bookmark`] ? 'font-bold' : ''} strokeWidth={activeActions[`${item.id}-bookmark`] ? 3 : 1.5} />
              </button>
              <button 
                onClick={() => toggleAction(item.id, 'share')}
                className={`p-1.5 rounded transition border ${activeActions[`${item.id}-share`] ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-400 hover:bg-gray-200 text-gray-600'}`}
                title='Share'>
                <Plus size={16} className={activeActions[`${item.id}-share`] ? 'font-bold' : ''} strokeWidth={activeActions[`${item.id}-share`] ? 3 : 1.5} />
              </button>
              <button 
                onClick={() => toggleAction(item.id, 'pin')}
                className={`p-1.5 rounded transition ${activeActions[`${item.id}-pin`] ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 text-gray-600'}`}
                title='Pin'>
                <Pin size={18} className={activeActions[`${item.id}-pin`] ? 'font-bold' : ''} strokeWidth={activeActions[`${item.id}-pin`] ? 3 : 1.5} />
              </button>
              <button className='p-1.5 hover:bg-gray-200 rounded transition text-gray-600' title='More'>
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50'>
        <p className='text-sm text-gray-600'>
          Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length}
        </p>
        <div className='flex gap-2'>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-3 py-2  text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition'>
            Previous
          </button>
          <div className='flex items-center gap-2'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 rounded text-sm font-medium transition ${
                  currentPage === page
                    ? ' text-black'
                    : ' text-gray-700 hover:bg-gray-100'
                }`}>
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition'>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductTable
