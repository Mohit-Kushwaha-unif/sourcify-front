import React from 'react'
import { useNavigate } from 'react-router-dom'

const ListingCard = () => {
  const navigator = useNavigate()
  const handleClick = () => {
    navigator('/dashboard/listing-form')
  }
  return (
    <div><div class="bg-white rounded-lg shadow-lg p-6 m-3">
      <h2 class="text-lg font-medium mb-4 cursor-pointer" onClick={handleClick}>Add your First Project</h2>
      <p class="text-gray-600">Click to add the project to add your project/list</p>
    </div>
    </div>
  )
}

export default ListingCard