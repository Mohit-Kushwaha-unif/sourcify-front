import {
    Button,
    Form,
    Input,
    Select,
    message, 
    Upload,
    Checkbox
  } from 'antd';
  import state_cites from '../../../assests/state_city.';
  import { useEffect, useState } from 'react';
  import axios from 'axios';
  import work_segment from '../../../assests/options';
import Swal from 'sweetalert2';
  const ContractoForm = () => {
    const [isGSTVisible,setIsGSTVisible] = useState(false)
    const [isMSMEVisible,setIsMSMEVisible] = useState(false)
    const [pan_imaged,set_panImageD]= useState('')
    const [msmeImageD,set_msmeImageD]= useState('')
    const [gstImageD,set_gstImageD]= useState('')
    const [state,setState] = useState([])
    const [valid_pan,set_Valid_pan] = useState(false)
    const [valid_gst,set_Valid_gst] = useState(false)
    const [valid_msme,set_Valid_msme] = useState(false)
    const onFinish = (value) =>{
        var formData = new FormData()
        value.pan_image = pan_imaged 
        if(value.gst_image){
            value.gst_image = gstImageD
        }
        if(value.msme_image){
            value.msme_image = msmeImageD
        }
        Object.keys(value).map((formKey)=>{
            
            formData.append(formKey,(value[formKey])  ) 
        })
        axios({
            url: "http://localhost:5000/contractor/add_contractor",          
            method: "POST",
            data: formData,
        }).then((res) => {
        
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
          }).then(function() {
            window.location = "/";
        });
          
         })
  
        // Catch errors if any
        .catch((err) => {   
          console.log(err)
           Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.response.data.msg,
          showConfirmButton: true,
          
        })});
    }
    const onFinishFailed = (value)=>{
        console.log('error',value)
    }
    const pancardValidation = (event) => {
      let text = event.target.value
      let   regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
      if(text.length <1){
        set_Valid_pan(false)
      }
      
      else if (regex.test(text)) {
        set_Valid_pan(false)
      }else{
        set_Valid_pan(true)
      }
}
    const MSMEHandler =(value)=>{
        if(value === "yes"){
           
            setIsMSMEVisible(true)
        }
        else{
            setIsMSMEVisible(false)
        }
    }
    const gstHandler =(value)=>{
        if(value === "yes"){
           
            setIsGSTVisible(true)
        }
        else{
            setIsGSTVisible(false)
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
        var regex = /^[A-Z]{5}[-][A-Z]{2}[-][0-9]{2}[-][0-9]{7}$/;
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
      
      <div className='form_container'>
      <div className='form_header'>
        <h3>Contractor Form</h3>
      </div>
      <Form
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
        style={{
          maxWidth: 600,
        }}
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
        {work_segment.map((option)=>{
          return  <Select.Option value={option}>{option}</Select.Option>
        })}
          </Select>
        </Form.Item>
        {/*******************************************/}
        <div className='form_email_mobile_flex'>
        {/*****************Email*******************/}
        <div className='form_flex_children mr-2' >
        <Form.Item name="email" label="Email " rules={[
        {
          required: true,
          message: 'Please input your Email!'
        },
      ]}   wrapperCol={{
        
        span: 56,
      }}>
          <Input  type="email" placeholder='Enter the Email Id to be registered'/>
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
          <Input placeholder='Enter the Mobile Number to be registered' />
        </Form.Item>
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
      
      <Form.Item name="gst" label="Are You Registered Under GST?" rules={[
        {
          required: true,
          message: 'Please provide required details!'
        },
      ]} 
      >
        <Select onSelect={gstHandler} placeholder="Yes/No">
        <Select.Option value="yes">Yes</Select.Option>
        <Select.Option value="no">No</Select.Option>
        </Select>
    </Form.Item>
    { 
        isGSTVisible && <div className='form_email_mobile_flex'>
           <div className='form_flex_children mr-2'>
        <Form.Item name="gst_number" className='mb-0' label="GST Number" rules={[
        {
          required: true,
          message: 'Please provide required details!'
        },
      ]}>
         <Input  onChange={ValidateGSTNumber} />
    </Form.Item>
    {valid_gst && <span  style={{color:'#ff4d4f'}}>Please Enter valid GST Number*</span>}</div>
   
    <div className='form_flex_children '>
        <Form.Item name="gst_image" label="GST Image" rules={[
        {
          required: true,
          message: 'Please provide required details!'
        },
      ]}>
        <Input type='file' max={1}  onChange={gst_img_value}/>
    </Form.Item>
    </div> </div>
    }
    
    <Form.Item name="msme" label="Are You Registered Under MSME?"  rules={[
        {
          required: true,
          message: 'Please provide required details!'
        },
      ]}>
          <Select onSelect={MSMEHandler} placeholder="Yes/No">
            <Select.Option value="yes">Yes</Select.Option>
            <Select.Option value="no">No</Select.Option>
          </Select>
    </Form.Item>
    {isMSMEVisible &&<div className='form_email_mobile_flex'><div className='form_flex_children mr-2'> <Form.Item name="msme_number" className='mb-0' label="MSME Number"rules={[
        {
          required: true,
          message: 'Please provide required details!'
        },
      ]}>
      <Input  onChange={msmeVerfication}/>
    </Form.Item>
    {valid_msme && <span  style={{color:'#ff4d4f'}}>Please Enter valid MSME Number*</span>} </div>
    <div className='form_flex_children '>
    <Form.Item name="msme_image" label="MSME Image">
    <Input type='file' max={1} onChange={msme_img_value} />
    </Form.Item> </div> </div>}
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
        Submit
      </Button>
    </Form.Item>
      </Form>
      </div>
      </>
    );
  };
  export default ContractoForm;