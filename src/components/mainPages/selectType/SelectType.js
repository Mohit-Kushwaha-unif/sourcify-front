import React from 'react'
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
const SelectType = ({employee_route_value}) => {
    const navigation = useNavigate()
  return (
    <>
      <Space className='type_employee' direction="Horizontal" >
        <Space wrap>
          <Button className='form_button' type="primary" shape="round"   onClick={()=>navigation("/contractor-form")}icon={<ArrowRightOutlined />} size="large">
            Freelancer
          </Button>
        </Space>
        <Space wrap>
          <Button className='form_button' type="primary"  shape="round"  onClick={()=>navigation("/vendor-form")}icon={<ArrowRightOutlined />} size="large">
            Employer
          </Button>
        </Space>
      </Space>
    </>
  )
}

export default SelectType