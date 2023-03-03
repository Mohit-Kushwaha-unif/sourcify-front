import { Table, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { get_listing } from '../../../../services/listing'
import All_Listings from './Tabs/All_Listings'
import Approved_listing from './Tabs/Approved_listing'
import Moderation_listings from './Tabs/moderation_listings'
import Rejected_Listing from './Tabs/Rejected'

const Listing = () => {
    
    const [activeTab,setActiveTab] = useState("1")
 
      function tabKeys(valueOfTab){

        setActiveTab(valueOfTab)
      }
 
  return (
    <div className='flex align-center ml-30 w-full p-2 px-3'>
    {
         <Tabs centered defaultActiveKey="1" onChange={tabKeys} activeKey={activeTab}  className='w-full'>
         <TabPane  tab="All Listings" key="1" >
          <All_Listings  isClicked = {tabKeys}/>
        </TabPane>
        <TabPane tab="Moderation Listing" key="2">
         < Moderation_listings  isClicked={tabKeys}/>
        </TabPane>
        <TabPane tab="Approved Listing" key="3">
         <Approved_listing />
        </TabPane>
        <TabPane tab="Rejected Listing" key="4">
         <Rejected_Listing />
        </TabPane>
      </Tabs>
    }
    </div>
  )
}

export default Listing