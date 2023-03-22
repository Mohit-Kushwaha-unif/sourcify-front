import React, { useState } from 'react'

import {
  Form,
  Input,
  Space,
  Button,
  Select,
  Checkbox
} from 'antd';
import { DatePicker } from 'antd';
import { AiFillDelete } from 'react-icons/ai'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import state_cites from '../../../assests/state_city.';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Contractor_service from '../../../services/contractor'
import { useEffect } from 'react';
import moment from 'moment';
const WorkExperience = () => {
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const [state, setState] = useState(["All State"])
  const [showMsg, setShowMsg] = useState(false)
  const [formData, setFormData] = useState([])
  function countrySelectHandler(country) {
    setState((prevState) => prevState, state_cites[country])
  }
  var projects = []
  useEffect(() => {
    if (localStorage.getItem("form_id")) {
      dispatch(Contractor_service.get_contractorBy_id(localStorage.getItem("form_id"))).then((res) => {
        
        res?.projects?.map((project) => {
        console.log(project)
        var Exec = moment(project.Exec)
        project.Exec = Exec
            projects.push(project)
        
       
    })
        setFormData(projects)
  
      })}
    

  }, [])
  function FormHandler(value) {
    console.log({ value })
    var formData = new FormData()
    Object.keys(value).map((formKey) => {
      formData.append(formKey, JSON.stringify(value[formKey]))
    })
    formData.append("form_id", localStorage.getItem("form_id"))
    dispatch(Contractor_service.update_contractor(formData)).then((res) => {
      // navigation("/dashboard")
     
      dispatch(Contractor_service.get_contractorBy_id(localStorage.getItem("form_id"))).then((res) => {
        
        res?.projects?.map((project) => {
        console.log(project)
        var Exec = moment(project.Exec)
        project.Exec = Exec
            projects.push(project)
        
       
    })
        setFormData(projects)
  
      })
      window.scrollTo(0,0)
      setShowMsg(true)
      // navigation("/")
    })


  }
  
    
   

  console.log(formData);
  return (
    <section className="min-h-min mt-10 flex flex-col justify-center py-6 sm:px-6 lg:px-8" >
      <div className="px-8 h-full text-gray-800">
        <div
          className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 "
        >
          <div className="xl:ml-20 xl:w-11/12 lg:w-11/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl w-full p-6">
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="text-lg mb-0 mr-4">Work Experience</p>
            </div>
            {showMsg && <p className='text-[#FF5757] text-base'>Your profile saved successfully</p>}

            <div
              className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
            >
            </div>
            <Form labelAlign="left" name="dynamic_form_nest_item"
              fields={[
                {
                  name: ["Project"],
                  value: [...formData]
                }

              ]}
              layout="vertical" onFinish={FormHandler}>

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
                              <Input type='Number' placeholder="Contract Value" />
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
                              <Input type='Number' style={{ width: '100%' }} placeholder="Client Mobile Number" />
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
              {/* <Form.List
              name="Projects"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 2) {
                      return Promise.reject(new Error('At least 3 Projects'));
                    }
                  },
                },
         
              ]}
            >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label= 'Projects'
                required={false}
                key={field.key}
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  
                  noStyle
                  className='flex column '
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 ">
                    <div ><Input placeholder="Client name" className='mb-1' style={{ width: '100%'  }} /></div>
                    <div ><Input placeholder="Contract Value" className='mb-1' style={{ width: '100%'  }} /></div>
                    <div > <Input placeholder="Year of Execution" className='mb-1' style={{ width: '100%'  }} /></div>
                    <div > <Select id="country-state" mode="multiple" name="State" style={{ width: '100%'  }} placeholder="Select State" onSelect={countrySelectHandler}>
                      { Object.keys(state_cites).map((state)=>{
                          return (<Select.Option value={state}>{state}</Select.Option>)
                          }
                        )}
                    </Select>
                  </div>
                    <div >  <Input placeholder="Name Of Person" className='mb-1' style={{ width: '100%'  }} />
                  </div>
                    <div >  <Input placeholder="Client Mobile Number" className='mb-1' style={{ width: '100%'  }} />
                  </div>
                  </div>
                </Form.Item>
                {fields.length > 0 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button ml-2 text-center mb-1"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Add Projects
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List> */}
              

              <div className='flex flex-col flex-col-reverse md:flex-row justify-between'>
                <button
                  type="submit"
                  className='back_btn'
                  // className="inline-block px-32 mt-4 py-3 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded-[50px] shadow-md hover:bg-[#FF5759] hover:shadow-lg focus:bg-[#FF5757] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FF5757] active:shadow-lg transition duration-150 ease-in-out"
                  onClick={()=>navigation('/contractor-form/financial-detail')}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="save_Btn"      >
                  Save
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkExperience