import React from 'react'
import {
  Button,
  Form,
  Input,
  Select,
  Checkbox,
  Radio
} from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import state_cites from '../../../../../assests/state_city.';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Contractor_service from '../../../../../services/contractor'
import { useDispatch, useSelector } from 'react-redux';
import { get_category } from '../../../../../services/category';
import { DatePicker } from 'antd';
import { AiFillDelete } from 'react-icons/ai'
import moment from 'moment';
import { upload_img } from '../../../../../services/upload';
import Loader from '../../../../Helper/Loader';
const Personal_Detail_Tab = ({ formValues, isClicked }) => {
  const location = useLocation()
  const [fileList, setFileList] = useState([]);
  const [preview_img, set_preveiwimg] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMSMEVisible, setIsMSMEVisible] = useState(false)
  const [msmeImageD, set_msmeImageD] = useState('')
  const [turnover, setTurnover] = useState([])
  const [state, setState] = useState([])
  const isAdmin = useSelector(state => state.User.user_role);
  const [work_segment, set_work_Segment] = useState([])
  const [previewImg, setPreviewImg] = useState([]);
  const [year, setYear] = useState([])
  const [valid_msme, set_Valid_msme] = useState(false)
  const [initialEmail, setStateInitialValue] = useState('')
  const [valid_gst, set_Valid_gst] = useState(false)
  const [project, setProjects] = useState([])
  const [initialpf, setStateInitialpf] = useState('')
  const [sub_cat, setSub_cat] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [valid_pan, set_Valid_pan] = useState(false)
  const [showGSTiMAGE, setShowGSTimage] = useState(false)
  const [showPANimage, setShowPANimage] = useState(false)
  const [showMSMEimage, setShowMSMEImage] = useState(false)
  const [pan_imaged, set_panImageD] = useState('')
  const [gstImageD, set_gstImageD] = useState('')
  const [showCompnay_Img, setShowCompany_Img] = useState(false)
  const [company_Image, set_company_imgae] = useState('')
  const [contractor_status, set_Contractor_status] = useState(1)
  const [workArea,setWorkArea]= useState([])
  const [form] = Form.useForm();
  const WORK_SEGMENT = useSelector(state => state.User.Work_segment)
  var work_area_types = []
  var work_area = []
  var prefferd_state = []
  var work_area_types = []

  var years = []



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

    if (newProjectImg.length === 0) {
      newProjectImg.push('');
    }

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
    // setFileList(newFileList);
  };



  const handleRemoveImage = (index, imgIndex) => {
    const newPreviewImg = [...previewImg];
    newPreviewImg[index].splice(imgIndex, 1);
    setPreviewImg(newPreviewImg);
    const { getFieldValue, setFieldsValue } = form;
    const Project = getFieldValue('Project');
    const project = Project[index];
    const newProjectImg = [...project.projectIimg];
    newProjectImg.splice(imgIndex, 1);
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
  };

  const handleUpdateFileUpload = (event, index) => {
    const { getFieldValue, setFieldsValue } = form;
    const Project = getFieldValue('Project');
    const project = Project[index];

    const newProjectImg = [...project.project_img];
    const file = event.target.files[0];
    var formData = new FormData();
    formData.append("File", file);

    dispatch(upload_img(formData)).then((res) => {
      newProjectImg.push(res);

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
    });
  };




  const disabledDate = (current) => current && current > moment().endOf('year');

  useEffect(() => {
    if (formValues.msme_image !== "not provided") {
      setIsMSMEVisible(true)
    }
    if (formValues.msme_image === undefined) {
      setIsMSMEVisible(false)
    }
    formValues.work_area_types?.length > 0 && formValues.work_area_types.map((options) => {
      Object.keys(options).map((opt_val) => {
        var obj = {}
        obj["name"] = opt_val
        obj["value"] = options[opt_val]
        work_area_types.push(obj)
      })
    })
    formValues.work_area.length > 0 && formValues.work_area.map((work) => {
      setSelectedItems((prev_state) => [...prev_state, work.work_segment])
    })
    formValues?.turnover?.map((_, index) => {
      Object.keys(_, [index]).map((turnOvers) => {
        years.push(turnOvers)
        setYear(prevState => [...prevState, _[turnOvers]])
      })
    })
    var data = []
    formValues?.turnover?.map((val) => {
      Object.keys(val).map((turn) => {
        var obj = {}
        obj["name"] = turn
        obj["value"] = val[turn]
        data.push(val)
      })
    })
    var projects = []
    formValues?.projects?.map((project) => {
      var Exec = moment(project.Exec)
      project.Exec = Exec
      projects.push(project)

      setPreviewImg(prevState => [...prevState, project.project_img])
      set_preveiwimg(prevState => [...prevState, project.project_img])
    })

    if (formValues.pan_image && formValues.pan_image !== "undefined") {
      setShowPANimage(true)
    }
    if (formValues.gst_image && formValues.gst_image !== "undefined") {
      setShowGSTimage(true)
    }
    if (formValues.msme_image && formValues.msme_image !== "undefined") {
      setShowMSMEImage(true)
    }
    if (formValues.company_image && formValues.company_image.includes("http")) {
      setShowCompany_Img(true)
    }
    if (formValues.work_area) {
      formValues.work_area.map((work) => {
        work_area.push(work.work_segment)
      })
    }
    setWorkArea([...work_area])
    setProjects(projects)
    setTurnover(data)
    setSelectedOptions(work_area_types)
    if (formValues.msme_number == "undefined" || formValues.msme_number == "N/A") { setStateInitialpf("N/A") }
    else {
      setStateInitialpf(formValues.msme_number)
    }
    setStateInitialValue(location.state?.email)
  }, [])
  useEffect(() => {
    var data = []
    if (WORK_SEGMENT != undefined && WORK_SEGMENT.length > 0) {
      const segmentNames = WORK_SEGMENT.map((cat) => cat.name);
      set_work_Segment(segmentNames);
      WORK_SEGMENT.map((cat) =>
      data.push(cat) );
      setSub_cat(data)
    }
  }, []);

  useEffect(() => {
    var data = []
    if (work_segment.length === 0) {
      dispatch(get_category()).then((res) => {
        const segmentNames = res.map((cat) => cat.name);
        set_work_Segment(segmentNames);
       res.map((cat) =>
       data.push(cat) );
      setSub_cat(data)
      });
    }
  }, []);
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
  const onFinish = async (value) => {
    setLoading(true)
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

    if (pan_imaged !== '') {
      var formDatas = new FormData()
      formDatas.append('File', pan_imaged)
      await dispatch(upload_img(formDatas)).then((res) => {
        value.pan_image = res

      })
    }
    if (gstImageD !== '') {
      var formDatas = new FormData()
      formDatas.append('File', gstImageD)
      await dispatch(upload_img(formDatas)).then((res) => {
        value.gst_image = res

      })
    }
    if (msmeImageD !== '') {
      var formDatas = new FormData()
      formDatas.append('File', msmeImageD)
      await dispatch(upload_img(formDatas)).then((res) => {
        value.msme_image = res

      })
    }
    if (value.company_image !== undefined) {

      var formDatas = new FormData();
      formDatas.append("File", company_Image)
      await dispatch((upload_img(formData))).then((res) => {
        value.company_image = res

      })
    }
    Object.keys(value).map((formKey) => {
      formData.append(formKey, value[formKey])
    })
    console.log(formValues)
    formData.append("form_id", formValues._id)
    formData.append("user_id",formValues.user_id._id)
    dispatch(Contractor_service.update_contractor(formData)).then((res) => {
      var obj = {}
      obj.id = value.user_id
      obj.contractor_id = res.data._id
      setLoading(false)
      if (isAdmin != 2) {
        navigate('/dashboard')
      }
      else {
        navigate('/admin/contractors-list')
      }

    }).catch((err) => {
      console.log(err)
    }
    )



  }
  const onFinishFailed = (value) => {
    console.log('error', value)
  }


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


  function msme_img_value(e) {
    set_msmeImageD(e.target.files[0])
  }


  function countrySelectHandler(country) {
    setState(state_cites[country])
  }



  function pan_img_value(e) {
    set_panImageD(e.target.files[0])
  }
  function gst_img_value(e) {
    set_gstImageD(e.target.files[0])
  }
  function company_image_handler(e) {
    set_company_imgae(e.target.files[0])
  }
  function selectChangeHandler(val) {
    console.log(val)
    work_area = []
    setSelectedItems(val)
    setWorkArea(val)

  }
  return (
    <>
      {
        loading ? <Loader /> :
          <div className='bg-white p-3 w-full rounded-xl '>
            <Form
              form={form}
              labelCol={{
                span: 37,
              }}
              wrapperCol={{
                span: 44,
              }}

              layout="vertical"

              fields={[
                {
                  name: ["entity"],
                  value: [formValues.entity]
                },
                {
                  name: ['status'],
                  value: formValues.status
                },
                {
                  name: ['prefferd_state'],
                  value: [...formValues.prefferd_states]
                },
                {
                  name: ["email"],
                  value: [formValues.user_id.email]
                },
                {
                  name: ["mobile_number"],
                  value: [formValues.user_id.number]
                },
                {
                  name: ["Address"],
                  value: [formValues.Address]
                },
                {
                  name: ["State"],
                  value: [formValues.State]
                },
                {
                  name: ["City"],
                  value: [formValues.City]
                },
                {
                  name: ["pin_code"],
                  value: [formValues.pin_code]
                },

                {
                  name: ["username"],
                  value: [formValues.username]
                },
                {
                  name: ["Designation"],
                  value: [formValues.Designation]
                },
                {
                  name: ["work_segment"],
                  value: [...workArea]
                },
                {
                  name: ["msme_number"],
                  value: [initialpf]
                },
                ...selectedOptions
                ,
                {
                  name: "msme",
                  value: formValues?.msme
                },
                turnover,
                {
                  name: ["Approved_Limit"],
                  value: formValues?.bank_overdraft?.length > 0 ? formValues?.bank_overdraft[0].approved : ''
                },
                {
                  name: ["consumed"],
                  value: formValues?.bank_overdraft?.length > 0 ? formValues?.bank_overdraft[0].consumed : ''
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
                  value: formValues.pan_number == "N/A" || formValues.pan_number == "undefined" ? "N/A" : formValues.pan_number
                },
                {
                  name: ["gst_number"],
                  value: formValues.gst_number == "N/A" || formValues.gst_number == "undefined" ? "N/A" : formValues.gst_number
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
              {showCompnay_Img ? <> <label className='flex mb-3'> Business Profile</label> <Link className='mr-16' to={formValues.company_image} >Preview</Link> <span className='cursor-pointer hover:text-red-600' onClick={() => { setShowCompany_Img(false) }}>Change</span></> : <Form.Item name="company_image" label="Company Image">
                <Input type="file" onChange={company_image_handler} />
              </Form.Item>
              }
              {/**************  Work Segment *************/}
              <Form.Item name="work_segment" label="Work segment" rules={[
                {
                  required: true,
                  message: 'Please select your Work Segment'
                },
              ]}>
                <Select mode="multiple" onChange={selectChangeHandler}
                  allowClear placeholder="List of work segments">
                  {work_segment.map((option, index) => {
                    return <Select.Option key={index} value={option}>{option}</Select.Option>
                  })}
                </Select>
              </Form.Item>
         
              {selectedItems.length > 0 && selectedItems.map((sub_item) => {
                    
                return sub_cat.map((sub_category) => {
                  console.log(sub_category.name,"in",sub_item)
                  return sub_item === sub_category.name && sub_category.name != 'N/A' && <>
                    {

                      <Form.Item name={sub_item} className='mb-1' label={`Select Sub Category for ${sub_item}`} rules={[
                        {
                          required: true,
                          message: 'Please select options',
                        },
                      ]}>
                        <Checkbox.Group className='grid md:grid-cols-5 gap-3'>
                          {sub_category.children.map((item, index) => {

                            return (
                              <Checkbox
                                key={item.name}
                                className={`ml-${index === 0 ? 2 : 0} `}
                                value={item.name}
                              >
                                <span>{item.name}</span>
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
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-3 '>
                <div>
                  <Form.Item name="msme_number" className='mb-0' label="PF Number" >
                    {/* <Input placeholder='Enter your PF number' onChange={msmeVerfication} /> */}
                    <Input placeholder='Enter your PF number' />
                  </Form.Item>

                  {valid_msme && <span style={{ color: '#ff4d4f' }}>Please Enter valid PF Number*</span>}
                </div>
                {showMSMEimage == true ? <div>
                  <span className='flex mb-3 '>Copy of PF </span>
                  <Link className='mr-16' to={formValues.msme_image}>Preview</Link>
                  <span className='cursor-pointer hover:text-red-600' onClick={() => { setShowMSMEImage(false) }}>Change</span>

                </div>
                  :
                  <Form.Item name="msme_image" label="Copy of PF">
                    <Input type='file' max={1} onChange={msme_img_value} />
                  </Form.Item>

                }
                <div>

                  <Form.Item name="pan_number" label="PAN Number" className='mb-0'>
                    <Input onChange={pancardValidation} maxLength={10} minLength={10} placeholder='Enter Your PAN Number' />
                  </Form.Item>
                  {valid_pan && <span style={{ color: '#ff4d4f' }}>Please Enter valid PAN Number*</span>}

                </div>
                {showPANimage ? <div>
                  <span className='flex mb-3 '>Copy of PAN </span>
                  <Link className='mr-16' to={formValues.pan_image}>Preview</Link>
                  <span className='cursor-pointer hover:text-red-600' onClick={() => { setShowPANimage(false) }}>Change</span>

                </div>
                  : <Form.Item name="pan_image" label="Copy of PAN">
                    <Input type='file' max={1} onChange={pan_img_value} />
                  </Form.Item>}
                <div>
                  <Form.Item name="gst_number" className='mb-0' label="GST Number">
                    <Input onChange={ValidateGSTNumber} placeholder="Please enter your GST Number" />
                  </Form.Item>


                  {valid_gst && <span style={{ color: '#ff4d4f' }}>Please Enter valid GST Number*</span>}
                </div>
                {showGSTiMAGE == true ? <>
                  <div>
                    <span className='flex mb-3 '>Copy of GST </span>
                    <Link className='mr-16' to={formValues.gst_image}>Preview</Link>
                    <span className='cursor-pointer hover:text-red-600' onClick={() => { setShowGSTimage(false) }}>Change</span>
                  </div>
                </> :
                  <Form.Item name="gst_image" label="Copy of GST">
                    <Input type='file' max={1} onChange={gst_img_value} />
                  </Form.Item>}
              </div>
              <Form.Item name="msme" label="Do you have MSME registration?" required >
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

              <div className=' mt-5 mb-2'>Last Three Years Turnovers</div>
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

                    {fields.map((field, index) => {
                      const project = form.getFieldValue(['Project', index]);
                      const projectImg = project?.project_img;
                      const fileList = projectImg?.length > 0 ? projectImg : [];
                      var Imgind


                      return (
                        <div key={field.key}>
                          <div className="grid grid-cols-2 w-full">
                            <p className="flex mb-3">#Project {field.key + 1} </p>
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
                            <Form.Item className='my-3'></Form.Item>
                            <p className='text-[#FF5757]'>Project Images</p>
                            {fileList.length > 0 ? (
                              <>
                                <br />

                                {fileList.map((img, ind) => {
                                  Imgind = ind
                                  return (
                                    <div className={`grid grid-cols-1 md:grid-cols-${fileList.length} gap-4 mb-3`}>
                                      <Link to={img}>{`Image ${ind + 1}`}</Link>
                                      <Button type="link" className='text-red-400 text-underline hover:none' onClick={() => handleRemoveImage(index, ind)}>
                                        Remove
                                      </Button>
                                    </div>
                                  );
                                })}
                                <p className='mb-3'>Add More Images</p>
                                <br />
                                <Form.Item>
                                  <input type='file' name='myFile' onChange={event => handleUpdateFileUpload(event, index)} multiple />
                                </Form.Item>
                              </>
                            ) : (
                              <Form.Item {...field} name={[field.name, 'project_img']} valuePropName='fileList'>
                                <input type='file' name='myFile' onChange={event => handleFileUpload(event, index)} multiple />
                              </Form.Item>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <Form.Item>
                      <Button
                        className="flex justify-center items-baseline"
                        type="dashed"
                        onClick={() => {
                          add();

                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Project
                      </Button>
                    </Form.Item>
                  </>
                )}

              </Form.List>
              {
                isAdmin ==2 && 
                <Form.Item name="status" className='flex justify-between'>
                <Radio.Group >
                    <Radio value={1} >Under Review</Radio>
                    <Radio value={2}>Reject</Radio>
                    <Radio value={0}>Accept</Radio>
                </Radio.Group>
                </Form.Item>
              }
             
              <div className='text-center flex flex-col flex-col-reverse md:flex-row justify-between'>
                {/* <button
                    type="submit"
                    className="back_btn"  >
                    Next
                  </button> */}
              
               
                  <div className='content_center w-full'>
                    <button
                      type="submit"
                      className="save_Btn   hover:bg-yellow-400"
                    >
                      Update
                    </button>
                  </div>
                
              </div>
            </Form>
          </div>
      }

    </>
  );
};

export default Personal_Detail_Tab