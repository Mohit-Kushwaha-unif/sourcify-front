import {
  Button,
  Form,
  Input,
  Select,
  Checkbox,
  Radio,
  Upload,
  message
} from 'antd';
import state_cites from '../../../assests/state_city.';
import { useEffect, useState } from 'react';
// import work_segment from '../../../assests/options';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import * as Contractor_service from '../../../services/contractor'
import { useDispatch } from 'react-redux';
import { DatePicker } from 'antd';
import { AiFillDelete } from 'react-icons/ai'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { get_category } from '../../../services/category';
import { update_user, update_user_info } from '../../../services/user';
import moment from 'moment';
import { upload_img } from '../../../services/upload';
const PersonalDetails = () => {
  const location = useLocation()
  const navigation = useNavigate()
  const [valid_pan, set_Valid_pan] = useState(false)
  const dispatch = useDispatch()
  const disabledDate = (current) => current && current > moment().endOf('year');
  const [valid_gst, set_Valid_gst] = useState(false)
  // const [isMSMEVisible, setIsMSMEVisible] = useState(false)
  const [msmeImageD, set_msmeImageD] = useState('')
  const [formData, setFormData] = useState([])

  const [state, setState] = useState([])
  const [formVal_work_state, setFormVal_work_state] = useState([])
  const [preview_img, set_preveiwimg] = useState([])
  const [showGSTiMAGE, setShowGSTimage] = useState(false)
  const [project, setProjects] = useState([])
  const [work_segment, set_work_Segment] = useState([])
  const [initialpf, setStateInitialpf] = useState()
  const [formval_workArea, setFormVal_work_area] = useState([])
  const [valid_msme, set_Valid_msme] = useState(false)
  const [categories, setCategories] = useState([])
  const [sub_cat, setSub_cat] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [turnover, setTurnover] = useState([])
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [saved,isSaved] = useState(false)
  const [year, setYear] = useState([])
  const handleFileUpload = async (event, index) => {
    const { getFieldValue, setFieldsValue } = form;
    const Project = getFieldValue('Project');
    const project = Project[index];
    const newProjectImg = [];
    const newFileList = [...fileList];

    const uploadPromises = Array.from(event.target.files).map((file) => {
      var formData = new FormData();
      formData.append("File", file)
      return dispatch(upload_img(formData)).then((res) => {
        console.log(res);
        newProjectImg.push(res);
      });
    });

    await Promise.all(uploadPromises);

    setFieldsValue({
      Project: [
        ...Project.slice(0, index),
        {
          ...project,
          project_img: newProjectImg,
        },
        ...Project.slice(index + 1),
      ],
    });

    newFileList[index] = event.target.files;
    setFileList(newFileList);
  };


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
  var work_area_types = []

  var years = []
  useEffect(() => {
    if (localStorage.getItem("form_id")) {
      dispatch(Contractor_service.get_contractorBy_id(localStorage.getItem("form_id"))).then((res) => {
        setFormData(res)
        if (Object.keys(res).includes('msme_image') && res.msme_image != 'not provided') {
          setShowGSTimage(true)
        }

        res?.turnover?.map((_, index) => {
          Object.keys(_, [index]).map((turnOvers) => {
            years.push(turnOvers)
            setYear(prevState => [...prevState, _[turnOvers]])
          })
        })
        var projects = []
        res?.projects?.map((project) => {
          var Exec = moment(project.Exec)
          project.Exec = Exec
          projects.push(project)


          set_preveiwimg(prevState => [...prevState, project.project_img])
        })
        setProjects(projects)
        var data = []
        res?.turnover?.map((val) => {
          Object.keys(val).map((turn) => {
            var obj = {}
            obj["name"] = turn
            obj["value"] = val[turn]
            data.push(val)
          })
        })
        setTurnover(data)
        res.work_area.map((work) => {
          setSelectedItems((prev_state) => [...prev_state, work.work_segment])
          work_area.push(work.work_segment)
        })
        res.work_area_types.map((options) => {
          Object.keys(options).map((opt_val) => {
            var obj = {}
            obj["name"] = opt_val
            obj["value"] = options[opt_val]
            work_area_types.push(obj)
          })
        })

        // setFormVal_work_area(work_area)
        res.prefferd_states.map((state) => {
          prefferd_state.push(state)
        })
        setFormVal_work_state(prefferd_state)
        setSelectedOptions(work_area_types)

        setStateInitialpf(res.msme_number)
      })
    }

  }, [])
  console.log(preview_img)
  const onFinish = (value) => {
    console.log(value)
    var Turnover = []
    Object.keys(value).map((key) => {
      if (key.includes('Turnover')) {
        var obj = {}
        obj[key] = value[key]
        Turnover.push(obj)
      }
    })
    value.Project = JSON.stringify(value.Project)
    value.Turnover = JSON.stringify(Turnover)
    var work_area_types = []
    Object.keys(value).map((val_item) => {
      value.work_segment.map((work) => {
        if (val_item === work) {

          work_area_types.push({ [val_item]: value[val_item] })
        }
      })
    })


    value["work_area_types"] = JSON.stringify([...work_area_types])
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
    if (localStorage.getItem("form_id")) {
      formData.append('form_id', localStorage.getItem("form_id"))
      dispatch(Contractor_service.update_contractor(formData)).then((res) => {
        var obj = {}
        obj.id = value.user_id
        obj.contractor_id = res.data._id

        dispatch(update_user_info(obj)).then((response) => {
          isSaved(true)
          // console.log(response)
          // navigation("/contractor-form/financial-detail")
        })
      })
    }
    else {
      dispatch(Contractor_service.add_contractor(formData)).then((res) => {
        var obj = {}
        obj.id = value.user_id
        obj.contractor_id = res.user_data._id
        dispatch(update_user_info(obj)).then((response) => {
          isSaved(true)
          // console.log(response)
          // navigation("/contractor-form/financial-detail")
        })
      })
    }

  }
  useEffect(() => {
    dispatch(get_category()).then((res) => {

      res.map((cat) => {

        setSub_cat((prev_state) => [...prev_state, cat])
        setCategories((prev_state) => [...prev_state, cat.category])
      })
    })
  }, [])

  const onFinishFailed = (value) => {
    console.log('error', value)
  }

  function msme_img_value(e) {
    set_msmeImageD(e.target.files[0])
  }

  function countrySelectHandler(country) {
    setState(state_cites[country])
  }

  // function msmeVerfication(event) {
  //   let text = event.target.value
  //   var regex = /^[A-Z]{2}[\\s\\/]?[A-Z]{3}[\\s\\/]?[0-9]{7}[\\s\\/]?[0-9]{3}[\\s\\/]?[0-9]{7}$/;
  //   if (text.length < 1) {
  //     set_Valid_msme(false)
  //   }
  //   else if (regex.test(text)) {
  //     set_Valid_msme(false)
  //   } else {
  //     set_Valid_msme(true)
  //   }
  // }
  const pancardValidation = (event) => {
    let text = event.target.value
    var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (text.length < 1) {
      set_Valid_pan(false)
    }

    else if (regex.test(text)) {
      set_Valid_pan(false)
    } else {
      set_Valid_pan(true)
    }
  }
  function ValidateGSTNumber(event) {
    let text = event.target.value
    var regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (text.length < 1) {
      set_Valid_gst(false)
    }
    else if (regex.test(text)) {
      set_Valid_gst(false)
    } else {
      set_Valid_gst(true)
    }

  }


  return (
    <>

      <div className='w-full min-h-min mt-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8 '>
        <div className="px-8 w-full h-full text-gray-800">
          <div
            className="flex w-full xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 "
          >
            <div className=" xl:mx-20 xl:w-11/12 lg:w-11/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-lg mb-0 mr-4">Basic Details</p>
               {saved&& <p className='text-[#FF5757]'>Your Profile Submitted Successfully</p>}
              </div>
              <div
                className="flex items-center my-3 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
              >
              </div>

              {
                !Array.isArray(formData) > 0 ?
                <Form
                form={form}
                labelCol={{
                  span: 37,
                }}
                wrapperCol={{
                  span: 44,
                }}

                layout="vertical"
                fields=
                {
                  [
                    { "name": "email", "value": formData?.user_id?.email },
                    { "name": "mobile_number", "value": formData?.user_id?.number },
                    {
                      name: "entity",
                      "value": formData.entity
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
                      name: "msme",
                      value: formData?.msme
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
                      value: [...selectedItems]
                    },
                    {
                      name: ["msme_number"],
                      value: [initialpf]
                    },
                    {
                      name: ["prefferd_state"],
                      value: [...formVal_work_state]
                    },
                    ...selectedOptions,
                    turnover,
                    {
                      name: ["Approved_Limit"],
                      value: formData?.bank_overdraft?.length > 0 ? formData?.bank_overdraft[0].approved : ''
                    },
                    {
                      name: ["consumed"],
                      value: formData?.bank_overdraft?.length > 0 ? formData?.bank_overdraft[0].consumed : ''
                    },
                    {
                      name: [`Turnover_${new Date().getFullYear()}`],
                      value: year[0]
                    },
                    {
                      name: [`Turnover_${new Date().getFullYear() - 1}`],
                      value: year[1]
                    },
                    {
                      name: [`Turnover_${new Date().getFullYear() - 2}`],
                      value: year[2]
                    },

                    {
                      name: ["pan_number"],
                      value: formData.pan_number
                    },
                    {
                      name: ["gst_number"],
                      value: formData.gst_number
                    },
                    {
                      name: ["Project"],
                      value: [...project]
                    }

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
                <Form.Item name="entity" label="Name of entity" rules={[
                  {
                    required: true,
                    message: 'Please enter your entity name',
                  },
                ]}>
                  <Input placeholder='Enter the name of Your entity' />
                </Form.Item>
                <div className='form_email_mobile_flex flex-col md:flex-row '>
                  <div className='form_flex_children mr-2'>
                    <Form.Item label="Contact person full name " name="username" rules={[
                      {
                        required: true,
                        message: 'Please enter your Name',
                      },
                    ]}>
                      <Input placeholder='Enter contact person name' />
                    </Form.Item>
                  </div>
                  <div className='form_flex_children '>
                    <Form.Item name="Designation" label="Designation">
                      <Input placeholder='Enter the  designation' />
                    </Form.Item>
                  </div>
                </div>
                <div className='form_email_mobile_flex flex flex-col md:flex-row'>
                  {/*****************Email*******************/}
                  <div className='form_flex_children mr-2' >
                    <Form.Item name="email" label="Email " rules={[
                      {
                        required: true,
                        message: 'Please enter  email'
                      },
                    ]} wrapperCol={{
                      span: 56,
                    }}>

                      {
                        localStorage.getItem('email') != null && !localStorage.getItem("adminEmail") ? <Input disabled placeholder='Enter Your Email' /> : <Input placeholder='Enter Your Email' />
                      }


                    </Form.Item>
                  </div>
                  {/*******************************************/}

                  {/************Mobile Number****************/}
                  <div className='form_flex_children'>

                    <Form.Item name="mobile_number" label="Mobile number " rules={[
                      {
                        required: true,
                        message: 'Please enter your mobile number'
                      },
                    ]}>
                      {
                        localStorage.getItem('number') != null && !localStorage.getItem("adminEmail") ? <Input disabled maxLength={10} minLength={10} type="Number" placeholder='Enter Your Number' /> : <Input maxLength={10} minLength={10} type="Number" placeholder='Enter Your Number' />
                      }
                      {/* <Input maxLength={10} minLength={10} placeholder='Enter the Mobile number to be registered' /> */}
                    </Form.Item>
                  </div>
                  {/*******************************************/}
                </div>
                <Form.Item name="Address" label="Office address ">
                  <Input placeholder='Enter Your Office address' />
                </Form.Item>
                <div className='flex flex-col md:flex-row '>
                  <div className='form_flex_children mr-1'>
                    <Form.Item name="State" label="State " rules={[
                      {
                        required: true,
                        message: 'Please enter your State'
                      },
                    ]}>

                      <Select name="State" placeholder="Select state" onSelect={countrySelectHandler}>
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
                        message: 'Please enter your City',
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
                    <Form.Item name="pin_code" label="PIN code " rules={[
                      {
                        required: true,
                        message: 'Please enter your PIN code',

                      },
                    ]}>
                      <Input maxLength={6} minLength={6} placeholder="Enter 6 digit PIN code" />
                    </Form.Item>
                  </div>
                </div>
                {/*******************************************/}

                {/**************  Work Segment *************/}
                <Form.Item name="work_segment" label="Work segment" rules={[
                  {
                    required: true,
                    message: 'Please select your Work Segment'
                  },
                ]}>
                  <Select mode="multiple" onChange={setSelectedItems}
                    allowClear placeholder="List of work segments">
                    {work_segment.map((option, index) => {

                      return <Select.Option key={index} value={option}>{option}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
                {selectedItems.length > 0 && selectedItems.map((sub_item) => {
                  return sub_cat.map((sub_category) => {
                    return sub_item === sub_category.category && sub_category.sub_category != 'N/A' && <>
                      {
                        <Form.Item name={sub_item} className='mb-1' label={`Select Sub Category for ${sub_item}`} rules={[
                          {
                            required: true,
                            message: 'Please Select options!',
                          },
                        ]}>
                          <Checkbox.Group className='grid md:grid-cols-5 gap-3'>
                            {sub_category.sub_category.map((item, index) => {
                              return (
                                <Checkbox
                                  key={item.sub_Category}
                                  className={`ml-${index === 0 ? 2 : 0} capitalize`}
                                  value={item.sub_Category}
                                >
                                  {item.sub_Category}
                                </Checkbox>
                              );
                            })}
                          </Checkbox.Group>
                        </Form.Item>
                      }

                    </>
                  })
                })
                }
                {/*******************************************/}
                <Form.Item name="prefferd_state" label="Preferred state to work " rules={[
                  {
                    required: true,
                    message: 'Please enter your State'
                  },
                ]}
                >

                  <Select mode="multiple" name="prefferd_state" placeholder="Select state" >
                    <Select.Option value="All State">All State</Select.Option>
                    {Object.keys(state_cites).map((state, index) => {
                      return (<Select.Option key={index} value={state}>{state}</Select.Option>)
                    }
                    )}
                  </Select>
                </Form.Item>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-3 '>
                  <div>
                    <Form.Item name="msme_number" className='mb-0' label="PF Number" rules={[
                      {
                        required: true,
                        message: 'Please provide PF number'
                      },
                    ]}>
                      {/* <Input placeholder='Enter your PF number' onChange={msmeVerfication} /> */}
                      <Input placeholder='Enter your PF number' />
                    </Form.Item>

                    {valid_msme && <span style={{ color: '#ff4d4f' }}>Please Enter valid PF Number*</span>}
                  </div>

                  <div>
                    <Form.Item name="pan_number" label="PAN Number" className='mb-0' rules={[
                      {
                        required: true,
                        message: 'Please provide PAN number'
                      },
                    ]}
                    >
                      <Input onChange={pancardValidation} maxLength={10} minLength={10} placeholder='Enter Your PAN Number' />
                    </Form.Item>
                    {valid_pan && <span style={{ color: '#ff4d4f' }}>Please Enter valid PAN Number*</span>}

                  </div>
                  <div>
                    <Form.Item name="gst_number" className='mb-0' label="GST Number">
                      <Input onChange={ValidateGSTNumber} placeholder="Please enter your GST Number" />
                    </Form.Item>
                    {valid_gst && <span style={{ color: '#ff4d4f' }}>Please Enter valid GST Number*</span>}
                  </div>
                </div>
                <Form.Item name="msme" label="Do you have MSME ?" required >
                  <Radio.Group >
                    <Radio value={"Yes"}>Yes</Radio>
                    <Radio value={"No"}>No</Radio>
                  </Radio.Group>
                </Form.Item>
                <div className="flex flex-row items-center mt-5 justify-center lg:justify-start">
                  <p className="text-lg mb-0 mr-4">Financial Details</p>
                </div>
                <div
                  className="flex items-center my-1 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                >
                </div>

                <div className=' mt-5 mb-2'>Last Three Years Turnovers<span className='intialValue'></span></div>
                <div className='grid grid-cols-1  md:grid-cols-3 gap-2'>
                  <Form.Item name={`Turnover_${new Date().getFullYear()}`} label={`Turnover of ${new Date().getFullYear()}`}
                  >
                    <Input type='number' placeholder='Please enter turnover amount' />
                  </Form.Item>
                  <Form.Item name={`Turnover_${new Date().getFullYear() - 1}`} label={`Turnover of ${new Date().getFullYear() - 1}`}
                  >

                    <Input type='number' placeholder='Please enter turnover amount' />
                  </Form.Item>
                  <Form.Item name={`Turnover_${new Date().getFullYear() - 2}`} label={`Turnover of ${new Date().getFullYear() - 2}`}
                  >

                    <Input type='number' placeholder='Please enter turnover amount' />
                  </Form.Item>
                </div>
                <div className='mb-1'>Bank Overdraft Limit / Solvency Certificate Value</div>
                <div className='grid grid-cols-1  md:grid-cols-2 gap-2'>
                  <Form.Item name="Approved_Limit" label="Approved Limit "
                    className="mb-1"
                  >

                    <Input type='number' placeholder='Please enter  amount' />
                  </Form.Item>
                  <Form.Item name="consumed" label="Consumed " className="mt-0"
                  >

                    <Input type='number' placeholder='Please enter turnover amount' />
                  </Form.Item>
                </div>
                <div className="flex flex-row items-center mt-5 justify-center lg:justify-start">
                  <p className="text-lg mb-0 mr-4">Work Experience</p>
                </div>
                <div
                  className="flex items-center my-1 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                >
                </div>
                <p className='mt-5 mb-2 '>Projects</p>

                <Form.List name="Project">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <div key={field.key}>
                          <div className="grid grid-cols-2 w-full">
                            <p className="flex mb-3">#Project {index + 1} </p>
                            <div className="float-right">
                              <span
                                className="mb-3 text-[#FF5757] cursor-pointer underline float-right "
                                onClick={() => remove(field.name)}
                              >
                                <AiFillDelete className="ml-2 cursor-pointer w-5 h-5 float-right" />
                                Remove
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <Form.Item
                              {...field}
                              name={[field.name, 'Client_Name']}
                              fieldKey={[field.fieldKey, 'Client_Name']}
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
                              {...field}
                              name={[field.name, 'Contract_Value']}
                              fieldKey={[field.fieldKey, 'Contract_Value']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing Contract Value',
                                },
                              ]}
                            >
                              <Input type="number" placeholder="Contract Value" />
                            </Form.Item>

                            <Form.Item
                              {...field}
                              name={[field.name, 'Exec']}
                              fieldKey={[field.fieldKey, 'Exec']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing Year of Execution',
                                },
                              ]}
                            >
                              <DatePicker
                                style={{ width: '100%' }}
                                disabledDate={disabledDate}
                                placeholder="Year of Execution"
                                picker="year"
                              />
                            </Form.Item>

                            {preview_img.length > 0 ? (
                              <>
                                <br />
                                <p className='text-[#FF5757]'>Project Images</p>
                                {preview_img.map((link, ind) => {
                                  return (
                                    <div className={`grid grid-cols-1 md:grid-cols-${link.length} gap-4 mb-3`}>
                                      {ind === index &&
                                        link.map(img => {
                                          console.log({ img });
                                          return <Link to={img}>Preview</Link>;
                                        })}
                                    </div>
                                  );
                                })}
                              </>
                            ) : (
                              <Form.Item {...field} name={[field.name, 'project_img']} valuePropName='fileList'>
                                <input type='file' name='myFile' onChange={event => handleFileUpload(event, index)} multiple />
                              </Form.Item>
                            )}



                          </div>
                        </div>
                      ))}

                      <Form.Item>
                        <Button
                          className="flex justify-center items-baseline"
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Project
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>

                <div className='text-center flex flex-col flex-col-reverse md:flex-row justify-center'>
                  {/* <button
                    type="submit"
                    className="back_btn"  >
                    Next
                  </button> */}
                  <button
                    type="submit"
                    className="save_Btn"  >
                    Save
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
                  fields=
                  {
                    [
                      { "name": "email", "value": localStorage.getItem("email") },
                      { "name": "mobile_number", "value": localStorage.getItem("number") },
                     
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
                  <Form.Item name="entity" label="Name of entity" rules={[
                    {
                      required: true,
                      message: 'Please enter your entity name',
                    },
                  ]}>
                    <Input placeholder='Enter the name of Your entity' />
                  </Form.Item>
                  <div className='form_email_mobile_flex flex-col md:flex-row '>
                    <div className='form_flex_children mr-2'>
                      <Form.Item label="Contact person full name " name="username" rules={[
                        {
                          required: true,
                          message: 'Please enter your Name',
                        },
                      ]}>
                        <Input placeholder='Enter contact person name' />
                      </Form.Item>
                    </div>
                    <div className='form_flex_children '>
                      <Form.Item name="Designation" label="Designation">
                        <Input placeholder='Enter the  designation' />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='form_email_mobile_flex flex flex-col md:flex-row'>
                    {/*****************Email*******************/}
                    <div className='form_flex_children mr-2' >
                      <Form.Item name="email" label="Email " rules={[
                        {
                          required: true,
                          message: 'Please enter  email'
                        },
                      ]} wrapperCol={{
                        span: 56,
                      }}>

                        {
                          localStorage.getItem('email') != null && !localStorage.getItem("adminEmail") ? <Input disabled placeholder='Enter Your Email' /> : <Input placeholder='Enter Your Email' />
                        }


                      </Form.Item>
                    </div>
                    {/*******************************************/}

                    {/************Mobile Number****************/}
                    <div className='form_flex_children'>

                      <Form.Item name="mobile_number" label="Mobile number " rules={[
                        {
                          required: true,
                          message: 'Please enter your mobile number'
                        },
                      ]}>
                        {
                          localStorage.getItem('number') != null && !localStorage.getItem("adminEmail") ? <Input disabled maxLength={10} minLength={10} type="Number" placeholder='Enter Your Number' /> : <Input maxLength={10} minLength={10} type="Number" placeholder='Enter Your Number' />
                        }
                        {/* <Input maxLength={10} minLength={10} placeholder='Enter the Mobile number to be registered' /> */}
                      </Form.Item>
                    </div>
                    {/*******************************************/}
                  </div>
                  <Form.Item name="Address" label="Office address ">
                    <Input placeholder='Enter Your Office address' />
                  </Form.Item>
                  <div className='flex flex-col md:flex-row '>
                    <div className='form_flex_children mr-1'>
                      <Form.Item name="State" label="State " rules={[
                        {
                          required: true,
                          message: 'Please enter your State'
                        },
                      ]}>

                        <Select name="State" placeholder="Select state" onSelect={countrySelectHandler}>
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
                          message: 'Please enter your City',
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
                      <Form.Item name="pin_code" label="PIN code " rules={[
                        {
                          required: true,
                          message: 'Please enter your PIN code',

                        },
                      ]}>
                        <Input maxLength={6} minLength={6} placeholder="Enter 6 digit PIN code" />
                      </Form.Item>
                    </div>
                  </div>
                  {/*******************************************/}

                  {/**************  Work Segment *************/}
                  <Form.Item name="work_segment" label="Work segment" rules={[
                    {
                      required: true,
                      message: 'Please select your Work Segment'
                    },
                  ]}>
                    <Select mode="multiple" onChange={setSelectedItems}
                      allowClear placeholder="List of work segments">
                      {work_segment.map((option, index) => {

                        return <Select.Option key={index} value={option}>{option}</Select.Option>
                      })}
                    </Select>
                  </Form.Item>
                  {selectedItems.length > 0 && selectedItems.map((sub_item) => {
                    return sub_cat.map((sub_category) => {
                      return sub_item === sub_category.category && sub_category.sub_category != 'N/A' && <>
                        {
                          <Form.Item name={sub_item} className='mb-1' label={`Select Sub Category for ${sub_item}`} rules={[
                            {
                              required: true,
                              message: 'Please Select options!',
                            },
                          ]}>
                            <Checkbox.Group className='grid md:grid-cols-5 gap-3'>
                              {sub_category.sub_category.map((item, index) => {
                                return (
                                  <Checkbox
                                    key={item.sub_Category}
                                    className={`ml-${index === 0 ? 2 : 0} capitalize`}
                                    value={item.sub_Category}
                                  >
                                    {item.sub_Category}
                                  </Checkbox>
                                );
                              })}
                            </Checkbox.Group>
                          </Form.Item>
                        }

                      </>
                    })
                  })
                  }
                  {/*******************************************/}
                  <Form.Item name="prefferd_state" label="Preferred state to work " rules={[
                    {
                      required: true,
                      message: 'Please enter your State'
                    },
                  ]}
                  >

                    <Select mode="multiple" name="prefferd_state" placeholder="Select state" >
                      <Select.Option value="All State">All State</Select.Option>
                      {Object.keys(state_cites).map((state, index) => {
                        return (<Select.Option key={index} value={state}>{state}</Select.Option>)
                      }
                      )}
                    </Select>
                  </Form.Item>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-3 '>
                    <div>
                      <Form.Item name="msme_number" className='mb-0' label="PF Number" rules={[
                        {
                          required: true,
                          message: 'Please provide PF number'
                        },
                      ]}>
                        {/* <Input placeholder='Enter your PF number' onChange={msmeVerfication} /> */}
                        <Input placeholder='Enter your PF number' />
                      </Form.Item>

                      {valid_msme && <span style={{ color: '#ff4d4f' }}>Please Enter valid PF Number*</span>}
                    </div>

                    <div>
                      <Form.Item name="pan_number" label="PAN Number" className='mb-0' rules={[
                        {
                          required: true,
                          message: 'Please provide PAN number'
                        },
                      ]}
                      >
                        <Input onChange={pancardValidation} maxLength={10} minLength={10} placeholder='Enter Your PAN Number' />
                      </Form.Item>
                      {valid_pan && <span style={{ color: '#ff4d4f' }}>Please Enter valid PAN Number*</span>}

                    </div>
                    <div>
                      <Form.Item name="gst_number" className='mb-0' label="GST Number">
                        <Input onChange={ValidateGSTNumber} placeholder="Please enter your GST Number" />
                      </Form.Item>
                      {valid_gst && <span style={{ color: '#ff4d4f' }}>Please Enter valid GST Number*</span>}
                    </div>
                  </div>
                  <Form.Item name="msme" label="Do you have MSME ?" required >
                    <Radio.Group >
                      <Radio value={"Yes"}>Yes</Radio>
                      <Radio value={"No"}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <div className="flex flex-row items-center mt-5 justify-center lg:justify-start">
                    <p className="text-lg mb-0 mr-4">Financial Details</p>
                  </div>
                  <div
                    className="flex items-center my-1 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                  >
                  </div>

                  <div className=' mt-5 mb-2'>Last Three Years Turnovers<span className='intialValue'></span></div>
                  <div className='grid grid-cols-1  md:grid-cols-3 gap-2'>
                    <Form.Item name={`Turnover_${new Date().getFullYear()}`} label={`Turnover of ${new Date().getFullYear()}`}
                    >
                      <Input type='number' placeholder='Please enter turnover amount' />
                    </Form.Item>
                    <Form.Item name={`Turnover_${new Date().getFullYear() - 1}`} label={`Turnover of ${new Date().getFullYear() - 1}`}
                    >

                      <Input type='number' placeholder='Please enter turnover amount' />
                    </Form.Item>
                    <Form.Item name={`Turnover_${new Date().getFullYear() - 2}`} label={`Turnover of ${new Date().getFullYear() - 2}`}
                    >

                      <Input type='number' placeholder='Please enter turnover amount' />
                    </Form.Item>
                  </div>
                  <div className='mb-1'>Bank Overdraft Limit / Solvency Certificate Value</div>
                  <div className='grid grid-cols-1  md:grid-cols-2 gap-2'>
                    <Form.Item name="Approved_Limit" label="Approved Limit "
                      className="mb-1"
                    >

                      <Input type='number' placeholder='Please enter  amount' />
                    </Form.Item>
                    <Form.Item name="consumed" label="Consumed " className="mt-0"
                    >

                      <Input type='number' placeholder='Please enter turnover amount' />
                    </Form.Item>
                  </div>
                  <div className="flex flex-row items-center mt-5 justify-center lg:justify-start">
                    <p className="text-lg mb-0 mr-4">Work Experience</p>
                  </div>
                  <div
                    className="flex items-center my-1 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                  >
                  </div>
                  <p className='mt-5 mb-2 '>Projects</p>

                  <Form.List name="Project">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, index) => (
                          <div key={field.key}>
                            <div className="grid grid-cols-2 w-full">
                              <p className="flex mb-3">#Project {index + 1} </p>
                              <div className="float-right">
                                <span
                                  className="mb-3 text-[#FF5757] cursor-pointer underline float-right "
                                  onClick={() => remove(field.name)}
                                >
                                  <AiFillDelete className="ml-2 cursor-pointer w-5 h-5 float-right" />
                                  Remove
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                              <Form.Item
                                {...field}
                                name={[field.name, 'Client_Name']}
                                fieldKey={[field.fieldKey, 'Client_Name']}
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
                                {...field}
                                name={[field.name, 'Contract_Value']}
                                fieldKey={[field.fieldKey, 'Contract_Value']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing Contract Value',
                                  },
                                ]}
                              >
                                <Input type="number" placeholder="Contract Value" />
                              </Form.Item>

                              <Form.Item
                                {...field}
                                name={[field.name, 'Exec']}
                                fieldKey={[field.fieldKey, 'Exec']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing Year of Execution',
                                  },
                                ]}
                              >
                                <DatePicker
                                  style={{ width: '100%' }}
                                  disabledDate={disabledDate}
                                  placeholder="Year of Execution"
                                  picker="year"
                                />
                              </Form.Item>

                              {preview_img.length > 0 ? (
                                <>
                                  <br />
                                  <p className='text-[#FF5757]'>Project Images</p>
                                  {preview_img.map((link, ind) => {
                                    return (
                                      <div className={`grid grid-cols-1 md:grid-cols-${link.length} gap-4 mb-3`}>
                                        {ind === index &&
                                          link.map(img => {
                                            console.log({ img });
                                            return <Link to={img}>Preview</Link>;
                                          })}
                                      </div>
                                    );
                                  })}
                                </>
                              ) : (
                                <Form.Item {...field} name={[field.name, 'project_img']} valuePropName='fileList'>
                                  <input type='file' name='myFile' onChange={event => handleFileUpload(event, index)} multiple />
                                </Form.Item>
                              )}



                            </div>
                          </div>
                        ))}

                        <Form.Item>
                          <Button
                            className="flex justify-center items-baseline"
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Project
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  <div className='text-center flex flex-col flex-col-reverse md:flex-row justify-center'>
                    {/* <button
                      type="submit"
                      className="back_btn"  >
                      Next
                    </button> */}
                    <button
                      type="submit"
                      className="save_Btn"  >
                      Save
                    </button>
                  </div>
                </Form>
              }

            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default PersonalDetails