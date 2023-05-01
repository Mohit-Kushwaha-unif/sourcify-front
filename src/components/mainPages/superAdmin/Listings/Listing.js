import { Table, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { get_listing } from '../../../../services/listing'
import All_Listings from './Tabs/All_Listings'
import Approved_listing from './Tabs/Approved_listing'
import Under_Review_listings from './Tabs/moderation_listings'
import Rejected_Listing from './Tabs/Rejected'

const Listing = () => {
    
    const [activeTab,setActiveTab] = useState("1")
      function tabKeys(valueOfTab){

        setActiveTab(valueOfTab)
      }
 
  return (
    <div className='flex align-center ml-30 w-full p-2 px-3'>
    {
        
          <All_Listings  isClicked = {tabKeys}/>
      
  
      
    }
    </div>
  )
}

export default Listing