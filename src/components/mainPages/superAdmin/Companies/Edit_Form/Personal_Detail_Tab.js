import { Form , Input, Select,Button} from 'antd'
import state_cites from '../../../../../assests/state_city.'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { update_vendor } from '../../../../../services/Vendor'

const Personal_Detail_Tab = (formValues) => {
    const [state,setState] = useState([])
    const [initialState,setInitialState] = useState(formValues.formValues.State)
    const dispatch = useDispatch()
    function FormHandler(values){
        values.form_id = formValues.formValues._id;
        values.user_id = formValues.formValues.user_id
        dispatch(update_vendor(values)).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
    function countrySelectHandler(country){
        setInitialState(country)
        console.log(country)
        setState(state_cites[country])
    }
    var initialValue = []
    console.log( formValues.formValues)
    Object.keys(formValues.formValues).map((initial)=>{
        var obj ={}
       console.log(initial== "user_id")
        if(initial == "user_id"){
                obj.name = "email";
                obj.value = formValues.formValues.user_id.email
                initialValue.push(obj)
                obj={}
                obj.name = "number"
                obj.value = formValues.formValues.user_id.number
        }
       else{
        obj.name = initial;
        obj.value = formValues.formValues[initial]
       } 
       console.log({obj})
        initialValue.push(obj)
    })
    console.log(initialValue)
  return (
    <div className='bg-white p-3 rounded-xl '>
     
          <Form labelAlign="left"
            fields={[...initialValue,{
                name: ["State"],
                value: initialState
            }]}
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
              
             <Input  maxLength={10} minLength={10} type="Number" placeholder='Enter Your Number' /> 
                  
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
                  
                    <Input  placeholder='Enter Your Email' /> 
                  
                  
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
        <Form.Item name="State" className='mb-1' label="State " rules={[
              {
                required: true,
                message: 'Please input your Address!',
              },
            ]}>
          <Select id="country-state" name="State" value={initialState} placeholder="Select State" onSelect={countrySelectHandler}>
         { Object.keys(state_cites).map((states)=>{
            return (<Select.Option value={states}>{states}</Select.Option>)
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
           <Select name="City" placeholder="Select City">
         { state.length >0 && state.map((city)=>{
            return (<Select.Option value={city}>{city}</Select.Option>)
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
            <div className="text-center flex justify-center lg:text-left mt-2 mb-3">
            <Form.Item

      >
        <button className='primary_btn inline-block px-7 py-3 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded-[50px] shadow-md hover:bg-[#FF5759] rounded-[50px] hover:shadow-lg focus:bg-[#FF5757] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FF5757] active:shadow-lg transition duration-150 ease-in-out' type="primary" htmlType="submit">
         Update
        </button>
      </Form.Item>
      </div>
          </Form>
        </div>

  )
}

export default Personal_Detail_Tab