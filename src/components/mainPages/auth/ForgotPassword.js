import { Form, Input } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { forgetPassword } from '../../../services/user'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = (val) => {
        passwordHandler(val.email)
    }
    const passwordHandler = (email) => {
        dispatch(forgetPassword({email})).then((res)=>{
           
            navigate('/passwordreset', { state: email })
        }).catch((err)=>{
            toast.error("Email doesn't exist", {
                position: toast.POSITION.TOP_RIGHT
              })
        })
       
    }
    return (
        <div className='w-auto min-h-min mt-3   justify-center py-6 sm:px-6 lg:px-8 '>
            <div className="px-8 w-auto h-full text-gray-800">
                <div
                    className="  xl:justify-center lg:justify-between justify-center items-center  h-full g-6 "
                >
                    <div className=" xl:mx-20 w-auto mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                        <div className="flex flex-col items-center justify-center lg:justify-start">
                            <h3 className='headings font_32 mb-6'>Reset your password</h3>
                            <p className='mb-5'>Enter your Sourcify.com email address so we can reset your password.</p>
                            <Form onFinish={onFinish}>
                                <Form.Item className='w-full' name={"email"} rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your email',
                                    },
                                ]}>
                                    <Input type='email' className='w-full' placeholder='Enter email' />
                                </Form.Item>
                                <Form.Item>
                                    <button htmlType='submit' className='primary_btn' >Next</button>
                                </Form.Item>
                            </Form>

                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        </div>
    )
}

export default ForgotPassword