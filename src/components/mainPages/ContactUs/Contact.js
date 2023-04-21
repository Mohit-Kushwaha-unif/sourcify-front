import { Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { add_feedback } from '../../../services/FeedBack'



const Contact = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    function feedBackHandler(value) {
        (
            dispatch(add_feedback(value)).then((res) => {
                setShowMsg(true)
                form.resetFields()

            })
        )
    }
    const [showMsg, setShowMsg] = useState(false)
    return (
        <div className='container'>
            <h2 className='prime_h2_rale font_62 mb-12'>Contact Us</h2>
            <div className='grid grid-cols-1 md:grid-cols-7  md:gap-x-6 gap-y-6 '>
                <div className='border-2 col-span-5 p-6 rounded-[6px]'>
                    <p className='mr-5 pr-10'>Have a question or need assistance? Contact us today and our team will be happy to help.
                    </p>
                    <div className='feedback_form pb-6 '>
                        <div className=" h-auto pt-5 w-full my-auto col-span-2  ">
                            <Form labelAlign="left"
                                form={form}
                                onFinish={feedBackHandler}
                                layout="vertical" >
                                <div className='grid mb-3 grid-cols-1 gap-8 md:grid-cols-2'>
                                    <Form.Item name="fullname" rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your Full Name'
                                        },
                                    ]}
                                        className="mb-1"
                                    >

                                        <Input className='input_border' placeholder='Enter your full name' />
                                    </Form.Item>
                                    <Form.Item name='company_name' className='mb-1 mt-0' rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your Company Name'
                                        },
                                    ]}
                                    >

                                        <Input className='input_border' placeholder='Enter your company name' />
                                    </Form.Item>
                                </div>
                                <div className='grid  mb-3 grid-cols-1 gap-8 md:grid-cols-2'>
                                    <Form.Item name='mobile_number' className='mb-1 mt-0' rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your Mobile Number'
                                        },
                                    ]}
                                    >

                                        <Input className='input_border' placeholder='Enter your mobile number' />
                                    </Form.Item>
                                    <Form.Item name='email' className='mb-1 mt-0' rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your Email ID'
                                        },
                                    ]}
                                    >

                                        <Input type='email' className='input_border' placeholder='Enter your email address' />
                                    </Form.Item>
                                </div>

                                <Form.Item name='Message' className='mb-1 mt-0' rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your Message'
                                    },
                                ]}
                                >

                                    <TextArea row={4} cols={100} className='input_border height_135' placeholder="Your message" />
                                </Form.Item>


                                <div className="text-center lg:text-left mt-2 md:float-right">
                                    <button
                                        type="submit"
                                        className="primary_btn inline-block px-7 py-3 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#FF5759] rounded-[50px] hover:shadow-lg focus:bg-[#FF5757] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FF5757] active:shadow-lg transition duration-150 ease-in-out"
                                    >

                                        Send
                                    </button>

                                </div>
                                {showMsg && <p className='text-base mr-4 text-[#FF5757]'>Your response has been
                                    successfully submitted,
                                    Our team will get back to you soon</p>}
                            </Form>
                        </div>
                    </div>
                </div>
                <div className='col-span-2 p-6 py-12 bg-[#023047] rounded-[6px]'>
                   <h3 className='mb-3 white_h3'>Write us</h3>
                   <p className='mb-5 white_p'>info@sourcify.in</p>
                   <h3 className='mb-8 white_h3'>Connect with us</h3>
                   <h3 className='mb-8 white_h3'>Reach us</h3>
                </div>
                <div>
                </div>
            </div>

        </div>
    )
}

export default Contact