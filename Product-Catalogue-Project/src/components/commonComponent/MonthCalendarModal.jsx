import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const MonthCalendarModal = ({ isOpen, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  if (!isOpen) return null

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, () => null)

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleSelectDate = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(newDate)
  }

  const handleApply = () => {
    console.log('Selected date:', selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
    onClose()
  }

  const isToday = (day) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (day) => {
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    )
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-xs bg-opacity-50 p-4 md:p-0">
      <div className="bg-white rounded-t-lg md:rounded-lg shadow-lg p-4 md:p-6 w-full md:max-w-sm md:w-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-base md:text-lg font-bold text-gray-800">Select Date</h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-1 rounded-md transition shrink-0"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 rounded-md transition"
          >
            <ChevronLeft size={18} className="md:w-5 md:h-5" />
          </button>
          <h3 className="text-base md:text-lg font-semibold text-gray-800 min-w-max">{monthName}</h3>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 rounded-md transition"
          >
            <ChevronRight size={18} className="md:w-5 md:h-5" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 md:mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs md:text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-4 md:mb-6">
          {emptyDays.map((_, idx) => (
            <div key={`empty-${idx}`} className="aspect-square" />
          ))}
          {days.map((day) => (
            <button
              key={day}
              onClick={() => handleSelectDate(day)}
              className={`aspect-square rounded-lg text-xs md:text-sm font-medium transition ${
                isSelected(day)
                  ? 'bg-blue-950 text-white'
                  : isToday(day)
                  ? 'bg-blue-100 text-blue-900 border-2 border-blue-950'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Selected Date Display */}
        <div className="mb-4 md:mb-6 p-3 bg-gray-50 rounded-lg text-center">
          <p className="text-xs md:text-sm text-gray-600">Selected:</p>
          <p className="text-sm md:text-lg font-semibold text-gray-800">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 md:gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-3 md:px-4 py-2 text-xs md:text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-3 md:px-4 py-2 text-xs md:text-sm bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default MonthCalendarModal