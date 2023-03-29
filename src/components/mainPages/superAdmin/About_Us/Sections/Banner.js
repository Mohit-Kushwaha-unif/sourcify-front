import { Button, Form, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import state_cites from '../../../../../assests/state_city.'
import { MinusCircleOutlined } from '@ant-design/icons';
import { add_about, get_about, update_about } from '../../../../../services/About'
import { get_slug } from '../../../../../services/Slug'

const Banner = () => {
    const dispatch = useDispatch()
    const [bannerImg,setBannerImg] = useState()
    const [showImg,setShowImg] = useState(false)
    const [formInitialVal,setInitialValues] = useState([])
    const [options,setOptions] = useState([])
    const [About_us, SetAboutUs] = useState([])
    const onFinish = (formValue) => {
        formValue.banner_img = bannerImg
        var formData = new FormData()
        Object.keys(formValue).map((formKey)=>{
           
            formData.append(formKey, formValue[formKey])
        })
        // console.log()
        if(About_us.length == 0)
       { dispatch(add_about(formData)).then((res)=>{
            // console.group(res)
            localStorage.setItem("AboutUs",res._id)
        })}
        else{
            formData.append("id", localStorage.getItem("AboutUs"))
            dispatch(update_about(formData)).then((res)=>{
                // console.group(res)
                // localStorage.setItem("AboutUs",res._id)
            })
        }
     }
     function fileHandler(e){
        setBannerImg(e.target.files[0])
     }
     useEffect(()=>{
       
      var obj={}
      var data =[]
      var optionSet =[]
          dispatch(get_about()).then((res) => {
            SetAboutUs(res)
           res[0].Banner?.map((formVal)=>{
            obj["name"] = "baner_title"
            obj["value"] = formVal.title
            data.push(obj)
            obj ={}
            obj["name"] = "banner_Sub_title"
            obj["value"] = formVal.sub_title
            data.push(obj)
            obj ={}
            obj["name"] = "banner_btn"
            obj["value"] = formVal.button
            data.push(obj)
            obj ={}
            obj["name"] = "banner_btn_link"
            obj["value"] = formVal.buttonLink
            data.push(obj)
            if(formVal.image){
            
             setShowImg(formVal.image)
            }
            
         })
          })
          dispatch(get_slug()).then((res)=>{
            console.log(res[0].slugs)
            optionSet.push(...res[0].slugs)
          })
       
        setOptions(optionSet)
        
        setInitialValues(data)
     },[])
     console.log({options});
     options.map((opt)=>{
        console.log({opt})
     })
    return (
        <div className='bg-white p-3 rounded-xl '>
            <Form
                labelCol={{
                    span: 37,
                }}
                wrapperCol={{
                    span: 44,
                }}
                layout="vertical"

                size="default"
                fields={[...formInitialVal]}

                labelAlign="left"
                scrollToFirstError={true}
                onFinish={onFinish}
                autoComplete="off"
                className='container'
            >
                {/**************  Title of Banner *************/}
                <Form.Item name="baner_title" label="Title of Banner" rules={[
                    {
                        required: true,
                        message: 'Please input your Entity Name!',
                    },
                ]}>
                    <Input placeholder='Enter the title of banner' />
                </Form.Item>
                {/*******************************************/}

                {/**************  Banner Sub Title *************/}
                <Form.Item name="banner_Sub_title" label="Banner Sub Title" rules={[
                    {
                        required: true,
                        message: 'Please select your Work Segment!'
                    },
                ]}>
                    <Input placeholder='Enter the sub title of banner' />

                </Form.Item>
                {/*******************************************/}

                {/*****************Email*******************/}

                {showImg!=false?
                <>
                <p>Banner Image</p>
                <div className='flex '>
                <img className='w-80 h-80 mr-4' src= {showImg} />
                <MinusCircleOutlined className='cursor-pointer' onClick={()=>setShowImg(false)}/>
                </div> 
                </>
                :<Form.Item name="banner_img" label="Banner Image " rules={[
                    {
                        required: true,
                        message: 'Please input your Email!'
                    },
                ]} wrapperCol={{
                    span: 56,
                }}>

                    <input type="file" onChange={fileHandler} placeholder='Enter your Email ID ' />



                </Form.Item>}

                {/*******************************************/}

                {/************Mobile Number****************/}
                <div className='form_flex_children'>
                    <Form.Item name="banner_btn" label="Banner Button Name " rules={[
                        {
                            required: true,
                            message: 'Please input your Mobile Number!'
                        },
                    ]}>
                        <Input  placeholder='Enter the Banner Button' />
                    </Form.Item>
                </div>
                {/*******************************************/}

                <Form.Item name="banner_btn_link" label="Select the Link for Banner Button" rules={[
                    {
                        required: true,
                        message: 'Please input your Address!',
                    },
                ]}>
                    <Select >
                    {options.map((opt) => {
                    return (<Select.Option value={opt}>{opt}</Select.Option>)
                  }
                  )}
                       
                    </Select>
                </Form.Item>
                <button
              type="submit"
              className="primary_btn">
                Save
                
             
            </button>
            </Form>
        </div>
    )
}

export default Banner