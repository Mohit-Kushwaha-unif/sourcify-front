
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
import { GoogleLogin } from '@react-oauth/google';
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
              
              localStorage.setItem("form_id",userDetails.user.vendor_id)
              navigate('/vendor-form')
              // navigate('/dashboard')

            }
          })
        }

        else if (res.user.role === 2) {
          localStorage.setItem("adminEmail", res.user.email)
          navigate('/admin/contractors-list')
        }
        else
          if (res.user.contractor_id) {
            localStorage.setItem("form_id",res.user.contractor_id)
            navigate('/contractor-form', { state: res.user })
            // navigate('/dashboard')
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
  const responseMessage = (response,e) => {
    console.log(response)
    dispatch(googleLogin({tokenId:response.credential})).then((res)=>{
      console.log(res)
      localStorage.setItem('accesstoken', res.accesstoken)
      localStorage.setItem('user_id', res.data._id)
      localStorage.setItem('email', res.data.email)
      localStorage.setItem("isLoggedIn", true)
      // localStorage.setItem('number', )
      if(res.data.role === 1){
        console.log(Object.keys(res.data),Object.keys(res.data).includes=='vendor_id')
        if("vendor_id" in res.data){
          localStorage.getItem('form_id',res.data.user.vendor_id)
          navigate('/vendor-form')
          return
        }
        // else{
        //   navigate('/vendor-form')
        //   return
        // }
       
      }
      if(res.data.role ===0){
        if("contractor_id" in res.data){
        localStorage.getItem('form_id',res.data.user.contractor_id)
        navigate('/contractor-form')
        return
        }
        // else{
        //   navigate('/contractor-form')
        //   return
        // }
      }
      else{
        
        navigate('/userRole')
        return
      }
     
    })
  };
  const errorMessage = (response) => {
    console.log(response)
  };
  return (
    <section className="min-h-screen bg-[#f3f3f3] mb-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8" >
      <div className="px-8 h-full text-gray-800">
        <div
          className="flex xl:justify-center lg:justify-center justify-center  flex-wrap h-full g-6 "
        >
          <div className="xl:ml-20 xl:w-4/12 lg:w-5/12 md:w-5/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="text-lg mb-0 mr-4">Sign In </p>
            </div>
            <div
              className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
            >
            </div>
              <Form onFinish={formHandler}>
             
              
               {/* <GoogleLogin  uxMode="popup"  onSuccess={responseMessage} onError={errorMessage} /> */}

             
             

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
                <Input placeholder="Email address" />
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
                <Input.Password placeholder='Enter your password' />
              </Form.Item>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="form-group form-check">
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                  >
                    <Checkbox className='font-[Montserrat]'>Remember me</Checkbox>
                  </Form.Item>
                </div>
                <Link to="#!" className="text-gray-800 mb-3">Forgot password?</Link>
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="primary_btn primary_btn inline-block px-7 py-3 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#FF5759] rounded-[50px] hover:shadow-lg focus:bg-[#FF5757] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FF5757] active:shadow-lg transition duration-150 ease-in-out"
                >
                  Login


                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <Link
                    to='/register'
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >Register</Link>
                </p>
              </div>
              <div className='flex justify-center mt-6'>
              
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login