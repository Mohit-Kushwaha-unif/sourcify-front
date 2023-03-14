import React, { useState } from "react";

const  FilterDropdown=({ options, onSelectFilter })=> {
  return (
    <div>
      <label className="block text-gray-700 font-bold mb-2">
        Filter by:
      </label>
      <div className="relative">
        <select
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={(e) => onSelectFilter(e.target.value)}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 0 0-1.414 1.414L9.586 13H3a1 1 0 1 0 0 2h6.586l-4.707 4.707a1 1 0 1 0 1.414 1.414L13.414 14a1 1 0 0 0 0-1.414l-7.121-7.293z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default  FilterDropdown