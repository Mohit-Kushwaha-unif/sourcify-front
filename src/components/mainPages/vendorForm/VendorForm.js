import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Select
} from 'antd';
import state_cites from '../../../assests/state_city.';
import { useDispatch, useSelector } from 'react-redux';
import { Add_Vendor, get_Vendor, get_Vendor_by_id, update_vendor } from '../../../services/Vendor';
import { update_user } from '../../../services/user';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Helper/LogooutHelper';
import Loader from '../../Helper/Loader';
const VendorForm = () => {
  const isAdmin = useSelector(state => state.User.user_role);
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const [showMsg, setShowMsg] = useState(false)
  const [formData, setFormData] = useState([])
  const [loading, setLoading] = useState(false)
  var [email, setEmail] = useState('')
  var [number, setNumber] = useState('')
  var [isNumber, setIsNumber] = useState(false)
  const [state, setState] = useState([])
  function FormHandler(values) {
    setLoading(true)
    if (localStorage.getItem("adminEmail") == null) {

      values.user_id = localStorage.getItem("user_id")
    }
    values.role = 1
    if (isAdmin == 2) {
      values.status = 0
    }
    else {
      values.status = 1
    }

    if (showMsg === true) {
      values.form_id = localStorage.getItem("form_id")

      dispatch(update_vendor(values)).then((res) => {
        var obj = {}
        obj.id = values.user_id
        obj.vendor_id = res.data._id
        dispatch(update_user(obj)).then((res) => {
          setShowMsg(true)
          window.scroll(0, 0)
          setLoading(false)

          Swal.fire('Profile Submitted', 'Your profile is submitted for admin approval', 'success').then(() => {


            navigator('/dashboard')

          })
        })
      })
    }
    else {
      dispatch(Add_Vendor(values)).then((res) => {
        var obj = {}
        obj.id = values.user_id
        if (!localStorage.getItem('adminEmail')) {
          localStorage.setItem("form_id", res.data._id)
        }

        obj.vendor_id = res.data._id
        dispatch(update_user(obj)).then((res) => {
          setShowMsg(true)
          setLoading(false)
          Swal.fire('Profile Submitted', 'Your profile is submitted for admin approval', 'success').then(() => {
            navigator('/dashboard')
          })
          window.scroll(0, 0)
        })
      })
    }
    // console.log(values)
  }

  useEffect(() => {
    if (localStorage.getItem("form_id")) {
      dispatch(get_Vendor_by_id(localStorage.getItem("form_id"))).then((res) => {
        setFormData(res)

      })
    }
  }, [])
  console.log(formData)

  function emailHandler(e) {
    setEmail(e.target.value)
  }

  function inputHandler(e) {
    setNumber(e.target.value)
  }

  var email, number;


  useEffect(() => {
    if (localStorage.getItem('adminEmail')) {
      form.resetFields();
    }
    else {
      if (localStorage.getItem("number")) {
        setIsNumber(true)
      }
      setEmail(localStorage.getItem("email"))
      setNumber(localStorage.getItem("number"))
    }
  }, [localStorage.getItem('adminEmail')])


  function countrySelectHandler(country) {
    setState(state_cites[country])
  }
  return (
    <>
      {
        loading ? <Loader /> :
          <section className="min-h-min mt-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8 w-full" >
            <div className="md:px-8 px-2 h-full text-gray-800">
              <div
                className=" flex justify-center items-center flex-wrap h-full g-6 "
              >
                <div className={`overflow-hidden ${isAdmin == 2 ? "w-full" : "xl:mx-20 xl:w-11/12 lg:w-5/12 md:w-8/12 "} mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6`}>
                  <div className="flex flex-row items-center justify-center lg:justify-start">
                    <p className="text-lg mb-0 mr-4" data-translate="hi">Onboarding Form</p>
                  </div>
                  {showMsg && <p className='text-[#FF5757] text-base'> Your Profile has been saved successfully</p>}
                  <div
                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                  >
                  </div>
                  {
                    !Array.isArray(formData) ?
                      <Form labelAlign="left"
                        form={form}
                        fields={[
                          {
                            name: "agency_name",
                            value: formData.agency_name
                          },
                          {
                            name: "contact_person",
                            value: formData.contact_person
                          },
                          {
                            name: "pin_code",
                            value: formData.pin_code
                          },
                          {
                            name: "State",
                            value: formData.State
                          },
                          {
                            name: "City",
                            value: formData.City
                          },
                          {
                            name: "Address",
                            value: formData.Address
                          },
                          {
                            name: ["email"],
                            value: email
                          },
                          {
                            name: ["number"],
                            value: number
                          },
                        ]}
                        layout="vertical" onFinish={FormHandler}>
                        <Form.Item name="agency_name" label=" Company Name " rules={[
                          {
                            required: true,
                            message: 'Please enter name of your company'
                          },
                        ]}
                          className="mb-2"
                        >

                          <Input placeholder='Enter name of your company' />
                        </Form.Item>

                        <Form.Item name='contact_person' className='mb-2 mt-0' label="Contact Person Name" rules={[
                          {
                            required: true,
                            message: 'Please enter your contact person name'
                          },
                        ]}
                        >

                          <Input placeholder='Enter contact person name' />
                        </Form.Item>
                        <div className='form_email_mobile_flex flex flex-col flex-col-reverse md:flex-row '>
                          <div className='form_flex_children mr-1'>
                            <Form.Item name="number" label="Mobile Number " rules={[
                              {
                                required: true,
                                message: 'Please enter your number'
                              },
                            ]}
                              className="mb-1"
                            >
                              {
                                isNumber && !localStorage.getItem("adminEmail") ? <Input disabled maxLength={10} minLength={10} type="Number" placeholder='Enter Your Number' /> : <Input maxLength={10} minLength={10} type="Number" placeholder='Enter Your Number' />
                              }

                            </Form.Item>
                          </div>
                          <div className='form_flex_children mr-1'>
                            <Form.Item name="email" className='mb-2 mt-0' label="Email" rules={[
                              {
                                required: true,
                                message: 'Please enter your email'
                              },
                            ]}
                            >
                              {
                                email != null && !localStorage.getItem("adminEmail") ? <Input disabled placeholder='Enter Your Email' /> : <Input placeholder='Enter Your Email' />
                              }

                            </Form.Item>
                          </div>
                        </div>
                        <Form.Item name="Address" className='mb-2' label="Office Address " rules={[
                          {
                            required: true,
                            message: 'Please enter your address',
                          },
                        ]}>
                          <Input placeholder='Enter Your office address' />
                        </Form.Item>
                        <div className='flex flex-col md:flex-row  '>
                          <div className='form_flex_children mr-1'>
                            <Form.Item name="State" label="State " rules={[
                              {
                                required: true,
                                message: 'Please enter your state'
                              },
                            ]}>

                              <Select id="country-state"
                                name="State" placeholder="Select state" onSelect={countrySelectHandler}
                                showSearch // enable search functionality
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 // case-insensitive search
                                }>
                                {Object.keys(state_cites).map((state) => {
                                  return (<Select.Option value={state}>{state}</Select.Option>)
                                }
                                )}
                              </Select>
                            </Form.Item>
                          </div>
                          <div className='form_flex_children mr-1'>
                            <Form.Item name="City" label="City " rules={[
                              {
                                required: true,
                                message: 'Please enter your city',
                              },
                            ]}>
                              <Select id="country-state"
                                name="City" placeholder="Select city"
                                showSearch // enable search functionality
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 // case-insensitive search
                                }>
                                {state.length > 0 && state.map((state) => {
                                  return (<Select.Option value={state}>{state}</Select.Option>)
                                }
                                )}
                              </Select>
                            </Form.Item>
                          </div>
                          <div className='form_flex_children'>
                            <Form.Item name="pin_code" label="PIN Code " rules={[
                              {
                                required: true,
                                message: 'Please enter your PIN Code',

                              },
                            ]}>
                              <Input maxLength={6} minLength={6} placeholder="Enter 6 digit PIN Code" />
                            </Form.Item>
                          </div>
                        </div>
                        <div className='flex justify-center'>
                          <button
                            type="submit"
                            className="inline-block px-32 py-3 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded-[50px] shadow-md hover:bg-[#FF5759] hover:shadow-lg focus:bg-[#FF5757] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FF5757] active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Save
                          </button>
                        </div>
                      </Form> :
                      <Form labelAlign="left"
                        form={form}
                        fields={[

                          {
                            name: ["email"],
                            value: email
                          },
                          {
                            name: ["number"],
                            value: number
                          },
                        ]}
                        layout="vertical" onFinish={FormHandler}>
                        <Form.Item name="agency_name" label=" Company Name " rules={[
                          {
                            required: true,
                            message: 'Please enter name of your company'
                          },
                        ]}
                          className="mb-2"
                        >

                          <Input placeholder='Enter name of your company' />
                        </Form.Item>

                        <Form.Item name='contact_person' className='mb-2 mt-0' label="Contact Person Name" rules={[
                          {
                            required: true,
                            message: 'Please enter your contact person name'
                          },
                        ]}
                        >

                          <Input placeholder='Enter contact person name' />
                        </Form.Item>
                        <div className='form_email_mobile_flex flex flex-col flex-col-reverse md:flex-row '>
                          <div className='form_flex_children mr-1'>
                            <Form.Item name="number" label="Mobile Number " rules={[
                              {
                                required: true,
                                message: 'Please enter your number'
                              },
                            ]}
                              className="mb-1"
                            >
                              {
                                isNumber && !localStorage.getItem("adminEmail") ? <Input disabled maxLength={10} minLength={10} type="Number" placeholder='Enter Your Number' /> : <Input maxLength={10} minLength={10} type="Number" onChange={inputHandler} placeholder='Enter Your Number' />
                              }

                            </Form.Item>
                          </div>
                          <div className='form_flex_children mr-1'>
                            <Form.Item name="email" className='mb-2 mt-0' label="Email" rules={[
                              {
                                required: true,
                                message: 'Please enter your email'
                              },
                            ]}
                            >
                              {
                                email != null && !localStorage.getItem("adminEmail") ? <Input disabled placeholder='Enter Your Email' /> : <Input type='email' onChange={emailHandler} placeholder='Enter Your Email' />
                              }

                            </Form.Item>
                          </div>
                        </div>
                        <Form.Item name="Address" className='mb-2' label="Office Address " rules={[
                          {
                            required: true,
                            message: 'Please enter your address',
                          },
                        ]}>
                          <Input placeholder='Enter Your office address' />
                        </Form.Item>
                        <div className='flex flex-col md:flex-row  '>
                          <div className='form_flex_children mr-1'>
                            <Form.Item name="State" label="State " rules={[
                              {
                                required: true,
                                message: 'Please enter your state'
                              },
                            ]}>

                              <Select id="country-state"
                                name="State" placeholder="Select state" onSelect={countrySelectHandler}
                                showSearch // enable search functionality
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 // case-insensitive search
                                }
                              >
                                {Object.keys(state_cites).map((state) => {
                                  return (<Select.Option value={state}>{state}</Select.Option>)
                                }
                                )}
                              </Select>
                            </Form.Item>
                          </div>
                          <div className='form_flex_children mr-1'>
                            <Form.Item name="City" label="City " rules={[
                              {
                                required: true,
                                message: 'Please enter your city',
                              },
                            ]}>
                              <Select id="country-state"
                                name="City" placeholder="Select city"
                                showSearch // enable search functionality
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 // case-insensitive search
                                }>
                                {state.length > 0 && state.map((state) => {
                                  return (<Select.Option value={state}>{state}</Select.Option>)
                                }
                                )}
                              </Select>
                            </Form.Item>
                          </div>
                          <div className='form_flex_children'>
                            <Form.Item name="pin_code" label="PIN Code " rules={[
                              {
                                required: true,
                                message: 'Please enter your PIN Code',

                              },
                            ]}>
                              <Input maxLength={6} minLength={6} placeholder="Enter 6 digit PIN Code" />
                            </Form.Item>
                          </div>
                        </div>
                        <div className='flex justify-center'>
                          <button
                            type="submit"
                            className="inline-block px-32 py-3 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded-[50px] shadow-md hover:bg-[#FF5759] hover:shadow-lg focus:bg-[#FF5757] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FF5757] active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Save
                          </button>
                        </div>
                      </Form>
                  }

                </div>
              </div>
            </div>
          </section>
      }
    </>

  )
}

export default VendorForm