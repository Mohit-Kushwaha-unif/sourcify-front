import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const EmailScreen = () => {
    const location = useLocation()
    const navigate = useNavigate()
    
  return (
    <div className=' mx-[20%] w-[60%] min-h-min mt-3   justify-center py-6 sm:px-6 lg:px-8 '>
    <div className="px-8 w-auto h-full text-gray-800">
        <div
            className="  xl:justify-center lg:justify-between justify-center items-center  h-full g-6 "
        >
            <div className=" xl:mx-20 w-auto mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                <div className="flex flex-col items-center justify-center lg:justify-start">
                    <h3 className='headings font_32 mb-6'>Password Sent</h3>
                    <p className='mb-5'>An email has been sent to <b>{location.state}</b>. If this email address is registered
                     to Sourcify.com, you'll receive instructions on how to set a new password.</p>
                </div>
                <Link to='/forgotPassword' className='float-right' onClick={()=>navigate('/forgotPassword')}>Didn't Recieve Email?</Link>
            </div>
        </div>
    </div>
</div>
  )
}

export default EmailScreen