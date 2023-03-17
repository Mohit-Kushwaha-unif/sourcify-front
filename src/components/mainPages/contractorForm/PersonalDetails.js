import {
  Button,
  Form,
  Input,
  Select,
  Checkbox
} from 'antd';
import state_cites from '../../../assests/state_city.';
import { useEffect, useState } from 'react';
// import work_segment from '../../../assests/options';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Contractor_service from '../../../services/contractor'
import { useDispatch } from 'react-redux';
import { get_category } from '../../../services/category';
import { update_user } from '../../../services/user';
const PersonalDetails = () => {
  const location = useLocation()
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const [initialpf, setStateInitialpf] = useState('')
  // const [isMSMEVisible, setIsMSMEVisible] = useState(false)
  const [msmeImageD, set_msmeImageD] = useState('')

  const [state, setState] = useState([])
  const [work_segment, set_work_Segment] = useState([])
  const [formval_workArea, setFormVal_work_area] = useState()
  const [formval_workstate, setFormVal_work_state] = useState()
  const [valid_msme, set_Valid_msme] = useState(false)
  const [formData, setFormData] = useState()
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(get_category()).then((res) => {
      // console.log(res)
      res.map((cat) => {
        set_work_Segment((prev_state) => [...prev_state, cat.category])
      })
    })
  }, [])


  var work_area = []
  var prefferd_state = []
  useEffect(() => {
    if (localStorage.getItem("form_id")) {
      dispatch(Contractor_service.get_contractorBy_id(localStorage.getItem("form_id"))).then((res) => {
        setFormData(res)
        res.work_area.map((work) => {
          work_area.push(work.work_segment)
        })
        setFormVal_work_area(work_area)
        res.prefferd_states.map((state) => {
          prefferd_state.push(state)
        })
        setFormVal_work_state(prefferd_state)
        setStateInitialpf(res.msme_number)
      })
    }

  }, [])

  // if(formData){
  //   console.log(formData)
  //   formData.work_area.map((work) => {
  //     work_area.push(work.work_segment)
  //   })
  //   formData.prefferd_states.map((state) => {
  //     prefferd_state.push(state)
  //   })
  //   setStateInitialpf(formData.msme_number)
  // }
  console.log(formval_workArea, prefferd_state)
  const onFinish = (value) => {
    var formData = new FormData()

    if (localStorage.getItem("adminEmail") == null) {
      value.user_id = localStorage.getItem("user_id")
    }
    value.role = 0;

    if (value.msme_image) {
      value.msme_image = msmeImageD
    }
    Object.keys(value).map((formKey) => {
      formData.append(formKey, value[formKey])
    })
    if (formData) {
      formData.append('form_id',localStorage.getItem("form_id"))
      dispatch(Contractor_service.update_contractor(formData)).then((res) => {
        console.log(res)
        var obj = {}
        obj.id = value.user_id
        obj.contractor_id = res.data.user_id._id
       
        dispatch(update_user(obj)).then((response) => {
          // console.log(response)
          navigation("/contractor-form/financial-detail")
        })
      })
    }
    else{
      dispatch(Contractor_service.add_contractor(formData)).then((res) => {
        var obj = {}
        obj.id = value.user_id
        obj.contractor_id = res.user_data._id
        console.log(res)
        dispatch(update_user(obj)).then((response) => {
          // console.log(response)
          navigation("/contractor-form/financial-detail")
        })
      })
    }
    
  }
  const onFinishFailed = (value) => {
    console.log('error', value)
  }

  function msme_img_value(e) {
    set_msmeImageD(e.target.files[0])
  }

  function countrySelectHandler(country) {
    setState(state_cites[country])
  }

  function msmeVerfication(event) {
    let text = event.target.value
    var regex = /^[A-Z]{2}[\\s\\/]?[A-Z]{3}[\\s\\/]?[0-9]{7}[\\s\\/]?[0-9]{3}[\\s\\/]?[0-9]{7}$/;
    if (text.length < 1) {
      set_Valid_msme(false)
    }
    else if (regex.test(text)) {
      set_Valid_msme(false)
    } else {
      set_Valid_msme(true)
    }
  }

  return (
    <>

      <div className='w-full min-h-min mt-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8 '>
        <div className="px-8 w-full h-full text-gray-800">
          <div
            className="flex w-full xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 "
          >
            <div className=" xl:ml-20 xl:w-11/12 lg:w-11/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-lg mb-0 mr-4">Basic Details</p>
              </div>
              <div
                className="flex items-center my-3 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
              >
              </div>
              {formData ?

                <Form
                  form={form}
                
                  
                  fields={
                    [
                      { "name": "email", "value": location.state?.email },
                      { "name": "mobile_number", "value": location.state?.number },

                      {
                        name: ["entity"],
                        value: [formData?.entity]
                      },
                      {
                        name: ['prefferd_state'],
                        value: [...formval_workstate]
                      },

                      {
                        name: ["Address"],
                        value: [formData?.Address]
                      },
                      {
                        name: ["State"],
                        value: [formData?.State]
                      },
                      {
                        name: ["City"],
                        value: [formData?.City]
                      },
                      {
                        name: ["msme"],
                        value: [formData?.msme]
                      },
                      {
                        name: ["pin_code"],
                        value: [formData?.pin_code]
                      },

                      {
                        name: ["username"],
                        value: [formData?.username]
                      },
                      {
                        name: ["Designation"],
                        value: [formData?.Designation]
                      },
                      {
                        name: ["work_segment"],
                        value: [...formval_workArea]
                      },
                      {
                        name: ["msme_number"],
                        value: [initialpf]
                      },
                    ]


                  }
                 
                  labelAlign="left"
                  scrollToFirstError={true}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
               

                >
                  {/**************  Entity Name *************/}
                  <Form.Item name="entity" label="Name of Entity" rules={[
                    {
                      required: true,
                      message: 'Please input your Entity Name!',
                    },
                  ]}>
                    <Input placeholder='Enter the Name of Your Firm' />
                  </Form.Item>
                  <div className='form_email_mobile_flex items-end'>
                    <div className='form_flex_children mr-2'>
                      <Form.Item label="Contact Person Full Name " name="username" rules={[
                        {
                          required: true,
                          message: 'Please input your Name!',
                        },
                      ]}>
                        <Input placeholder='Enter Contact Person Name' />
                      </Form.Item>
                    </div>
                    <div className='form_flex_children '>
                      <Form.Item name="Designation" label="Designation" rules={[
                        {
                          required: true,
                          message: 'Please input your Designation!',
                        },
                      ]}>
                        <Input placeholder='Enter the  Designation' />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='form_email_mobile_flex'>
                    {/*****************Email*******************/}
                    <div className='form_flex_children mr-2' >
                      <Form.Item name="email" label="Email " rules={[
                        {
                          required: true,
                          message: 'Please input your Email!'
                        },
                      ]} wrapperCol={{
                        span: 56,
                      }}>

                        <Input type="email" placeholder='Enter your Email ID ' />



                      </Form.Item>
                    </div>
                    {/*******************************************/}

                    {/************Mobile Number****************/}
                    <div className='form_flex_children'>

                      <Form.Item name="mobile_number" label="Mobile Number " rules={[
                        {
                          required: true,
                          message: 'Please input your Mobile Number!'
                        },
                      ]}>
                        <Input maxLength={10} minLength={10} placeholder='Enter the Mobile Number to be registered' />
                      </Form.Item>
                    </div>
                    {/*******************************************/}
                  </div>
                  <div className='flex flex-col md:flex-row '>
                    <div className='form_flex_children mr-1'>
                      <Form.Item name="State" label="State " rules={[
                        {
                          required: true,
                          message: 'Please input your State!'
                        },
                      ]}>

                        <Select name="State" placeholder="Select State" onSelect={countrySelectHandler}>
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
                  {/*******************************************/}

                  {/**************  Work Segment *************/}
                  <Form.Item name="work_segment" label="Work Segment" rules={[
                    {
                      required: true,
                      message: 'Please select your Work Segment!'
                    },
                  ]}>
                    <Select mode="multiple"
                      allowClear placeholder="List of Categories Dropdown with Multiselect">
                      {work_segment.map((option, index) => {

                        return <Select.Option key={index} value={option}>{option}</Select.Option>
                      })}
                      <Select.Option value={"other"}>Other</Select.Option>
                    </Select>
                  </Form.Item>
                  {/*******************************************/}
                  <Form.Item name="prefferd_state" label="Preferred State to Work " rules={[
                    {
                      required: true,
                      message: 'Please input your State!'
                    },
                  ]}
                  >

                    <Select mode="multiple" name="prefferd_state" placeholder="Select State" >
                      <Select.Option value="All State">All State</Select.Option>
                      {Object.keys(state_cites).map((state, index) => {
                        return (<Select.Option key={index} value={state}>{state}</Select.Option>)
                      }
                      )}
                    </Select>
                  </Form.Item>

                  {/**************  Work Segment *************/}
                  {/* <Form.Item name="work_segment" label="Work Segment" rules={[
              {
                required: true,
                message: 'Please select your Work Segment!'
              },
            ]}>
              <Select mode="multiple"
                allowClear placeholder="List of Categories Dropdown with Multiselect">
                {work_segment.map((option) => {

                  return <Select.Option value={option}>{option}</Select.Option>
                })}
                <Select.Option value={"other"}>Other</Select.Option>
              </Select>
            </Form.Item> */}
                  {/*******************************************/}
                  {/* <Form.Item name="prefferd_state" label="Preffered State to Work " rules={[
              {
                required: true,
                message: 'Please input your State!'
              },
            ]}
            >

              <Select id="country-state" mode="multiple" name="prefferd_state" placeholder="Select State" >
                <Select.Option value="All State">All State</Select.Option>
                {Object.keys(state_cites).map((state) => {
                  return (<Select.Option value={state}>{state}</Select.Option>)
                }
                )}
              </Select>
            </Form.Item> */}

                  <Form.Item name="Address" label="Office Address " rules={[
                    {
                      required: true,
                      message: 'Please input your Address!',
                    },
                  ]}>
                    <Input placeholder='Enter Your Office Address' />
                  </Form.Item>


                  <Form.Item name="msme" label="Do you have MSME ?" required >
                    <Select placeholder="Please select an option">
                      <Select.Option value={"Yes"}>Yes</Select.Option>
                      <Select.Option value={"No"}>No</Select.Option>
                    </Select>
                  </Form.Item>
                  <div className='form_email_mobile_flex'><div className='form_flex_children mr-2'>
                    <Form.Item name="msme_number" className='mb-0' label="PF Number" rules={[
                      {
                        required: true,
                        message: 'Please provide required details!'
                      },
                    ]}>
                      <Input placeholder='Enter your PF Number' onChange={msmeVerfication} />
                    </Form.Item>
                    {valid_msme && <span style={{ color: '#ff4d4f' }}>Please Enter valid PF Number*</span>} </div>
                    <div className='form_flex_children '>
                      <Form.Item name="msme_image" label="Copy of PF">
                        <Input type='file' max={1} onChange={msme_img_value} />
                      </Form.Item> </div> </div>




                  <div className='flex justify-center'>
                    <button
                      type="submit"
                      className="inline-block px-7 py-3 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#FF5759] hover:shadow-lg focus:bg-[#FF5757] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FF5757] active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Next
                    </button>
                  </div>
                </Form>
                :
                <Form
                  form={form}
                  labelCol={{
                    span: 37,
                  }}
                  wrapperCol={{
                    span: 44,
                  }}
                  layout="vertical"
                  fields={
                    [
                      { "name": "email", "value": location.state?.email },
                      { "name": "mobile_number", "value": location.state?.number },
                    ]

                  }
                  size="default"
                  labelAlign="left"
                  scrollToFirstError={true}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  

                >
                  {/**************  Entity Name *************/}
                  <Form.Item name="entity" label="Name of Entity" rules={[
                    {
                      required: true,
                      message: 'Please input your Entity Name!',
                    },
                  ]}>
                    <Input placeholder='Enter the Name of Your Firm' />
                  </Form.Item>
                  <div className='form_email_mobile_flex items-end'>
                    <div className='form_flex_children mr-2'>
                      <Form.Item label="Contact Person Full Name " name="username" rules={[
                        {
                          required: true,
                          message: 'Please input your Name!',
                        },
                      ]}>
                        <Input placeholder='Enter Contact Person Name' />
                      </Form.Item>
                    </div>
                    <div className='form_flex_children '>
                      <Form.Item name="Designation" label="Designation" rules={[
                        {
                          required: true,
                          message: 'Please input your Designation!',
                        },
                      ]}>
                        <Input placeholder='Enter the  Designation' />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='form_email_mobile_flex'>
                    {/*****************Email*******************/}
                    <div className='form_flex_children mr-2' >
                      <Form.Item name="email" label="Email " rules={[
                        {
                          required: true,
                          message: 'Please input your Email!'
                        },
                      ]} wrapperCol={{
                        span: 56,
                      }}>

                        <Input type="email" placeholder='Enter your Email ID ' />



                      </Form.Item>
                    </div>
                    {/*******************************************/}

                    {/************Mobile Number****************/}
                    <div className='form_flex_children'>

                      <Form.Item name="mobile_number" label="Mobile Number " rules={[
                        {
                          required: true,
                          message: 'Please input your Mobile Number!'
                        },
                      ]}>
                        <Input maxLength={10} minLength={10} placeholder='Enter the Mobile Number to be registered' />
                      </Form.Item>
                    </div>
                    {/*******************************************/}
                  </div>
                  <div className='flex flex-col md:flex-row '>
                    <div className='form_flex_children mr-1'>
                      <Form.Item name="State" label="State " rules={[
                        {
                          required: true,
                          message: 'Please input your State!'
                        },
                      ]}>

                        <Select name="State" placeholder="Select State" onSelect={countrySelectHandler}>
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
                  {/*******************************************/}

                  {/**************  Work Segment *************/}
                  <Form.Item name="work_segment" label="Work Segment" rules={[
                    {
                      required: true,
                      message: 'Please select your Work Segment!'
                    },
                  ]}>
                    <Select mode="multiple"
                      allowClear placeholder="List of Categories Dropdown with Multiselect">
                      {work_segment.map((option, index) => {

                        return <Select.Option key={index} value={option}>{option}</Select.Option>
                      })}
                      <Select.Option value={"other"}>Other</Select.Option>
                    </Select>
                  </Form.Item>
                  {/*******************************************/}
                  <Form.Item name="prefferd_state" label="Preferred State to Work " rules={[
                    {
                      required: true,
                      message: 'Please input your State!'
                    },
                  ]}
                  >

                    <Select mode="multiple" name="prefferd_state" placeholder="Select State" >
                      <Select.Option value="All State">All State</Select.Option>
                      {Object.keys(state_cites).map((state, index) => {
                        return (<Select.Option key={index} value={state}>{state}</Select.Option>)
                      }
                      )}
                    </Select>
                  </Form.Item>

                  {/**************  Work Segment *************/}
                  {/* <Form.Item name="work_segment" label="Work Segment" rules={[
                {
                  required: true,
                  message: 'Please select your Work Segment!'
                },
              ]}>
                <Select mode="multiple"
                  allowClear placeholder="List of Categories Dropdown with Multiselect">
                  {work_segment.map((option) => {

                    return <Select.Option value={option}>{option}</Select.Option>
                  })}
                  <Select.Option value={"other"}>Other</Select.Option>
                </Select>
              </Form.Item> */}
                  {/*******************************************/}
                  {/* <Form.Item name="prefferd_state" label="Preffered State to Work " rules={[
                {
                  required: true,
                  message: 'Please input your State!'
                },
              ]}
              >

                <Select id="country-state" mode="multiple" name="prefferd_state" placeholder="Select State" >
                  <Select.Option value="All State">All State</Select.Option>
                  {Object.keys(state_cites).map((state) => {
                    return (<Select.Option value={state}>{state}</Select.Option>)
                  }
                  )}
                </Select>
              </Form.Item> */}

                  <Form.Item name="Address" label="Office Address " rules={[
                    {
                      required: true,
                      message: 'Please input your Address!',
                    },
                  ]}>
                    <Input placeholder='Enter Your Office Address' />
                  </Form.Item>


                  <Form.Item name="msme" label="Do you have MSME ?" required >
                    <Select placeholder="Please select an option">
                      <Select.Option value={"Yes"}>Yes</Select.Option>
                      <Select.Option value={"No"}>No</Select.Option>
                    </Select>
                  </Form.Item>
                  <div className='form_email_mobile_flex'><div className='form_flex_children mr-2'>
                    <Form.Item name="msme_number" className='mb-0' label="PF Number" rules={[
                      {
                        required: true,
                        message: 'Please provide required details!'
                      },
                    ]}>
                      <Input placeholder='Enter your PF Number' onChange={msmeVerfication} />
                    </Form.Item>
                    {valid_msme && <span style={{ color: '#ff4d4f' }}>Please Enter valid PF Number*</span>} </div>
                    <div className='form_flex_children '>
                      <Form.Item name="msme_image" label="Copy of PF">
                        <Input type='file'  max={1} onChange={msme_img_value} />
                      </Form.Item> </div> </div>




                  <div className='flex justify-center'>
                    <button
                      type="submit"
                      className="inline-block px-32 mt-4 py-3 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded-[50px] shadow-md hover:bg-[#FF5759] hover:shadow-lg focus:bg-[#FF5757] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FF5757] active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Next
                    </button>
                  </div>
                </Form>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetails