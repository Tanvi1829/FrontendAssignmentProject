import React from 'react'
import { X } from 'lucide-react'

const BookmarkedProductsModal = ({ isOpen, onClose, bookmarkedProducts }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#2b0b66] text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Saved Products ({bookmarkedProducts.length})</h2>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 rounded-md transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {bookmarkedProducts.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No bookmarked products yet</p>
          ) : (
            <div className="space-y-3">
              {bookmarkedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">Category: {product.category}</p>
                    <p className="text-sm text-gray-600">
                      Range: <span className="font-medium">{product.range}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Frequency: <span className="font-medium">{product.frequency}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Unit: <span className="font-medium">{product.unit}</span>
                    </p>
                    {product.coverage && (
                      <p className="text-sm text-gray-600">
                        Coverage: <span className="font-medium">{product.coverage}</span>
                      </p>
                    )}
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
