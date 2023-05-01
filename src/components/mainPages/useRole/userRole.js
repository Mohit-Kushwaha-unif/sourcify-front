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
        <div className="flex flex-col justify-center items-center h-[250px]">
            <div className=" rounded-lg   " >
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
                            <Radio value={1}>I'm a company hiring for  projects</Radio>
                            <Radio value={0}>I'm Contractor looking for work</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <div className='center_content mt-5'>
                    <button
                  type="submit"
                  className=" brand_button"
                >
                  Next


                </button>
                </div>
                </Form>
            </div>

        </div>
    )
}

export default UserRole