import React, { useState } from 'react'

import {
  Form,
  Input,
  Checkbox,
  Button,
  Select
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import state_cites from '../../../assests/state_city.';
import { Link } from 'react-router-dom';
const WorkExperience = () => {
  const [state,setState] = useState(["All State"])
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 0 },
    },
  };
  function countrySelectHandler(country){
    setState((prevState)=>prevState,state_cites[country])
   }
  return (
    <section className="min-h-min mt-10 flex flex-col justify-center py-6 sm:px-6 lg:px-8" >
      <div className="px-8 h-full text-gray-800">
        <div
          className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 "
        >
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
            <Form  labelAlign= "left"
                layout="vertical">
             <Form.Item name="State" label="State " rules={[
        {
          required: true,
          message: 'Please input your State!'
        },
      ]} 
      >
          
          <Select id="country-state" mode="multiple" name="State" a placeholder="Select State" onSelect={countrySelectHandler}>
          <Select.Option value="All State">All State</Select.Option>
         { Object.keys(state_cites).map((state)=>{
            return (<Select.Option value={state}>{state}</Select.Option>)
            }
          )}
      </Select>
        </Form.Item>
              <div className='mb-2'>Click Button To Add Projects <span className='intialValue'>*</span></div>
              <Form.List
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
                  <div class="grid grid-cols-2">
                    <div ><Input placeholder="Client name" className='mb-1' style={{ width: '90%' }} /></div>
                    <div ><Input placeholder="Contract Value" className='mb-1' style={{ width: '90%' }} /></div>
                    <div > <Input placeholder="Year of Execution" className='mb-1' style={{ width: '90%' }} /></div>
                    <div > <Select id="country-state" mode="multiple" name="State" style={{ width: '90%' }} placeholder="Select State" onSelect={countrySelectHandler}>
                      { Object.keys(state_cites).map((state)=>{
                          return (<Select.Option value={state}>{state}</Select.Option>)
                          }
                        )}
                    </Select>
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
      </Form.List>
              <div className="flex justify-between items-center">
                <div className="form-group form-check">
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    rules={[
                      {
                        required: true,
                        message: 'Please check the check box!'
                      },
                    ]}
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                </div>
                <Link to="#!" className="text-gray-800 mb-6">Forgot password?</Link>
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Login


                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <Link
                    to='/register'
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >Register</Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkExperience