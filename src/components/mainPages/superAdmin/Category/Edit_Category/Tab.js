import React, { useEffect, useState } from 'react'
import { Tabs, } from 'antd'
import Edit_category from './Edit_category'
import TabPane from 'antd/es/tabs/TabPane'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { get_category_by_id } from '../../../../../services/category'
const Tab = () => {
    const location = useLocation(state=>state)
    const dispatch = useDispatch()
    const [formData,setFormData]= useState(1)
    useEffect(()=>{
        console.log(location.state._id)
        dispatch(get_category_by_id(location.state._id)).then((res)=>{
            console.log(res);
                setFormData(res)
            })
    },[])
    
  return (
    <div className='flex align-center ml-30 w-full p-2 px-3'>
    
         <Tabs centered defaultActiveKey="1"   className='w-full'>
         <TabPane  tab="Work Segment Details" key="1" >
          <Edit_category formValues = {formData} />
        </TabPane>
      </Tabs>
    

</div>
  )
}

export default Tab