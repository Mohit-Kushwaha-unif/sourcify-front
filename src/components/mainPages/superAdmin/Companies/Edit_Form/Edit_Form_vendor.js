import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Personal_Detail_Tab from './Personal_Detail_Tab';
import { get_Vendor_by_id } from '../../../../../services/Vendor';
import Loader from '../../../../Helper/Loader';
const Edit_Form = () => {
  const location = useLocation(state => state)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(1)
  const [activeTab, setActiveTab] = useState("1")
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    dispatch(get_Vendor_by_id(location.state._id)).then((res) => {
      setLoading(false)
      setFormData(res)
    })

  }, [])
  function tabKeys(valueOfTab) {

    setActiveTab(valueOfTab)
  }



  return (
    <>
      {loading ? <Loader /> : <div className='w-full container mt-5'>
        {
          formData !== 1 &&
          <Personal_Detail_Tab formValues={formData} isClicked={tabKeys} />

        }

      </div>}
    </>
  )
}

export default Edit_Form