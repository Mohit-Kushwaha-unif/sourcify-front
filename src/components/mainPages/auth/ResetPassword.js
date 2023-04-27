import { Button, Form, Input } from 'antd';
import React from 'react'
import { useState } from 'react';

const ResetPassword = () => {
    const [form] = Form.useForm();
    const [passwordError, setPasswordError] = useState('');

    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    const validateConfirmPassword = (_, value) => {
        if (value && value !== form.getFieldValue('password')) {
            setPasswordError('Passwords do not match');
            return Promise.reject('Passwords do not match');
        } else {
            setPasswordError('');
            return Promise.resolve();
        }
    };

    return (
        <section className=" mb-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8" >
            <div className="px-8 h-full  ">
                <div
                    className="flex  justify-center  flex-wrap h-full g-6 "
                >
                    <div className="card">
                        <div className="flex flex-row items-center justify-center lg:justify-start">
                            <p className="headings  mt-5 mb-6 mr-4">Reset Your Password </p>
                        </div>
                        <Form form={form} onFinish={onFinish}>
                            <Form.Item
                                label=""
                                name="password"

                                rules={[
                                    { required: true, message: 'Please enter a password' },
                                    { min: 6, message: 'Password must be at least 6 characters' },
                                ]}
                            >
                                <Input.Password className='mb-4' placeholder="Enter password" />
                            </Form.Item>
                            <Form.Item
                                label=""
                                name="confirmPassword"

                                dependencies={['password']}
                                validateTrigger="onBlur"
                                rules={[
                                    { required: true, message: 'Please confirm your password' },
                                    { validator: validateConfirmPassword },
                                ]}
                                help={passwordError}
                            >
                                <Input.Password className='mb-4' placeholder="Confirm password" />
                            </Form.Item>

                            <button type="primary" className='primary_btn' htmlType="submit">
                                Submit
                            </button>

                        </Form>
                    </div>
                </div>
            </div>
        </section>


    )
}

export default ResetPassword