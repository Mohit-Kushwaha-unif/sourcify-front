import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Personal_Detail_Tab from './Personal_Detail_Tab';
import { get_Vendor_by_id } from '../../../../../services/Vendor';
const Edit_Form = () => {
    const location = useLocation(state=>state)
    const dispatch = useDispatch()
    const [formData,setFormData]= useState(1)
    const [activeTab,setActiveTab] = useState("1")
    useEffect(()=>{
        dispatch(get_Vendor_by_id(location.state._id)).then((res)=>{
            console.log(res);
                setFormData(res)
            })
    },[])
      function tabKeys(valueOfTab){

        setActiveTab(valueOfTab)
      }
 

      
  return (
    <div className='flex align-center ml-30 w-full p-2 px-3'>
        {
            formData!==1 &&  <Tabs centered defaultActiveKey="1" onChange={tabKeys} activeKey={activeTab}  className='w-full'>
             <TabPane  tab="Basic Details" key="1" >
              <Personal_Detail_Tab formValues = {formData} isClicked = {tabKeys}/>
            </TabPane>
          </Tabs>
        }
   
    </div>
  )
}

export default Edit_Form