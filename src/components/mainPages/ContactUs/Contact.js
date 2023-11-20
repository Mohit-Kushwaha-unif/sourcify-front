import { Form, Input } from 'antd'
import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { FaLandmark } from 'react-icons/fa'

const Contact = () => {
    return (
        <div className='container'>
            <h2 className='prime_h2_rale font_62 mb-12'>Contact Us</h2>
            <div className='grid grid-cols-1 md:grid-cols-6  md:gap-x-6 gap-y-6 '>
                <div className='col-span-2 p-6 center_content flex-col py-12 bg-[#023047] rounded-[6px]'>
                    <AiOutlineMail className='text-white text-[80px] mb-5 border-bottom-2 border-white' />
                    <p className='mb-5 white_p'>info@sourcify.in</p>
                </div>
                <div className='col-span-2 p-6 center_content flex-col py-12 bg-[#023047] rounded-[6px]'>
                    <BsFillTelephoneFill className='text-white text-[80px] mb-5 border-bottom-2 border-white' />
                    <p className='mb-5 white_p'>+91- 9967662976</p>
                </div>
                <div className='col-span-2 p-6 center_content flex-col py-12 bg-[#023047] rounded-[6px]'>
                    <FaLandmark className='text-white text-[80px] mb-5 border-bottom-2 border-white' />
                    <p className='mb-5 white_p text-center'>401, Lotus zing tower 1, Sector 168, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201305</p>

                </div>
                <div>
                </div>
            </div>

        </div>
    )
}

export default Contact