import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const EmailScreen = () => {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <section className=" mb-3  flex-col justify-center py-6 sm:px-6 lg:px-8" >
            <div className="md:px-8 h-full  ">
                <div
                    className="flex  justify-center  flex-wrap h-full g-6 "
                >
                    <div className="card h-[400px]">
                        <h3 className='headings font_32 mb-6 mt-8'>Password Sent</h3>
                        <p className='mb-5 mt-5'>An email has been sent to <b>{location.state}</b>. If this email address is registered
                            to Sourcify.com, you'll receive instructions on how to set a new password.</p>
                        <Link to='/forgotPassword' className='text-[#FF5757] mt-3 ' onClick={() => navigate('/forgotPassword')}>Didn't Recieve Email?</Link>
                    
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EmailScreen