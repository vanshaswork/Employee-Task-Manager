import React, { useEffect } from 'react'
import DatepickerLib from 'flowbite-datepicker/DateRangePicker'

const Datepicker = () => {
  useEffect(() => {
    const start = document.getElementById('datepicker-range-start')
    const end = document.getElementById('datepicker-range-end')

    // Initialize Flowbite Date Range Picker
    new DatepickerLib(start, {
      autohide: true
    })
    new DatepickerLib(end, {
      autohide: true
    })
  }, [])

  return (
    <div className="flex items-center" date-rangepicker id="date-range-picker">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          id="datepicker-range-start"
          name="start"
          type="text"
          placeholder="Select date start"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ps-10 p-2.5"
        />
      </div>
      <span className="mx-4 text-gray-500">to</span>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          id="datepicker-range-end"
          name="end"
          type="text"
          placeholder="Select date end"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ps-10 p-2.5"
        />
      </div>
    </div>
  )
}

export default Datepicker
