import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_about, update_about } from '../../../../../services/About'
import { MinusCircleOutlined } from '@ant-design/icons';

const Form_Sec = () => {
    const dispatch = useDispatch()
    const [bannerImg,setBannerImg] = useState()
    const [showImg,setShowImg] = useState(false)
    const [founderformInitialVal,setfounderformInitialValues] = useState([])
    // console.log( About_us[0].Banner[0] )
    const onFinish = (formValue) => {
        formValue.form_img = bannerImg
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
           
           if(res[0].formImage){
            setShowImg(res[0].formImage)
           }
           
        })

     },[])
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
    labelAlign="left"
    scrollToFirstError={true}
    onFinish={onFinish}
    autoComplete="off"
    className='container'
>

    {showImg!=false?
    <>
    <p>Form Image</p>
        <div className='flex'>
    <img className='w-80 h-80 mr-4' src= {showImg}  />
    <MinusCircleOutlined className='cursor-pointer' onClick={()=>setShowImg(false)}/>
    </div>
    </>
    :<Form.Item name="form_img" label=" Image " rules={[
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

export default Form_Sec