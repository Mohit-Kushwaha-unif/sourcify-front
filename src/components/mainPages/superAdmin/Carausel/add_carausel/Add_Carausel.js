import { Button, Form, Input } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { add_carausel } from '../../../../../services/Carausle'

const Add_Carausel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [carausel_Img, setCarausel_img] = useState()
  const FormHandler = (values) => {
    var fromValue = new FormData()
    fromValue.append("legend", values.legend)
    fromValue.append("legend_image", carausel_Img)
    dispatch(add_carausel(fromValue)).then(res => {
      console.log(res)
      navigate('/admin/category-list')
    })
  }
  function caraouse_image(e) {
    setCarausel_img(e.target.files[0])
  }
  return (
    <div className='flex h-auto align-center ml-30 w-full p-2 px-3 '>
      <div className='pt-7 px-7 h-auto w-full bg-white p-3 rounded-xl '>
        <h1 className='mb-3'>Enter Slide Details</h1>
        <Form labelAlign="left"

          layout="vertical" onFinish={FormHandler}>
          <Form.Item name="legend" label="Title of Image " rules={[
            {
              required: true,
              message: 'Please input your Bank Overdraft Limit'
            },
          ]}
            className="mb-1"
          >

            <Input placeholder='Enter Title  of Image' />
          </Form.Item>

          <Form.Item name='legend_image' className='mb-1 mt-0' label="Contact Person Name" rules={[
            {
              required: true,
              message: 'Please input your Contact Person Name'
            },
          ]}
          >

            <Input placeholder='Enter Contact Person Name' type='file' onChange={caraouse_image} />
          </Form.Item>
          <Button className='form_button mt-3' type="primary" htmlType="submit">
            SAVE
          </Button>
        </Form>
      </div>
    </div>

  )
}

export default Add_Carausel