import React, { useState } from 'react'
import {
  Form,
  Input,
  Select
} from 'antd';
import state_cites from '../../../assests/state_city.';
import { useDispatch } from 'react-redux';
import { Add_Vendor } from '../../../services/Vendor';
const VendorForm = () => {
  const dispatch = useDispatch()
  function FormHandler(values) {
    values.user_id = localStorage.getItem("user_id")
    dispatch(Add_Vendor(values)).then((res)=>{
      console.log(res)
    })
    console.log(values)
   }
  const [state, setState] = useState([])
  function countrySelectHandler(country) {
    setState(state_cites[country])
  }

 var email = localStorage.getItem("email")
 var number =  localStorage.getItem("number")
  return (
    <section className="min-h-min mt-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8" >
      <div className="px-8 h-full text-gray-800">
        <div
          className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 "
        >
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="text-lg mb-0 mr-4">Vendor Form</p>
            </div>
            <div
              className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
            >
            </div>
            <Form labelAlign="left"
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
              <Form.Item name="agency_name" label="Name of Agency " rules={[
                {
                  required: true,
                  message: 'Please input your Bank Overdraft Limit'
                },
              ]}
                className="mb-1"
              >

                <Input placeholder='Enter name of your Agency' />
              </Form.Item>

              <Form.Item name='contact_person' className='mb-1 mt-0' label="Contact Person Name" rules={[
                {
                  required: true,
                  message: 'Please input your Contact Person Name'
                },
              ]}
              >

                <Input placeholder='Enter Contact Person Name' />
              </Form.Item>
              <div className='form_email_mobile_flex '>
                <div className='form_flex_children mr-1'>
                  <Form.Item name="number" label="Number " rules={[
                    {
                      required: true,
                      message: 'Please input your Number'
                    },
                  ]}
                    className="mb-1"
                  >
                {
                  number ? <Input disabled maxLength={10} minLength={10} type="Number" placeholder='Enter Your Number' /> : <Input maxLength={10} minLength={10} type="Number" placeholder='Enter Your Number' /> 
                }
                    
                  </Form.Item>
                </div>
                <div className='form_flex_children mr-1'>
                  <Form.Item name="email" className='mb-1 mt-0' label="Email" rules={[
                    {
                      required: true,
                      message: 'Please input your Email'
                    },
                  ]}
                  >
                    {
                      email ? <Input disabled placeholder='Enter Your Email' /> : <Input  placeholder='Enter Your Email' />
                    }
                    
                  </Form.Item>
                </div>
              </div>
              <Form.Item name="Address" className='mb-1' label="Office Address " rules={[
                {
                  required: true,
                  message: 'Please input your Address!',
                },
              ]}>
                <Input placeholder='Enter Your Office Address' />
              </Form.Item>
              <div className='form_email_mobile_flex '>
                <div className='form_flex_children mr-1'>
                  <Form.Item name="State" label="State " rules={[
                    {
                      required: true,
                      message: 'Please input your State!'
                    },
                  ]}>

                    <Select id="country-state" name="State" placeholder="Select State" onSelect={countrySelectHandler}>
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
                      message: 'Please input your City!',
                    },
                  ]}>
                    <Select id="country-state" name="City" placeholder="Select City">
                      {state.length > 0 && state.map((state) => {
                        return (<Select.Option value={state}>{state}</Select.Option>)
                      }
                      )}
                    </Select>
                  </Form.Item>
                </div>
                <div className='form_flex_children'>
                  <Form.Item name="pin_code" label="Pin Code " rules={[
                    {
                      required: true,
                      message: 'Please input your Pin Code!',

                    },
                  ]}>
                    <Input maxLength={6} minLength={6} placeholder="Enter 6 digit PIN Code" />
                  </Form.Item>
                </div>
              </div>
              <div className="text-center lg:text-left mt-2">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >

                  Next Step

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