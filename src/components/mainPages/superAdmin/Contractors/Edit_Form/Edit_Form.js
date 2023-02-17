import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Personal_Detail_Tab from './Personal_Detail_Tab';
import * as Contact_Service from '../../../../../services/contractor'
import Work_Experiece from './Work_Experiece';
import FinancialDetail from './FinancialDetail';
const Edit_Form = () => {
    const location = useLocation(state=>state)
    const dispatch = useDispatch()
    const [formData,setFormData]= useState(1)
    const [activeTab,setActiveTab] = useState("1")
    useEffect(()=>{
        dispatch(Contact_Service.get_contractorBy_id(location.state._id)).then((res)=>{
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
            <TabPane tab="Work Experience" key="2">
             <Work_Experiece formValues = {formData} isClicked={tabKeys}/>
            </TabPane>
            <TabPane tab="Financial details" key="3">
             <FinancialDetail formValues = {formData}/>
            </TabPane>
          </Tabs>
        }
   
    </div>
  )
}

export default Edit_Form