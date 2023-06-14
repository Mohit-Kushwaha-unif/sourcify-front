import { Button, Form, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useEffect } from 'react';
import { get_Vendor } from '../../../../services/Vendor';
import { get_contractor } from '../../../../services/contractor';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { sendemail } from '../../../../services/user';

const SendEmail = () => {
    const [allUsers, setAllUsers] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {

        var users = []
        dispatch(get_Vendor()).then((res) => {
            res.map((user) => {
                if (user.status === 0) {
                    users.push(user);
                }

            });
        }).then(() => {
            dispatch(get_contractor()).then((res) => {
                res.map((cont) => {
                    if (cont.status === 0) {

                        users.push(cont);
                    }
                });
            }).then(() => {
                setAllUsers([...users]);
            });
        });


    }, []);
    function formHandler(val) {
        dispatch(sendemail(val)).then((res)=>{
            console.log(res)
        })
    }

    return (
        <div className="flex h-auto align-center ml-30 w-full p-2 px-3">
            <div className="pt-7 px-7 h-auto w-full bg-white p-3 rounded-xl">
                <h1 className="mb-3">Enter Email Details</h1>
                <Form
                    labelAlign="left"
                    layout="vertical"
                    onFinish={formHandler}
                >
                    <p className='headings font_16 mb-1'>Select Company Name</p>
                    <Form.Item name='user_id' label="" rules={[
                        {
                            required: true,
                            message: 'Write the Name of your project'
                        },
                    ]}
                    >

                        <Select name="user_id" placeholder="Select Comapny " options={allUsers.map((item) => ({
                            value: item.user_id._id,
                            label: item.entity || item.agency_name,
                        }))}>

                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="subject"
                        label="Subject of Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter subject of email',
                            },
                        ]}
                        className="mb-1"
                    >
                        <Input placeholder="Enter Subject" />
                    </Form.Item>

                    <Form.Item
                        name="body"
                        label="Body of email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter email body',
                            },
                        ]}
                        className="mb-1 mt-0"
                    >
                        <TextArea placeholder="Enter eamil body" />
                    </Form.Item>

                    <Button
                        className="brand_button mt-3"
                        type="primary"
                        htmlType="submit"
                    >
                        SAVE
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default SendEmail