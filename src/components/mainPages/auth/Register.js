
import {
    Form,
    Input,
    Checkbox,
    Radio
  } from 'antd';
import { Link, redirect, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import useDocumentTitle from '../../Helper/useDocumentTitle';
import * as userService from '../../../services/user'
import { useDispatch } from 'react-redux';
import { setValue } from '../../../store/actions/user';
const Regsiter = () => {
    useDocumentTitle("Register Yourself")
    const dispatch = useDispatch()
    const navigate = useNavigate();
    function formHandler(values){

      dispatch(userService.register(values))
      .then((res) => {
            console.log(res)
            localStorage.setItem("user_id",res.user_data._id)
            localStorage.setItem("email",res.user_data.email)
            localStorage.setItem("number",res.user_data.number)
            localStorage.setItem("accesstoken",res.accesstoken)
            localStorage.setItem("isLoggedIn", true)
            dispatch(setValue(res.user_data.role))
           
              if(values.role ===1)
               navigate('/vendor-form' ,{state:res.user_data})  
              else
              navigate('/contractor-form' ,{state:res.user_data})  
        });
    }
  return (
 <section className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8" >
  <div className="px-8 h-full text-gray-800">
    <div
      className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 "
    >
      <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
      <div className="flex flex-row items-center justify-center lg:justify-start">
            <p className="text-lg mb-0 mr-4">Register With Us</p>
          </div>
          <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
   </div>
        <Form onFinish={formHandler}>
      
          <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input placeholder="Email address" />
    </Form.Item >
          <Form.Item
      name="number"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input type='Number' placeholder="Enter your Mobile Number" />
    </Form.Item >
      <Form.Item    
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password   placeholder='Who are you?'/>
    </Form.Item>
      <Form.Item    
      name="role"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
     
     <Radio.Group >
     <Radio value={1}>Vendor</Radio>
      <Radio value={0}>Contractor</Radio>
    </Radio.Group>
    </Form.Item>
          <div className="flex justify-between items-center">
            <div className="form-group form-check">
                        <Form.Item
                name="remember"
                valuePropName="checked"
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
                Sign Up 
            </button>
            {/* <p className="text-sm font-semibold mt-2 pt-1 mb-0">
               Have an account?
              <Link
                 to='/login'
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >Login</Link>
            </p> */}
          </div>
        </Form>
      </div>
    </div>
  </div>
</section>
  )
}

export default Regsiter