import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { get_contractor } from '../../../services/contractor'
import SubHeader from '../../headers/Sub-Header'

const All_Contractors = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const [contractors, setAllContractors] = useState([])

  useEffect(() => {
    dispatch(get_contractor(location?.state)).then((res) => {
      setAllContractors(res)
    })
  }, [])
  const filterValues = (filter_category) => {
    dispatch(get_contractor(filter_category)).then((res) => {
      setAllContractors(res)
    })
  }
  return (
    <>
      <SubHeader filterValue={filterValues} />
      <div className='p-6'><div class="grid grid-cols-3 md:grid-cols-3 gap-4">

        {

          contractors.length > 0 && contractors.map((res) => {
            return <> <div class="col-span-2 bg-white rounded-lg shadow p-4 md:col-span-1">
              <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="User image" class="w-full h-auto md:h-60 " />
              <h2 class="text-lg font-medium mt-4 ">{res.username}</h2>
              <p class="text-gray-600">{res.Designation}</p>
              <div class="mt-4 flex items-center">
                <div class="px-6 pt-4 pb-2">
                  {
                    res.work_area.map((work) => {
                      return <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{work.work_segment}</span>
                    })
                  }
                </div>

              </div>
            </div>
            </>
          })

        }

      </div>
      </div>
    </>
  )
}

export default All_Contractors