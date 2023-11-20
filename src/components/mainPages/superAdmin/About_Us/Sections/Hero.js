import { Form, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_about, update_about } from '../../../../../services/About'
import { MinusCircleOutlined } from '@ant-design/icons';
import { get_slug } from '../../../../../services/Slug'
const Hero = () => {

    const dispatch = useDispatch()
    const [bannerImg, setBannerImg] = useState()
    const [showImg, setShowImg] = useState(false)
    const [formInitialVal, setInitialValues] = useState([])
    const [options, setOptions] = useState([])
    // console.log( About_us[0].Banner[0] )
    const onFinish = (formValue) => {
        formValue.hero_img = bannerImg
        formValue.id = localStorage.getItem("AboutUs")
        var formData = new FormData()
        Object.keys(formValue).map((formKey) => {

            formData.append(formKey, formValue[formKey])
        })

        dispatch(update_about(formData)).then((res) => {
            // console.group(res)
            // localStorage.setItem("AboutUs",res._id)
        })

    }
    function fileHandler(e) {
        setBannerImg(e.target.files[0])
    }
    useEffect(() => {
        var obj = {}
        var data = []
        var optionSet = []

        dispatch(get_about()).then((res) => {
            res[0].Hero.length > 0 && res[0]?.Hero.map((formVal) => {
                obj["name"] = "hero_title"
                obj["value"] = formVal.title
                data.push(obj)
                obj = {}
                obj["name"] = "hero_quote"
                obj["value"] = formVal.qutoe
                data.push(obj)
                obj = {}
                obj["name"] = "hero_desc"
                obj["value"] = formVal.description
                data.push(obj)
                obj = {}
                obj["name"] = "hero_qutoe_emp"
                obj["value"] = formVal.quto_emph
                data.push(obj)
                obj = {}
                obj["name"] = "hero_btn"
                obj["value"] = formVal.button
                data.push(obj)
                obj = {}
                obj["name"] = "hero_btn_link"
                obj["value"] = formVal.buttonLink
                data.push(obj)
                if (formVal.image) {
                    setShowImg(formVal.image)
                }

            })

        })
        dispatch(get_slug()).then((res) => {
            console.log(res[0].slugs)
            optionSet.push(...res[0].slugs)
        })

        setOptions(optionSet)
        // console.log(About_us)


        setInitialValues(data)
    }, [])
    console.log(formInitialVal)
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
                <Form.Item name="hero_quote" label="Enter the  Small Heading" rules={[
                    {
                        required: true,
                        message: 'Enter the  Small Heading!',
                    },
                ]}>
                    <Input placeholder='Enter the  Small Heading' />
                </Form.Item>
                {/*******************************************/}

                {/**************  Banner Sub Title *************/}
                <Form.Item name="hero_qutoe_emp" label="Enter the word you want to empasize" rules={[
                    {
                        required: true,
                        message: 'Enter the word you want to empasize!'
                    },
                ]}>
                    <Input placeholder='Enter the word you want to empasize' />

                </Form.Item>
                {/*******************************************/}

                {/*****************Email*******************/}

                <Form.Item name="hero_title" label="Title " rules={[
                    {
                        required: true,
                        message: 'Enter the Title !'
                    },
                ]}>
                    <Input placeholder='Enter the Title' />

                </Form.Item>
                <Form.Item name="hero_desc" label="Description " rules={[
                    {
                        required: true,
                        message: 'Enter the Description !'
                    },
                ]}>
                    <TextArea placeholder='Enter the Description' />

                </Form.Item>
                {showImg != false ?
                    <>
                        <p>Banner Image</p>
                        <div className='flex'>
                            <img className='w-80 h-80 mr-4' src={showImg} />
                            <MinusCircleOutlined className='cursor-pointer' onClick={() => setShowImg(false)} />
                        </div>
                    </>
                    : <Form.Item name="hero_img" label=" Image " rules={[
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
                    <Form.Item name="hero_btn" label=" Button Name " rules={[
                        {
                            required: true,
                            message: 'Please input your Mobile Number!'
                        },
                    ]}>
                        <Input placeholder='Enter the Banner Button' />
                    </Form.Item>
                </div>
                {/*******************************************/}

                <Form.Item name="hero_btn_link" label="Select the Link for  Button" rules={[
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
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    Save


                </button>
            </Form>
        </div>
    )
}

export default Hero