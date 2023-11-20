import React, { useEffect, useState } from 'react'
import { Tabs, } from 'antd'
import Edit_category from './Edit_category'
import TabPane from 'antd/es/tabs/TabPane'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { get_category_by_id } from '../../../../../services/category'
import Loader from '../../../../Helper/Loader'
const Tab = () => {
  const location = useLocation(state => state)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(1)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    dispatch(get_category_by_id(location.state._id)).then((res) => {
      setLoading(false)
      setFormData(res)
    })
  }, [])

  return (
    <>
      {
        loading ? <Loader /> :
          <div className='flex align-center ml-30 w-full p-2 px-3'>

            <Tabs centered defaultActiveKey="1" className='w-full'>
              <TabPane tab="Work Segment Details" key="1" >
                <Edit_category formValues={formData} />
              </TabPane>
            </Tabs>


          </div>
      }
    </>

  )
}

export default Tab