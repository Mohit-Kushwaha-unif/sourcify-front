import { Button, Form, Radio } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { update_user } from '../../../services/user'

const UserRole = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [userRole, setUserRole] = useState()
    const formSubmit = (userRole) => {
        var obj = {}
        obj.role = userRole.role
        obj.id = localStorage.getItem("user_id")
        dispatch((update_user(obj))).then((res)=>{
            console.log(res)
            if(userRole.role === 1){
                navigate('/vendor-form')
            }
            if(userRole.role === 0){
                navigate('/contractor-form')
            }
        })
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className=" rounded-lg px-6 py-4 md:w-1/2 lg:w-1/3 " >
                <Form onFinish={formSubmit}>
                    <Form.Item
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        className="cursor-pointer"
                    >

                        <Radio.Group >
                            <Radio value={1}>Vendor</Radio>
                            <Radio value={0}>Contractor</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Next


                </button>
                </Form>
            </div>

        </div>
    )
}

export default UserRole