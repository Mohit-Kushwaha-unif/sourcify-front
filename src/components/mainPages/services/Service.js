import React from 'react'

const Service = () => {
  return (
    <div className="flex flex-wrap -mx-4  p-10">
      <div className="w-full md:w-1/2 lg:w-1/3 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4">Service 1</h2>
          <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4">Service 2</h2>
          <p className="text-gray-700">Praesent dictum quam at diam sollicitudin, ac consectetur eros volutpat.</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4">Service 3</h2>
          <p className="text-gray-700">Sed feugiat elit et mi imperdiet, nec auctor mauris interdum.</p>
        </div>
      </div>
    </div>
  )
}

export default Service