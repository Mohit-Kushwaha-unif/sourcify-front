import { Form, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_about, update_about } from '../../../../../services/About'
import { MinusCircleOutlined } from '@ant-design/icons';
const Founder = () => {
    const dispatch = useDispatch()
    const [bannerImg,setBannerImg] = useState()
    const [showImg,setShowImg] = useState(false)
    const [founderformInitialVal,setfounderformInitialValues] = useState([])
    // console.log( About_us[0].Banner[0] )
    const onFinish = (formValue) => {
        formValue.founder_img = bannerImg
        formValue.id =    localStorage.getItem("AboutUs")
        var formData = new FormData()
        Object.keys(formValue).map((formKey)=>{
           
            formData.append(formKey, formValue[formKey])
        })
     
            dispatch(update_about(formData)).then((res)=>{
                // console.group(res)
                // localStorage.setItem("AboutUs",res._id)
            })

     }

    
     function fileHandler(e){
        setBannerImg(e.target.files[0])
     }
     useEffect(()=>{
        var obj ={}
        var data = []
     
     
          dispatch(get_about()).then((res) => {
            res[0].founderAbout.length > 0&& res[0]?.founderAbout.map((formVal)=>{
           obj["name"] = "founder_title"
           obj["value"] = formVal.title
           data.push(obj)
           obj={}
           obj["name"] = "founder_quote"
           obj["value"] = formVal.qutoe
           data.push(obj)
           obj ={}
           obj["name"] = "fonder_desc"
           obj["value"] = formVal.description
           data.push(obj)
           if(formVal.image){
            setShowImg(formVal.image)
           }
           
        })
          })
        // console.log(About_us)
        setfounderformInitialValues(data)
     },[])
     console.log({founderformInitialVal})
  return (
    <Form
        labelCol={{
            span: 37,
        }}
        wrapperCol={{
            span: 44,
        }}
        layout="vertical"

        size="default"
        fields={[...founderformInitialVal]}

        labelAlign="left"
        scrollToFirstError={true}
        onFinish={onFinish}
        autoComplete="off"
        className='container'
    >

        <Form.Item name="founder_quote" label="Enter the   Heading" rules={[
            {
                required: true,
                message: 'Enter the  Small Heading!',
            },
        ]}>
            <Input placeholder='Enter the   Heading' />
        </Form.Item>
      

        <Form.Item name="founder_title" label="Title " rules={[
            {
                required: true,
                message: 'Enter the Title !'
            },
        ]}>
            <Input placeholder='Enter the Title' />

        </Form.Item>
        <Form.Item name="fonder_desc" label="Description " rules={[
            {
                required: true,
                message: 'Enter the Description !'
            },
        ]}>
            <TextArea placeholder='Enter the Description' />

        </Form.Item>
        {showImg!=false?
        <>
        <p>Founder Image</p>
        <div className='flex'>
        <img className='w-80 h-80 mr-3' src= {showImg} />
        <MinusCircleOutlined className='cursor-pointer' onClick={()=>setShowImg(false)}/>
        </div>
        </>
        :<Form.Item name="founder_img" label=" Image " rules={[
            {
                required: true,
                message: 'Please input your Email!'
            },
        ]} wrapperCol={{
            span: 56,
        }}>

            <input type="file" onChange={fileHandler} placeholder='Enter your Email ID ' />



        </Form.Item>}

     
       
        <button
      type="submit"
      className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    >
        Save
        
     
    </button>
    </Form>
  )
}

export default Founder