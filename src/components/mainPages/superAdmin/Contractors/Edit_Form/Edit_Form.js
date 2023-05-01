import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Personal_Detail_Tab from './Personal_Detail_Tab';
import * as Contact_Service from '../../../../../services/contractor'
import Loader from '../../../../Helper/Loader';
const Edit_Form = () => {
    const location = useLocation(state=>state)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [formData,setFormData]= useState(1)
    const [activeTab,setActiveTab] = useState("1")
    useEffect(()=>{
      setLoading(true)
        dispatch(Contact_Service.get_contractorBy_id(location.state._id)).then((res)=>{
                setFormData(res)
                setLoading(false)
            })
    },[])
      function tabKeys(valueOfTab){
        setActiveTab(valueOfTab)
        return false
      }
 
      console.log({activeTab})
      
  return (
    <>
    {
      loading? <Loader/> :
      <div className='w-full container mt-5 '>
      {
          formData!==1 &&  
            <Personal_Detail_Tab formValues = {formData}  isClicked = {tabKeys}/>
          
          
       
      }
 
  </div>
}
    </>
   
  )
}

export default Edit_Form