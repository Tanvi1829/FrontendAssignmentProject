import React, { useMemo, useState, useEffect } from 'react'
import { MoreVertical, BookmarkMinus, Pin, Plus } from 'lucide-react'

const ProductTable = ({ data, currentPage, itemsPerPage, onPageChange, onShareToggle, onBookmarkToggle, onPinToggle, bookmarkedIds = new Set(), selectedIds = new Set(), pinIds = new Set() }) => {
  const [activeActions, setActiveActions] = useState({})

  // Sync activeActions UI state from parent's persisted sets (bookmarkedIds, selectedIds, pinIds)
  useEffect(() => {
    const newActions = {}
    data.forEach((item) => {
      if (bookmarkedIds.has(item.id)) newActions[`${item.id}-bookmark`] = true
      if (selectedIds.has(item.id)) newActions[`${item.id}-share`] = true
      if (pinIds.has(item.id)) newActions[`${item.id}-pin`] = true
    })
    setActiveActions(newActions)
  }, [data, bookmarkedIds, selectedIds, pinIds])
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
    setActiveActions((prev) => {
      const newVal = !prev[key]
      const next = { ...prev, [key]: newVal }
      // Notify parent only for the share/add action so header can update selected count
      if (actionType === 'share' && typeof onShareToggle === 'function') {
        try {
          onShareToggle(itemId, newVal)
        } catch (e) {
          // swallow any errors from parent callback
        }
      }
      return next
    })
  }

    const handleBookmarkToggle = (itemId, actionType) => {
  const key = `${itemId}-${actionType}`
    setActiveActions((prev) => {
      const newVal = !prev[key]
      const next = { ...prev, [key]: newVal }
      // Notify parent only for the share/add action so header can update selected count
      if (actionType === 'bookmark' && typeof onBookmarkToggle === 'function') {
        try {
          onBookmarkToggle(itemId, newVal)
        } catch (e) {
          // swallow any errors from parent callback
        }
      }
      return next
    })
    }


    const handlePinToggle = (itemId, actionType) => {
  const key = `${itemId}-${actionType}`
    setActiveActions((prev) => {
      const newVal = !prev[key]
      const next = { ...prev, [key]: newVal }
      // Notify parent only for the share/add action so header can update selected count
      if (actionType === 'pin' && typeof onPinToggle === 'function') {
        try {
          onPinToggle(itemId, newVal)
        } catch (e) {
          // swallow any errors from parent callback
        }
      }
      return next
    })
    }

  return (
    // make this a column container and limit its height so only the table body scrolls
  <div className='flex-1 bg-white rounded-lg shadow-sm flex flex-col max-h-[calc(100vh-130px)] md:max-h-[calc(100vh-200px)]'>
      {/* Desktop Table Header */}
      <div className='hidden md:grid md:grid-cols-12 gap-4 px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 font-bold text-lg md:text-xl bg-gray-50 text-blue-900'>
        <div className='col-span-5'>New Releases ({data.length})</div>
        <div className='col-span-3'>Range</div>
        <div className='col-span-1'>Unit</div>
        <div className='col-span-1 text-center'>Coverage</div>
        <div className='col-span-2 text-center'>Actions</div>
      </div>

      {/* Mobile Table Header */}
      <div className='md:hidden px-4 py-3 border-b border-gray-200 font-bold text-lg bg-gray-50 text-blue-900'>
        <div>New Releases ({data.length})</div>
      </div>

      {/* Table Body - scrollable area */}
  <div id='product-table-body' className='divide-y divide-gray-200 overflow-auto flex-1'>
        {paginatedData.map((item) => (
          <div
            key={item.id}
            className={`hidden md:grid md:grid-cols-12 gap-4 px-4 md:px-6 py-4 transition items-center text-sm ${activeActions[`${item.id}-share`] ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
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
                onClick={() => handleBookmarkToggle(item.id, 'bookmark')}
                className={`p-1.5 rounded transition border ${activeActions[`${item.id}-bookmark`] ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-400 hover:bg-gray-200 text-gray-600'}`}
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
                onClick={() => handlePinToggle(item.id, 'pin')}
                className={`p-1.5 rounded transition border ${activeActions[`${item.id}-pin`] ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 text-gray-600'}`}
                title='Pin'>
                <Pin size={18} className={`rotate-320 ${activeActions[`${item.id}-pin`] ? 'font-bold' : ''}`} strokeWidth={activeActions[`${item.id}-pin`] ? 3 : 1.5} />
              </button>
              <button className='p-1.5 hover:bg-gray-200 rounded transition text-gray-600' title='More'>
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        ))}

        {/* Mobile Card Layout */}
        <div className='md:hidden divide-y divide-gray-200'>
          {paginatedData.map((item) => (
            <div
              key={item.id}
              className={`p-4 transition ${activeActions[`${item.id}-share`] ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              {/* Title & Category */}
              <div className='mb-3'>
                <p className='font-medium text-gray-900 text-sm'>{item.title}</p>
                <p className='text-xs text-blue-600 mt-1 bg-blue-100 w-fit px-2 py-1 rounded'>{item.category}</p>
              </div>

              {/* Range & Frequency */}
              <div className='grid grid-cols-2 gap-3 mb-3 text-xs'>
                <div>
                  <p className='text-gray-600 font-medium'>Range</p>
                  <p className='text-gray-900 font-medium'>{item.range}</p>
                </div>
                <div>
                  <p className='text-gray-600 font-medium'>Frequency</p>
                  <p className='text-gray-900 font-medium'>{item.frequency}</p>
                </div>
              </div>

              {/* Unit & Coverage */}
              <div className='grid grid-cols-2 gap-3 mb-3 text-xs'>
                <div>
                  <p className='text-gray-600 font-medium'>Unit</p>
                  <p className='text-gray-900 font-medium'>{item.unit}</p>
                </div>
                <div>
                  <p className='text-gray-600 font-medium'>Coverage</p>
                  <div className='flex gap-1 mt-1'>
                    {item.coverage.map((cov, idx) => (
                      <span key={idx} className={`px-2 py-1 rounded text-xs font-medium ${getCoverageColor(cov)}`}>
                        {cov}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className='flex gap-2 justify-center pt-2 border-t border-gray-200'>
                <button 
                  onClick={() => handleBookmarkToggle(item.id, 'bookmark')}
                  className={`flex-1 p-2 rounded transition border flex items-center justify-center gap-1 text-xs ${activeActions[`${item.id}-bookmark`] ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-400 hover:bg-gray-200 text-gray-600'}`}
                  title='Bookmark'>
                  <BookmarkMinus size={16} strokeWidth={activeActions[`${item.id}-bookmark`] ? 3 : 1.5} />
                  {/* <span>Bookmark</span> */}
                </button>
                <button 
                  onClick={() => toggleAction(item.id, 'share')}
                  className={`flex-1 p-2 rounded transition border flex items-center justify-center gap-1 text-xs ${activeActions[`${item.id}-share`] ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-400 hover:bg-gray-200 text-gray-600'}`}
                  title='Share'>
                  <Plus size={16} strokeWidth={activeActions[`${item.id}-share`] ? 3 : 1.5} />
                  {/* <span>Share</span> */}
                </button>
                <button 
                  onClick={() => handlePinToggle(item.id, 'pin')}
                  className={`flex-1 p-2 rounded transition border flex items-center justify-center gap-1 text-xs ${activeActions[`${item.id}-pin`] ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-400 hover:bg-gray-200 text-gray-600'}`}
                  title='Pin'>
                  <Pin size={16} className='rotate-320' strokeWidth={activeActions[`${item.id}-pin`] ? 3 : 1.5} />
                  {/* <span>Pin</span> */}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className='flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 bg-gray-50 gap-3 md:gap-0'>
        <p className='text-xs md:text-sm text-gray-600'>
          Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length}
        </p>
        <div className='flex gap-1 md:gap-2 flex-wrap justify-center md:justify-start'>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition'>
            Previous
          </button>
          <div className='flex items-center gap-1 md:gap-2'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-2 md:px-3 py-1 md:py-2 rounded text-xs md:text-sm font-medium transition ${
                  currentPage === page
                    ? 'bg-gray-300 text-black'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}>
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition'>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductTable