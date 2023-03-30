import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Select
} from 'antd';
import state_cites from '../../../assests/state_city.';
import { useDispatch } from 'react-redux';
import { Add_Vendor, update_vendor } from '../../../services/Vendor';
import { update_user } from '../../../services/user';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const VendorForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const [showMsg, setShowMsg] = useState(false)
  function FormHandler(values) {
    if(localStorage.getItem("adminEmail")==null){
    values.user_id = localStorage.getItem("user_id")
  }
  values.role = 1
    if(showMsg=== true){
      values.form_id = localStorage.getItem("form_id")
      dispatch(update_vendor(values)).then((res)=>{
        var obj ={}
        obj.id = values.user_id
        obj.vendor_id = res.data._id
        dispatch(update_user(obj)).then((res)=>{
          setShowMsg(true)
          navigator('/dashboard')
          window.scroll(0,0)
        })
      })
    }
    else{
      dispatch(Add_Vendor(values)).then((res)=>{
        var obj ={}
        obj.id = values.user_id
        localStorage.setItem("form_id",res.data._id)
        obj.vendor_id = res.data._id
        dispatch(update_user(obj)).then((res)=>{
          setShowMsg(true)
          navigator('/dashboard')
          window.scroll(0,0)
        })
      })
    }
    // console.log(values)
   }
   var email,number;
   if(localStorage.getItem("adminEmail")==null)
   { email = localStorage.getItem("email")
    number =  localStorage.getItem("number")}
   useEffect(() => {
    if(localStorage.getItem('adminEmail')) 
    {
      form.resetFields();
      number = null;
      email=null
    }
   }, [localStorage.getItem('adminEmail')])
  const [state, setState] = useState([])
  function countrySelectHandler(country) {
    setState(state_cites[country])
  }

  console.log(email,number)
  return (
    <section className="min-h-min mt-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8 w-full" >
      <div className="px-8 h-full text-gray-800">
        <div
          className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 "
        >
          <div className="xl:mx-20 xl:w-11/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="text-lg mb-0 mr-4">Onboarding Form</p>
            </div>
          {showMsg && <p className='text-[#FF5757] text-base'> Your Profile has been saved successfully</p> }
            <div
              className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
            >
            </div>
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
              <Form.Item name="agency_name" label=" Company name " rules={[
                {
                  required: true,
                  message: 'Please enter name of your company'
                },
              ]}
                className="mb-2"
              >

                <Input placeholder='Enter name of your company' />
              </Form.Item>

              <Form.Item name='contact_person' className='mb-2 mt-0' label="Contact person name" rules={[
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
                  <Form.Item name="number" label="Mobile number " rules={[
                    {
                      required: true,
                      message: 'Please enter your number'
                    },
                  ]}
                    className="mb-1"
                  >
                {
                  number!=null && !localStorage.getItem("adminEmail") ? <Input disabled maxLength={10} minLength={10} type="Number" placeholder='Enter Your Number' /> : <Input maxLength={10} minLength={10} type="Number" placeholder='Enter Your Number' /> 
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
                      email !=null  && !localStorage.getItem("adminEmail")? <Input disabled placeholder='Enter Your Email' /> : <Input  placeholder='Enter Your Email' />
                    }
                    
                  </Form.Item>
                </div>
              </div>
              <Form.Item name="Address" className='mb-2' label="Office address " rules={[
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

                    <Select id="country-state" name="State" placeholder="Select state" onSelect={countrySelectHandler}>
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
                    <Select id="country-state" name="City" placeholder="Select city">
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default VendorForm