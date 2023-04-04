
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
import { useState } from 'react';
const Regsiter = () => {
  useDocumentTitle("Register Yourself")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false)
  const handleRadioChange = (value) => {
    console.log(`Selected option: ${value}`);
  };

  const options = [
    { value: 1, label: `I'm a company hiring for  projects`, className: 'leading-5 font-[Montserrat] text-[12px] font-bold' },
    { value: 0, label: "I'm Contractor looking for work", className: 'leading-5 font-[Montserrat] text-[12px] font-bold' },
  ];

  function formHandler(values) {

    dispatch(userService.register(values))
      .then((res) => {
        console.log(res)
        localStorage.setItem("user_id", res.user_data._id)
        localStorage.setItem("email", res.user_data.email)
        localStorage.setItem("number", res.user_data.number)
        localStorage.setItem("accesstoken", res.accesstoken)
        localStorage.setItem("isLoggedIn", true)
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

  return (
    <section className="min-h-screen bg-[#f3f3f3] mb-3 flex flex-col justify-center py-12 sm:px-6 lg:px-8" >
      <div className="px-8 h-full text-gray-800">
        <div
          className="flex xl:justify-center lg:justify-center justify-center  flex-wrap h-full g-6 "
        >
          <div className="xl:ml-20 xl:w-4/12 lg:w-5/12 md:w-5/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="text-lg mb-0 mr-4">Register </p>
            </div>
            <div
              className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
            >
            </div>
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
                <div className='flex items-center'>
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
                <Input placeholder="Email address" />

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



                <Input prefix={"+91"} type='Number' maxLength={10} minLength={10} placeholder="Enter your Mobile Number" />

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

                <Input.Password min={6} placeholder='Enter Your Passowrd' />

              </Form.Item>

              By continuing, I agree to the <Link to={'/privacy-policy'}><span className='text-[#FF5757]'>Terms of Use</span> & <span className='text-[#FF5757]'>Privacy Policy</span></Link>
              <div className="text-center mt-5 lg:text-left">
                <button
                  type="submit"
                  className="primary_btn w-full"
                >
                  Sign Up
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Have an account?
                  <Link
                    to='/login'
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >Login</Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>

    </section>
  )
}
export default Regsiter