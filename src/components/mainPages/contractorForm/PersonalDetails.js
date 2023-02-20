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
const PersonalDetails = () => {
  const location = useLocation()
  const navigation  = useNavigate()
  const dispatch = useDispatch()
    const [isMSMEVisible,setIsMSMEVisible] = useState(false)
    const [pan_imaged,set_panImageD]= useState('')
    const [msmeImageD,set_msmeImageD]= useState('')
    const [gstImageD,set_gstImageD]= useState('')
    const [state,setState] = useState([])
    const [work_segment,set_work_Segment]= useState([])
    const [valid_pan,set_Valid_pan] = useState(false)
    const [valid_gst,set_Valid_gst] = useState(false)
    const [valid_msme,set_Valid_msme] = useState(false)
    const [initialEmail , setStateInitialValue] = useState('')

    const [form] = Form.useForm();
    useEffect(()=>{
      setStateInitialValue(location.state?.email)
    },[location])
    useEffect(()=>{
      dispatch(get_category()).then((res)=>{
        // console.log(res)
        res.map((cat)=>{
          set_work_Segment((prev_state)=>[...prev_state,cat.category])
        })
       })
    },[])


    const onFinish = (value) =>{
        var formData = new FormData()
        value.pan_image = pan_imaged 
        if(localStorage.getItem("adminEmail")==null)
        {value.user_id = localStorage.getItem("user_id")
      }
      value.role= 0;
        if(value.gst_image){
            value.gst_image = gstImageD
        }
        if(!value.mobile_number){
          value.mobile_number = location.state?.number
        }
        if(value.gst_number){
            value.gst_number = "N/A"
        }
        if(value.msme_image){
            value.msme_image = msmeImageD
        }
        Object.keys(value).map((formKey)=>{ 
          formData.append(formKey,value[formKey])
        })
        dispatch(Contractor_service.add_contractor(formData)).then((res) => { 
          navigation("/contractor-form/work-experience")
         })
    }
    const onFinishFailed = (value)=>{
        console.log('error',value)
    }
    const pancardValidation = (event) => {
      let text = event.target.value
      var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;  
      if(text.length <1){
        set_Valid_pan(false)
      }
      
      else if (regex.test(text)) {
        set_Valid_pan(false)
      }else{
        set_Valid_pan(true)
      }
}


   
      function pan_img_value (e){
        set_panImageD(e.target.files[0])
      }
      function msme_img_value (e){
        set_msmeImageD(e.target.files[0])
      }
      function gst_img_value (e){
        set_gstImageD(e.target.files[0])
      }
      
      function countrySelectHandler(country){
       setState(state_cites[country])
      }
      function ValidateGSTNumber(event) {
        let text = event.target.value
        var regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if(text.length <1){
          set_Valid_gst(false)
        }
         else if(regex.test(text)) {
            set_Valid_gst(false)
          }else{
            set_Valid_gst(true)
          }
        
    }
      function msmeVerfication(event) {
        let text = event.target.value
        var regex = /^[A-Z]{2}[\\s\\/]?[A-Z]{3}[\\s\\/]?[0-9]{7}[\\s\\/]?[0-9]{3}[\\s\\/]?[0-9]{7}$/;
        if(text.length <1){
          set_Valid_msme(false)
        }
        else  if(regex.test(text)) {
            set_Valid_msme(false)
          }else{
            set_Valid_msme(true)
          }
    }
     
    return (
      <>
      
      <div className='min-h-min mt-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8 w-full'>
      <div className="px-8 h-full text-gray-800">
        <div
          className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 "
        >
          <div className="xl:ml-20 xl:w-11/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="text-lg mb-0 mr-4">Contractor Form</p>
            </div>
            <div
              className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
            >
            </div>
      <Form
      form={form}
         labelCol={{
          span: 37,
        }}
        wrapperCol={{
          span: 44,
        }}
        layout="vertical"
        initialValues={{
          size: "default",
        }}
        size="default"
        labelAlign= "left"
        scrollToFirstError= {true}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className='container'
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
        { work_segment.map((option)=>{
          return  <Select.Option value={option}>{option}</Select.Option>
        })}
          </Select>
        </Form.Item>
        {/*******************************************/}
        <div className='form_email_mobile_flex'>
        {/*****************Email*******************/}
        <div className='form_flex_children mr-2' >
        {location.state?.email ?<>
        <div >Email <span className='intialValue'>*</span> </div>
        <Input disabled className='mt-2 '  type="email" placeholder='Enter your Email ID ' value={initialEmail} />  
        </>:<Form.Item name="email" label="Email "   initialValue={initialEmail} rules={[
        {
          required: true,
          message: 'Please input your Email!'
        },
      ]}   wrapperCol={{
        span: 56,
      }}>
        
           <Input  type="email" placeholder='Enter your Email ID '  />  
        
        
          
        </Form.Item>}
        </div>
        {/*******************************************/}

        {/************Mobile Number****************/}
        <div className='form_flex_children'>
        {location.state?.number ?<>
        <div >Mobile Number <span className='intialValue'>*</span> </div>
        <Input disabled className='mt-2 '  type="number" placeholder='Enter your Email ID ' value={location.state.number} />  
        </>:<Form.Item name="mobile_number" label="Mobile Number " rules={[
        {
          required: true,
          message: 'Please input your Mobile Number!'
        },
      ]}>
          <Input maxLength={10} minLength={10} placeholder='Enter the Mobile Number to be registered' />
        </Form.Item>}
        </div>
        {/*******************************************/}
        </div>
        <Form.Item name="Address"   label="Office Address " rules={[
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
         { Object.keys(state_cites).map((state)=>{
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
         { state.length >0 && state.map((state)=>{
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
          <Input maxLength={6} minLength={6}  placeholder="Enter 6 digit PIN Code"/>
        </Form.Item>
        </div>
        </div>
        <div className='form_email_mobile_flex'>
          <div className='form_flex_children mr-2'>
        <Form.Item name="pan_number" label="PAN Number" className='mb-0' rules={[
        {
          required: true,
          message: 'Please provide pan number!'
        },
      ]}
     >
        <Input onChange={pancardValidation} maxLength={10} minLength={10}   placeholder='Enter Your PAN Number' />
        </Form.Item>
        {valid_pan && <span  style={{color:'#ff4d4f'}}>Please Enter valid PAN Number*</span>}
        
        </div>
        <div className='form_flex_children mr-2'>
      <Form.Item name="pan_image" label="PAN Image" rules={[
        {
          required: true,
          message: 'Please provide pan image!'
        },
      ]}>
        
      <Input type='file' max={1} onChange={pan_img_value}/>
      </Form.Item>
      </div>
      </div>
      
 <div className='form_email_mobile_flex'>
           <div className='form_flex_children mr-2'>
        <Form.Item name="gst_number" className='mb-0'  label="GST Number">
         <Input placeholder='Enter your GST Number' onChange={ValidateGSTNumber} />
    </Form.Item>
    {valid_gst && <span  style={{color:'#ff4d4f'}}>Please Enter valid GST Number*</span>}</div>
   
    <div className='form_flex_children '>
        <Form.Item name="gst_image" label="GST Image" >
        <Input type='file' max={1}  onChange={gst_img_value}/>
    </Form.Item>
    </div> </div>
    <div className='form_email_mobile_flex'><div className='form_flex_children mr-2'> <Form.Item name="msme_number" className='mb-0' label="PF Number"rules={[
        {
          required: true,
          message: 'Please provide required details!'
        },
      ]}>
      <Input placeholder='Enter your PAN Number'  onChange={msmeVerfication}/>
    </Form.Item>
    {valid_msme && <span  style={{color:'#ff4d4f'}}>Please Enter valid PF Number*</span>} </div>
    <div className='form_flex_children '>
    <Form.Item name="msme_image" label="Copy of PF">
    <Input type='file' max={1} onChange={msme_img_value} />
    </Form.Item> </div> </div>
    <div className='form_email_mobile_flex'>
    <div className='form_flex_children mr-2'>
        <Form.Item label="Contact Person Full Name " name="username" rules={[
        {
          required: true,
          message: 'Please input your Name!',
        },
      ]}>
          <Input  placeholder='Enter Contact Person Name'/>
        </Form.Item>
        </div>
        <div className='form_flex_children '>
        <Form.Item name="Designation" label="Designation" rules={[
        {
          required: true,
          message: 'Please input your Designation!',
        },
      ]}>
          <Input placeholder='Enter the  Designation'/>
        </Form.Item>
        </div>
        </div>
 
    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset:2,
        span: 20,
      }}
      rules={[
        {
          required: true,
          message: 'Please check the check box!'
        },
      ]}
    >
      <Checkbox>I hereby Consent all the information Provided is true</Checkbox>
    </Form.Item>
    
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button className='form_button' type="primary" htmlType="submit">
        Next Step
      </Button>
    </Form.Item>
      </Form>
      </div>
      </div>
      </div>
      </div>
      </>
    );
  };

export default PersonalDetails