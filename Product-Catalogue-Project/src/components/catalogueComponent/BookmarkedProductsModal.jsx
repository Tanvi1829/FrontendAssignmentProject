import React from 'react'
import { X } from 'lucide-react'

const BookmarkedProductsModal = ({ isOpen, onClose, bookmarkedProducts }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 bg-opacity-50 backdrop-blur-xs p-0">
      <div className="bg-white rounded-t-lg md:rounded-lg shadow-lg w-full md:max-w-2xl md:w-full mx-0 md:mx-4 max-h-[90vh] md:max-h-[80vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-[#2b0b66] text-white px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shrink-0">
          <h2 className="text-lg md:text-xl font-bold">Saved Products ({bookmarkedProducts.length})</h2>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 rounded-md transition shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 flex-1 overflow-y-auto">
          {bookmarkedProducts.length === 0 ? (
            <p className="text-center text-gray-500 py-8 text-sm md:text-base">No bookmarked products yet</p>
          ) : (
            <div className="space-y-2 md:space-y-3">
              {bookmarkedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base break-words">{product.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-xs md:text-sm">
                      <p className="text-gray-600">Category: <span className="font-medium">{product.category}</span></p>
                      <p className="text-gray-600">Range: <span className="font-medium">{product.range}</span></p>
                      <p className="text-gray-600">Frequency: <span className="font-medium">{product.frequency}</span></p>
                      <p className="text-gray-600">Unit: <span className="font-medium">{product.unit}</span></p>
                      {product.coverage && (
                        <p className="text-gray-600">Coverage: <span className="font-medium">{product.coverage}</span></p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookmarkedProductsModal