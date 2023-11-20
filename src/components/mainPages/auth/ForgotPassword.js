import { Form, Input } from 'antd'
import React from 'react'
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
        dispatch(forgetPassword({ email })).then((res) => {

            navigate('/passwordreset', { state: email })
        }).catch((err) => {
            toast.error("Email doesn't exist", {
                position: toast.POSITION.TOP_RIGHT
            })
        })

    }
    return (
        <section className=" mb-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8" >
            <div className="md:px-8 h-full  ">
                <div
                    className="flex  justify-center  flex-wrap h-full g-6 "
                >
                    <div className="card h-[400px]">
                        <h3 className='headings font_32 mb-6 mt-10'>Reset your password</h3>
                        <p className='mb-5'>Enter your email and we'll send a link to reset your password.</p>
                        <Form onFinish={onFinish}>
                            <Form.Item className='w-full ' name={"email"} rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email',
                                },
                            ]}>
                                <Input type='email ' className='w-full input_border mb-8' placeholder='Enter email' />
                            </Form.Item>
                            <Form.Item className='w-full '>
                                <div className='w-full'>
                                    <button htmlType='submit' className='brand_button w-full' >Next</button>
                                </div>
                            </Form.Item>
                        </Form>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>

    )
}

export default ForgotPassword