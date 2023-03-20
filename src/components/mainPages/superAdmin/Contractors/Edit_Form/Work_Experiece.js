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
import { DatePicker } from 'antd';
import { AiFillDelete } from 'react-icons/ai'
import * as Contractor_service from '../../../../../services/contractor'
import moment from 'moment';
const Work_Experiece = ({ formValues, isClicked }) => {
    const navigation = useNavigate()
    const [state, setState] = useState(["All State"])
    const dispatch = useDispatch()
    function countrySelectHandler(country) {
        setState((prevState) => prevState, state_cites[country])
      }
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
    var state_To_work = []
    var projects = []
    formValues.prefferd_states.map((state) => {
        state_To_work.push(state)
    })
    formValues?.projects?.map((project) => {
        console.log(project)
        var Exec = moment(project.Exec)
        project.Exec = Exec
            projects.push(project)
        
       
    })
    console.log({ state_To_work, projects })


    return (
        <div className='bg-white p-3 rounded-xl '>
            <Form labelAlign="left" name="dynamic_form_nest_item"
                layout="vertical"
                fields={[
                    {
                        name: ["Project"],
                        value: [...projects]
                    }

                ]}
                onFinish={FormHandler}>
                <div className='mb-2'>Click Button To Add Projects <span className='intialValue'></span></div>
                <p className='mb-2 '>Projects <span className='intialValue'></span></p>
              <Form.List name="Project">
                {(fields, { add, remove }) => (
                  <>

                    {fields.map(({ key, name, ...restField }) => (
                      <>
                      <div className='grid grid-cols-2 w-full'>
                        <p className=' flex mb-3'>#Project {key + 1}  </p> 
                        <div className=' float-right'>
                          <span className='mb-3  text-[#FF5757] cursor-pointer underline float-right ' onClick={() => remove(name)}>
                          <AiFillDelete className='ml-2 cursor-pointer w-5 h-5 float-right'  >  </AiFillDelete>
                        Remove
                        </span>
                      </div>
                      </div>
                      
                        
                          <div className=" grid grid-cols-1 md:grid-cols-3 gap-x-6 ">


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
                              <Input placeholder="Client Name" style={{ width: '100%' }} />
                            </Form.Item>


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
                              <DatePicker style={{ width: '100%' }} placeholder="Year of Execution" picker="year" />
                              {/* <Input style={{ width: '100%'  }} placeholder="Year of Execution" /> */}
                            </Form.Item>

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
                              <Select id="country-state" name="State" style={{ width: '100%' }} placeholder="Select State" onSelect={countrySelectHandler}>
                                {Object.keys(state_cites).map((state) => {
                                  return (<Select.Option value={state}>{state}</Select.Option>)
                                }
                                )}
                              </Select>
                            </Form.Item>

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
                              <Input style={{ width: '100%' }} placeholder="Name Of Person" />
                            </Form.Item>


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
                              <Input style={{ width: '100%' }} placeholder="Client Mobile Number" />
                            </Form.Item>

                          </div>
                         
                          {/* <svg xmlns="http://www.w3.org/2000/svg" onClick={() => remove(name)} className="w-6 h-6" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="black" />
                            <path d="M19 6H5v12h14V6zm-4.25 7.71l-1.47 1.47L12 11.48l-1.28 1.28-1.47-1.47L10.52 10l-1.28-1.28 1.47-1.47L12 8.52l1.28-1.28 1.47 1.47L13.48 10l1.27 1.71z" fill="#ffffff"  />
                          </svg> */}

                          {/* <MinusCircleOutlined onClick={() => remove(name)} /> */}

                        
                      </>


                    ))}

                    <Form.Item>
                      <Button className='flex justify-center items-baseline' type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Project
                      </Button>

                    </Form.Item>
                  </>
                )}
              </Form.List>
               
                    <div className="flex justify-between lg:text-left">

                        <button
                            onClick={()=>{isClicked(0)}}
                            className="primary_btn"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="primary_btn"
                        >
                            Next Step
                        </button>
                    </div>
               
            </Form>
        </div>
    )
}

export default Work_Experiece