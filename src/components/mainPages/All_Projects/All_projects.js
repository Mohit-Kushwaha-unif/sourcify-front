import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { get_listing } from '../../../services/listing'
import Cat_Sidebar from '../../headers/Cat_Sidebar'
import SubHeader from '../../headers/Sub-Header'

const All_projects = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [lisitngs,setAllLisitngs] = useState([])
    const [filterCategory,setFilterCategory] = useState([])
    useEffect(()=>{
        setFilterCategory(location?.state)

        dispatch(get_listing(location?.state)).then((res)=>{
          var data = []
            res.map((list_details)=>{
              if(list_details.status ==0){
                data.push(list_details)
              }
            })
            setAllLisitngs(data)
        })
    },[location])
    const filterValues=(filter_category)=>{
        dispatch(get_listing(filter_category)).then((res)=>{
          var data = []
          res.map((list_details)=>{
            if(list_details.status ==0){
              data.push(list_details)
            }
          })
            setAllLisitngs(data)
        })
         setFilterCategory(filter_category)
    }
  return (
    <>
    <div className='grid grid-cols-6'>
        <div className='col-span-1 h-full'>
     <Cat_Sidebar filterValue = {filterValues} />
     </div>
     <div className='p-6 col-span-5'><div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {
            lisitngs.length > 0 ? lisitngs.map((res)=>{
                // console.log(res)
               return <div className='grid grid-cols-3 rounded-lg border-2 min-h-60  max-h-60 rounded-[25px] shadow-gray-50  '> 
               <div className='col-span-1 '> 
                <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="User image" class="w-full h-60"/>

               </div>
                <div class="bg-white w-full col-span-2 shadow p-4 h-60">
                <h2 class="text-lg font-medium mt-4">{res.project_discription}</h2>
                <p class="text-gray-600">{res.project_scope}</p>
                <div class="mt-4 flex items-center">
                <div class=" wrap md:px-6 pt-4 pb-2">
        {
          res.wok_segment.map((work)=>{
           return <span class="inline-block wrap bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{work}</span>
          })
        }
       </div>
                  
                </div>
              </div>
              </div>
            }):
            <div class="flex justify-center  h-screen">
  <div class="text-center">
    <h2 class="text-xl font-medium mb-2">No data found</h2>
    <p class="text-gray-500">There is no data to display for {filterCategory} .</p>
  </div>
</div>
        }
   
  </div>
  </div>
  </div>
    </>
  )
}

export default All_projects