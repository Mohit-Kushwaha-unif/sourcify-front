import React from 'react'
import { useNavigate } from 'react-router-dom'

const ResourceDenied = () => {
    const navigate = useNavigate()
    const naviationHnadler=()=>{
      if(localStorage.getItem('isLoggedIn') === true){
        navigate('/dashboard')
      }
      else{
        navigate('/login')
      }
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="max-w-md px-6 py-8 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Access Denied</h2>
      <p className="text-gray-600 mb-6">Sorry, you don't have permission to access this page.</p>
      <button onClick={naviationHnadler} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Go Back</button>
    </div>
  </div>
  
   
  )
}

export default ResourceDenied