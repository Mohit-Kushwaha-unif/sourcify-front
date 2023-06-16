import { Form, Input, Select, Button, Radio } from 'antd';
import state_cites from '../../../../../assests/state_city.';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update_vendor } from '../../../../../services/Vendor';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../Helper/Loader';

const Personal_Detail_Tab = (formValues) => {
  const navigate = useNavigate();
  const isAdmin = useSelector(state => state.User.user_role);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Initialize form instance
  const [email,setEmail] = useState()
  const [number,setNumber] = useState()
  const [initialState, setInitialState] = useState(formValues.formValues.State);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(formValues.formValues); // Set initial form values
    setNumber(formValues.formValues.user_id.number)
    setEmail(formValues.formValues.user_id.email)
  }, [formValues.formValues]);

  function FormHandler(values) {
    setLoading(true);
    values.form_id = formValues.formValues._id;
    values.user_id = formValues.formValues.user_id;
    dispatch(update_vendor(values))
      .then((res) => {
        setLoading(false);
        if (isAdmin !== 2) {
          navigate('/dashboard');
        } else {
          navigate('/admin/companies');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function countrySelectHandler(country) {
    setInitialState(country);
    setState(state_cites[country]);
  }


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='bg-white p-3 rounded-xl '>
          <Form
            labelAlign='left'
            form={form}
            layout='vertical'
            fields={[
              {
                name: ["number"],
                value: number

              },
              {
                name: ["email"],
                value: email

              }
            ]}
            onFinish={FormHandler}
          >
            {/* Rest of the form fields */}
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
              {/* Number field */}
              <div className='form_flex_children mr-1'>
                <Form.Item
                  name='number'
                  label='Number'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Number',
                    },
                  ]}
                  className='mb-1'
                >
                  <Input maxLength={10} minLength={10} type='Number' value={number} onChange={(val)=>{setNumber(val.target.value)}} placeholder='Enter Your Number' />
                </Form.Item>
              </div>
              <div className='form_flex_children mr-1'>
                <Form.Item
                  name='email'
                  label='Email'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Email',
                    },
                  ]}
                >
                  <Input placeholder='Enter Your Email'  value={email} onChange={(val)=>{setEmail(val.target.value)}} />
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
                  <Select id="country-state" name="State" placeholder="Select State" onSelect={countrySelectHandler}>
                    {Object.keys(state_cites).map((states) => {
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
                    {state.length > 0 && state.map((city) => {
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
                  <Input maxLength={6} minLength={6} placeholder="Enter 6 digit PIN Code" />
                </Form.Item>
              </div>
            </div>
            {
              isAdmin == 2 &&
              <div className='text-center flex flex-col flex-col-reverse md:flex-row justify-between'>
                {/* <button
                    type="submit"
                    className="back_btn"  >
                    Next
                  </button> */}
                <Form.Item name="status">
                  <Radio.Group >
                    <Radio value={1} >Under Review</Radio>
                    <Radio value={2}>Reject</Radio>
                    <Radio value={0}>Accept</Radio>
                  </Radio.Group>
                </Form.Item>


              </div>
            }

            <div className='center_content '>
              <button
                type="submit"
                className="save_Btn   hover:bg-yellow-400"
              >
                Update
              </button>
            </div>
          </Form>
        </div>
      )
      }
    </>


  )
}

export default Personal_Detail_Tab