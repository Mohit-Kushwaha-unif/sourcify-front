
import {
  Form,
  Input,
  Checkbox,
  Radio
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';


import useDocumentTitle from '../../Helper/useDocumentTitle';
import * as userService from '../../../services/user'
import { useDispatch } from 'react-redux';
import { setValue } from '../../../store/actions/user';

import RadioGroup from './RadioButtonMaker';
import { useEffect, useState } from 'react';
import Loader from '../../Helper/Loader';
const Regsiter = () => {
  useDocumentTitle("Register Yourself")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  useEffect(()=>{
    if(localStorage.getItem('isLoggedIn') === "true"){
      navigate('/')
    }
  },[])
 
  const handleRadioChange = (value) => {
    console.log(`Selected option: ${value}`);
  };

  const options = [
    { value: 1, label: `I'm a company hiring for  projects`, className: 'leading-5 font-[Inter] text-[16px] ' },
    { value: 0, label: "I'm Contractor looking for work", className: 'leading-5 font-[Inter] text-[16px] ' },
  ];

  function formHandler(values) {
    setLoading(true)
    dispatch(userService.register(values))
      .then(async(res) => {
        try {
          if ('PushManager' in window) {
            console.log('Push notifications are supported!');
          } else {
            console.log('Push notifications are not supported.');
          }
          const applicationServerKey = urlBase64ToUint8Array('BH5Fc2ygIkKNjYHlRMnKtR2xk3Qg8P5nDjnuJ4rh1Kg_wkqMdXT5hca6fdun2sBfiNDuHYw5XzZou8A1c0Z91Zk');
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey
          });
          dispatch(userService.saveSubscription({"subscription":JSON.stringify(subscription), id:res.user._id}))
        } catch (error) {
          console.error('Error registering service worker:', error);
        }
        console.log(res)
        localStorage.setItem("user_id", res.user_data._id)
        localStorage.setItem("email", res.user_data.email)
        localStorage.setItem("number", res.user_data.number)
        localStorage.setItem("accesstoken", res.accesstoken)
        localStorage.setItem("isLoggedIn", true)
        setLoading(false)
        dispatch(setValue(res.user_data.role))
        // if(res.user_data.otpVerfied !=true){
        //   navigate('/verify')
        // }
        if (res.user_data.role === 1)
          navigate('/vendor-form', { state: res.user_data })
        else
          navigate('/contractor-form', { state: res.user_data })
      }).catch((err) => {
        setIsError(true)
        console.log(err.response.data.msg)
      });
  }

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return (
    <>
    {
      loading ? <Loader/> :
      <section className=" mb-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8" >
      <div className="md:px-8  ">
        <div
          className="flex  justify-center   h-full "
        >
          <div className="card">
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="headings mb-5 mt-5 mr-4">Create Account </p>
            </div>
            <p className='text-sm mb-8'>Sign up for Sourcify today and experience the power of our platform firsthand.</p>
            
            <Form labelAlign="left"

              layout="vertical" onFinish={formHandler}>
              <Form.Item
                name="role"
                rules={[
                  {
                    required: true,
                    message: 'Please select your role',
                  },
                ]}
              >
                <div className='flex items-center mb-3'>
                  <div className="py-1">
                    <RadioGroup options={options} cols={2} onChange={handleRadioChange} />
                  </div>
                </div>

              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email',
                  },
                ]}

              >
                <Input className='input_border mb-3' placeholder="Email address" />

              </Form.Item >
              {isError && <p className='text-[red] mb-3'>Email already exists </p>}
              <Form.Item
                name="number"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your mobile number',
                  },
                ]}
              >



                <Input className='input_border mb-3' prefix={"+91"} type='Number' maxLength={10} minLength={10} placeholder="Enter your Mobile Number" />

              </Form.Item >
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please select your password and it should be six digit long',
                  },
                ]}
              >

                <Input.Password className='input_border mb-3' min={6} placeholder='Enter Your Passowrd' />

              </Form.Item>

              <p className=' font-[Inter] text-[14px]'> <span>By continuing, I agree to the</span>  <Link to={'/privacy-policy'}><span className='text-[#FF5757] font-[700]'>Terms of Use</span> & <span className='text-[#FF5757] font-[700]'>Privacy Policy</span></Link></p> 
              <div className="text-center mt-5 mb-16 lg:text-left ">
                <button
                  type="submit"
                  className="brand_button w-full mb-3"
                >
                  Sign Up
                </button>
                <p className="font-[Inter] text-[14px]  mt-2 pt-1 mb-0">
                <span className='mr-2'>Already Have an account?</span> 
                  <Link
                    to='/login'
                    className="text-[#FF5757]  font-[700] hover:text-[#FF5757] focus:text-red-700 transition duration-200 ease-in-out"
                  >Login here</Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>

    </section>
    }
    </>
  




  )
}
export default Regsiter

