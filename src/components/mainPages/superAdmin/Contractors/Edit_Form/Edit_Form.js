import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Personal_Detail_Tab from './Personal_Detail_Tab';
import * as Contact_Service from '../../../../../services/contractor'
const Edit_Form = () => {
    const location = useLocation(state=>state)
    const dispatch = useDispatch()
    const [formData,setFormData]= useState(1)
    const [activeTab,setActiveTab] = useState("1")
    useEffect(()=>{
        dispatch(Contact_Service.get_contractorBy_id(location.state._id)).then((res)=>{
            console.log(location.state._id);
                setFormData(res)
            })
    },[])
      function tabKeys(valueOfTab){
        console.log({valueOfTab})
        setActiveTab(valueOfTab)
        return false
      }
 
      console.log({activeTab})
      
  return (
    <div className='w-full container mt-5 '>
        {
            formData!==1 &&  
              <Personal_Detail_Tab formValues = {formData}  isClicked = {tabKeys}/>
            
            
         
        }
   
    </div>
  )
}

export default Edit_Form