import React, { useState } from 'react'
import {
    Form,
    Input,
    Space,
    Button,
    Select
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import state_cites from '../../../../../assests/state_city.';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Contractor_service from '../../../../../services/contractor'
const Work_Experiece = ({formValues,isClicked}) => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    function FormHandler(value) {
        console.log({ value })
        var formData = new FormData()

        Object.keys(value).map((formKey) => {
            formData.append(formKey, JSON.stringify(value[formKey]))
        })
        formData.append("form_id", formValues._id)
        dispatch(Contractor_service.update_contractor(formData)).then((res) => {
            isClicked("3")
        })
    }
    var state_To_work =[]
    var projects = []
    formValues.prefferd_states.map((state)=>{
        state_To_work.push(state)
    })
    formValues.projects.map((project)=>{
        projects.push(project)
    })
    console.log({state_To_work,projects})
    
    
    return (
        <div className='bg-white p-3 rounded-xl '>
            <Form labelAlign="left" name="dynamic_form_nest_item"
                layout="vertical"
                fields={[
                    {
                        name:["prefferd_states"],
                        value:[...state_To_work]
                    },
                    {
                        name: ["Project"],
                        value: [...projects]
                    }
                
                  ]}
                     onFinish={FormHandler}>
                <Form.Item name="prefferd_states" label="Preffered State to Work " rules={[
                    {
                        required: true,
                        message: 'Please input your State!'
                    },
                ]}
                >
                    <Select id="country-state" mode="multiple" name="prefferd_state"  placeholder="Select State" >
                        <Select.Option value="All State">All State</Select.Option>
                        {Object.keys(state_cites).map((state) => {
                            return (<Select.Option value={state}>{state}</Select.Option>)
                        }
                        )}
                    </Select>
                </Form.Item>
                <div className='mb-2'>Click Button To Add Projects <span className='intialValue'>*</span></div>
                <Form.List name="Project">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}

                                    align="baseline"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 ">
                                        <div >
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'Client_Name']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Client Name',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Client Name" style={{ width: '90%' }} />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'Contract_Value']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Contract Value',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Contract Value" />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'Exec']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Year of Execution',
                                                    },
                                                ]}
                                            >
                                                <Input style={{ width: '90%' }} placeholder="Year of Execution" />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'Worked_States']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing State Value',
                                                    },
                                                ]}
                                            >
                                                <Select id="country-state"  placeholder="Select State">
                                                    {Object.keys(state_cites).map((state) => {
                                                        return (<Select.Option value={state}>{state}</Select.Option>)
                                                    }
                                                    )}
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'person_name']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Name Of Person',
                                                    },
                                                ]}
                                            >
                                                <Input style={{ width: '90%' }} placeholder="Name Of Person" />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'client_mobile_number']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Client Mobile Number',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Client Mobile Number" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
                <div className="text-center lg:text-left">
                    <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        Next Step
                    </button>
                </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Work_Experiece