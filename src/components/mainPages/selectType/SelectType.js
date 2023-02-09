import React from 'react'
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
const SelectType = ({employee_route_value}) => {
    const navigation = useNavigate()
    const getEmployeeType = (route_id)=>{
        employee_route_value({route_id})
    }
  return (
    <>
      <Space className='type_employee' direction="Horizontal" >
        <Space wrap>
          <Button type="primary" shape="round"   onClick={()=>navigation("/contractor-form")}icon={<ArrowRightOutlined />} size="large">
            Freelancer
          </Button>
        </Space>
        <Space wrap>
          <Button type="primary"  shape="round"  onClick={()=>navigation("/vendor-form")}icon={<ArrowRightOutlined />} size="large">
            Employer
          </Button>
        </Space>
      </Space>
    </>
  )
}

export default SelectType