
import {
  Button,
  Form,
  Input,
  Select,
  message,
  Upload,
  Checkbox
} from 'antd';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../Helper/useDocumentTitle';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { setValue } from '../../../store/actions/user';
import { get_Vendor, get_Vendor_by_id } from '../../../services/Vendor';
import { googleLogin } from '../../../services/SocialLogin';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { login } from '../../../services/user';
const Login = () => {
  const dispatch = useDispatch()
  useDocumentTitle("Login")
  const navigate = useNavigate();
  function formHandler(value) {
    dispatch(login(value)).then(res => {

      localStorage.setItem('accesstoken', res.accesstoken)
      localStorage.setItem('user_id', res.user._id)
      localStorage.setItem('email', res.user.email)
      localStorage.setItem('number', res.user.number)
      dispatch(setValue(res.user.role))
      var userDetails = res
      if (res.user.role === 1) {
        dispatch(get_Vendor()).then((res) => {
          var user_exist = res.filter((user_data) => {
            console.log(user_data.user_id)

            if (user_data.user_id != null && user_data.user_id._id == localStorage.getItem('user_id'))
              return user_data
            return null
          })
          // console.log(user_exist.length)
          if (user_exist.length === 0) {
            navigate('/vendor-form')
          }
          else {

            localStorage.setItem("form_id", userDetails.user.vendor_id)
            // navigate('/vendor-form')
             navigate('/dashboard')

          }
        })
      }

      else if (res.user.role === 2) {
        localStorage.setItem("adminEmail", res.user.email)
        navigate('/admin/contractors-list')
      }
      else
        if (res.user.contractor_id) {
          localStorage.setItem("form_id", res.user.contractor_id)
        
          navigate('/dashboard')
        }
        else {
          navigate('/contractor-form', { state: res.user })
        }

      // navigate('/contractor-form' ,{state:res.data.user})  
    })
      .catch(err => Swal.fire({
        position: 'center',
        icon: 'error',
        title: err.response.data.msg,
        showConfirmButton: true,

      }));
  }
  const responseMessage = (response, e) => {
    console.log(response)

    dispatch(googleLogin({ tokenId: response })).then((res) => {
      console.log(res)
      localStorage.setItem('accesstoken', res.refresh_token)
      localStorage.setItem('user_id', res.userdata._id)
      localStorage.setItem('email', res.userdata.email)
      localStorage.setItem("isLoggedIn", true)
      // localStorage.setItem('number', )
      if (res.userdata.role === 1) {
        console.log(Object.keys(res.data), Object.keys(res.data).includes == 'vendor_id')
        if ("vendor_id" in res.data) {
          localStorage.getItem('form_id', res.data.user.vendor_id)
          navigate('/dashboard')
          return
        }
        else{
          navigate('/vendor-form')
          return
        }

      }
      if (res.userdata.role === 0) {
        if ("contractor_id" in res.data) {
          localStorage.getItem('form_id', res.data.user.contractor_id)
          navigate('/dashboard')
          return
        }
        else{
          navigate('/contractor-form')
          return
        }
      }
      else {
        navigate('/userRole')
        return
      }

    })
  };
  const logins = useGoogleLogin({
    onSuccess: codeResponse => responseMessage(codeResponse),
    onError: response => errorMessage(response),
    
  });
  const errorMessage = (response) => {
    console.log(response)
  };
  return (
    <section className=" mb-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8" >
      <div className="px-8 h-full  ">
        <div
          className="flex  justify-center  flex-wrap h-full g-6 "
        >
          <div className="card">
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="headings  mt-5 mb-3 mr-4">Welcome Back ! </p>
            </div>
            <p className='text-sm mb-5'>Your sourcing journey begins here. Log in to Sourcify and unlock a world of new possibilities for your business.</p>
            <Form onFinish={formHandler}>


              {/* */}




              {/* <div
                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
              > */}
              {/* <p className="text-center font-semibold mx-4 mb-0">Or</p> */}
              {/* </div> */}
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter email address',
                  },
                ]}
              >
                <Input className='input_border md:mb-5' placeholder="Email address" />
              </Form.Item >
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your password!',
                  },
                ]}
              >
                <Input.Password className='input_border md:mb-5' placeholder='Enter your password' />
              </Form.Item>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="form-group form-check">
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                  >
                    <Checkbox className='font-[Inter] text-[black] font-[400]'>Remember me</Checkbox>
                  </Form.Item>
                </div>
                <Link to="#!" className="font-[Inter] text-[#FF5757] hover:text-[#FF5757] font-[400] mb-3">Forgot password?</Link>
              </div>

              <div className="text-center lg:text-left">
                <div className='center_content bg-[#00272B] mb-3'>
                  <button
                    type="submit"
                    className="prime_button "
                  >
                    Login


                  </button>
                </div>
                <p className="normal_text">
                  <span className='mr-0'> Don't have an account? </span>
                  <Link
                    to='/'
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >Sign Up</Link>
                </p>
              </div>
              <div className='flex justify-center mt-6'>

              </div>
            </Form>
            <div className='center_content mb-5'>
              <span className='text-[28px] font-bold'>or</span>
            </div>
            <div className='social_buttons mb-16'>
              <div className='bg-[#FF5757] mb-3 rounded-[6px] cursor-pointer'>
                
                  <div onClick={() => logins()} className='brand_button'>Login with Google</div>
             
              </div>

              {/* <div className='bg-[#00272B] rounded-[6px]'>
                <span className='prime_button_sec w-full '>Login with Facebook</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login