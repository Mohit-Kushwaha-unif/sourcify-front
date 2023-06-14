import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { email_verify, get_user_info, sendmail } from '../../../services/user';
const EmailForm = () => {
    const params = useParams()
    const [verified,setIsVerified] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(get_user_info({user_id: localStorage.getItem("user_id")})).then((res)=>{
        if(res.emailVerify == true){
            setIsVerified(true)
        }
        else{
            dispatch(email_verify({activationToken : params.token})).then((res)=>{
                if(res.msg == "Email Verified"){
                    setIsVerified(true)
                    localStorage.setItem("accesstoken",params.token)
                }
                else{
                    setIsVerified(false)
                }
            })
        }
      })
},[params.token])
  function sendEmail(){

    dispatch(sendmail({id: localStorage.getItem("user_id")})).then((res)=>{
        console.log(res)
    })
  }
  return (
    <section className="min-h-screen bg-[#f3f3f3] flex flex-col justify-center  sm:px-6 lg:px-8" >
            <div className="px-8 h-full text-gray-800">
                <div
                    className=" flex xl:justify-center lg:justify-center items-center flex-wrap h-full g-6 "
                >
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                        <div className="flex flex-row items-center justify-center lg:justify-start">
                            <p className="text-lg mb-0 mr-4">Email Verification </p>
                        </div>
                        <div
                            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                        </div>
                        {
                            verified ? <><p className='flex justify-center'> <FaCheckCircle className='text-green-600 text-4xl my-3' /></p> <p className='flex justify-center'> Your Email is Verified</p> </> : <>
                            <p className='text-base mb-3'>Verify your email to access all website features. If the link has expired, request a new verification email.
                          </p>
                          <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                            Not Received Email Yet?
                            <p
                             className="text-red-600 cursor-pointer hover:text-red-700 hover:underline focus:text-red-700 transition duration-200 ease-in-out"
                             onClick={sendEmail}
                            >Send Again</p>
                        </p>
                          </>
                        }
                    </div>

                </div>
            </div>
        </section>
  )
}

export default EmailForm