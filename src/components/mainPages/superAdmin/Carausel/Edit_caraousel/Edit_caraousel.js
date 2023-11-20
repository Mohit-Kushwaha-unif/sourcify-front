import { Button, Form, Input } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaMinus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { caraosuelById, get_carausel, update_carausel } from '../../../../../services/Carausle'

const Edit_caraousel = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [caraousel_data, setCarausel_Data] = useState([]);
  const [carausel_Img, setCarausel_img] = useState()
  const [Show_Img, setShow_Img] = useState(false)
  useEffect(() => {
    dispatch(caraosuelById({ carausel_id: location.state._id })).then((res) => {

      var obj = {}
      obj["name"] = "legend"
      obj["value"] = res.legend
      setCarausel_Data((prev) => [...prev, obj])
      // caraousel_data.push(obj)
      obj = {}
      obj["name"] = "legend_image"
      obj["value"] = res.legend_image
      setCarausel_img(res.legend_image)
      // caraousel_data.push(obj)
      setCarausel_Data((prev) => [...prev, obj])


    })
  }, [])


  console.log(caraousel_data)
  const FormHandler = (val) => {
    val.legend_image = carausel_Img
    val.carausel_id = location.state._id
    var formData = new FormData()
    formData.append("legend", val.legend)
    formData.append("legend_image", val.legend_image)
    formData.append("carausel_id", val.carausel_id)

    dispatch(update_carausel(formData)).then((res) => {
      console.log(res)
    })
    console.log(val)
  }
  function caraouse_image(e) {
    setCarausel_img(e.target.files[0])
  }
  return (
    <div className='flex h-auto align-center ml-30 w-full p-2 px-3 '>
      <div className='pt-7 px-7 h-auto w-full bg-white p-3 rounded-xl '>
        <h1 className='mb-3'>Enter Slide Details</h1>
        <Form labelAlign="left"
          fields={[...caraousel_data]}
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

          {!Show_Img && caraousel_data.length > 0 ?
            <div className='w-full h-96 flex'>
              <img className='w-3/4 h-full object-cover' src={caraousel_data[1].value} />
              <FaMinus className='cursor-pointer' onClick={() => setShow_Img(true)} />
            </div>
            :


            <Input placeholder='Enter Contact Person Name' type='file' onChange={caraouse_image} />
          }
          <Button className='form_button mt-3' type="primary" htmlType="submit">
            SAVE
          </Button>
        </Form>
      </div>
    </div>

  )
}

export default Edit_caraousel