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
import {  PlusOutlined } from '@ant-design/icons';
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
  const disabledDate = (current) => current && current > moment().endOf('year');
  function countrySelectHandler(country) {
    setState((prevState) => prevState, state_cites[country])
  }
  var projects = []
  useEffect(() => {
    if (localStorage.getItem("form_id")) {
      dispatch(Contractor_service.get_contractorBy_id(localStorage.getItem("form_id"))).then((res) => {

        res?.projects?.map((project) => {
          var Exec = moment(project.Exec)
          project.Exec = Exec
          projects.push(project)


        })
        setFormData(projects)

      })
    }


  }, [])
  function FormHandler(value) {
    var formData = new FormData()
    Object.keys(value).map((formKey) => {
      formData.append(formKey, JSON.stringify(value[formKey]))
    })
    formData.append("form_id", localStorage.getItem("form_id"))
    dispatch(Contractor_service.update_contractor(formData)).then((res) => {
      // navigation("/dashboard")

      dispatch(Contractor_service.get_contractorBy_id(localStorage.getItem("form_id"))).then((res) => {

        res?.projects?.map((project) => {
          var Exec = moment(project.Exec)
          project.Exec = Exec
          projects.push(project)


        })
        setFormData(projects)

      })
      window.scrollTo(0, 0)
      setShowMsg(true)
      // navigation("/dashboard")
    })


  }

  return (
    <section className="min-h-min mt-10 flex flex-col justify-center py-6 sm:px-6 lg:px-8" >
      <div className="px-8 h-full text-gray-800">
        <div
          className=" flex xl:justify-center lg:justify-center items-center flex-wrap h-full g-6 "
        >
          <div className="xl:mx-20 xl:w-11/12 lg:w-11/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl w-full p-6">
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

              <p className='mb-2 '>Projects</p>
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
                            <DatePicker style={{ width: '100%' }} disabledDate={disabledDate}
                              placeholder="Year of Execution" picker="year" />
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
            
              <div className='flex flex-col flex-col-reverse md:flex-row justify-between'>
                <button
                  type="submit"
                  className='back_btn'
                  onClick={() => navigation('/contractor-form/financial-detail')}
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