import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { get_feedbackByid } from '../../../../services/FeedBack'

const ViewFeedback = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const [feedBack, setFeedBack] = useState([])
    useEffect(()=>{
        console.log(location.state._id)
        dispatch(get_feedbackByid(location.state._id)).then((res)=>{
            setFeedBack(res)
        })
    },[])
    console.log()
  return (
    <div className='project_details p-3 w-full'>
    <div class="bg-gray-100 py-8 px-4 ">
        <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-2xl">
            <div class="md:flex">
                <div class="w-full px-6 py-8">
                    <h2 class="text-center font-bold text-gray-700 text-2xl mb-6">FeedBack Detail</h2>
                    {!Array.isArray(feedBack) && <div  class="mb-4">
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="name">
                               Full Name
                            </label>
                            {feedBack.fullname}
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="password">
                                Email
                            </label>
                            {feedBack.email}
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="email">
                                Mobile Number
                            </label>
                            {feedBack.mobile_number}

                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="email">
                               Message
                            </label>
                            <p>{feedBack.Message}</p>

                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="email">
                               Date - (YYYY-MM-DD)
                            </label>
                            {feedBack.createdAt.split('T')[0]}

                            {/* {console.log(formValues.listing[0].project_bill_qty_image)} */}
                        </div>
                     
                   
                 
                    </div>}
                 
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default ViewFeedback