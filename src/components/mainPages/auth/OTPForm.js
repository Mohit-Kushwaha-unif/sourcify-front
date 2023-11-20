import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { otpVerify, send_otp } from '../../../services/user';

function OTPForm() {
    const [otp, setOTP] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault();
        var formData = {}
        formData.email = localStorage.getItem('email')
        formData.otp = otp
        dispatch(otpVerify(formData)).then((res) => {
            if (res.role === 1)
                navigate('/vendor-form', { state: res.user_data })
            else
                navigate('/contractor-form', { state: res.user_data })
        }).catch((err) => {
            Swal.fire('Please check OTP ', err.response.data.msg, 'warning')
        })
    }

    function sendMessage() {
        var formData = {}
        formData.email = localStorage.getItem('email')
        dispatch(send_otp(formData)).then((res) => {
            Swal.fire('Please Check your Email ', res.msg, ' successful')
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
                            <p className="text-lg mb-0 mr-4">OTP (One Time Password) </p>
                        </div>
                        <div
                            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                        </div>
                        <form className="w-1/3 mx-auto my-8" onSubmit={handleSubmit}>
                            <label htmlFor="otp" className="block font-medium mb-2">OTP</label>
                            <input
                                type="text"
                                id="otp"
                                className="w-full border border-gray-400 p-2 mb-4"
                                value={otp}
                                onChange={(e) => setOTP(e.target.value)}
                            />
                            <button type="submit" className="bg-[#FF5757] text-white py-2 px-4 rounded ">
                                Verify
                            </button>
                        </form>
                        <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                            Not Received OTP Yet?
                            <p
                                onClick={sendMessage}
                                className="text-red-600 cursor-pointer hover:text-red-700 hover:underline focus:text-red-700 transition duration-200 ease-in-out"
                            >Send Again</p>
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default OTPForm;