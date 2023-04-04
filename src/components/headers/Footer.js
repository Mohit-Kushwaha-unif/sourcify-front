import { Button, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Sourcify from '../../assests/Sourcify.png'
import { FaLandmark } from 'react-icons/fa'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {MdAlternateEmail} from 'react-icons/md'
import { Link } from 'react-router-dom' 
// import { icons } from 'react-icons'
const Footer = () => {
  const navigate = useNavigate()
  return (
    


    <footer className='bg-[#f3f3f3]  text-[14px] mx-auto px-4 '>

      <div className="grid grid-cols-1 md:grid-cols-12 footer">
        <div className="col-span-4 md:pl-3">
          <img src={Sourcify} className="image-box"/>
          <div className='flex items-center'><i className='mr-2'><FaLandmark/></i>115, Tower A, Spazedge, Sohna Road, Gurugram, Haryana 122018</div>
          <div className='flex items-center'><i className='mr-2'><BsFillTelephoneFill/></i>+91-99676 62976</div>
          <div className='flex items-center'><i className='mr-2'><MdAlternateEmail/></i>info@sourcify.in</div>
        </div>
        <div className="col-span-4 mt-3 md:col-span-2 md:mt-0">
          <h3>Quick Links</h3>
          <ul>
         <li> <Link className='cursor-pointer' to={'/privacy-policy'}>Terms & Conditions</Link></li>
         <li> <Link className='cursor-pointer' to={'/privacy-policy'}>Disclaimer</Link></li>
         <li> <Link className='cursor-pointer' to={'/privacy-policy'}>Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="col-span-4 md:col-span-2">
        <h3>Resources</h3>
          <ul>
            <li className='cursor-pointer' onClick={()=>navigate('/register')}>Register</li>
            {/* <li>Case Study</li>
            <li>About us</li>
            <li>Career</li> */}
          </ul>
        </div>

        <div className="mb-3 col-span-4">
        <h3>Newsletter</h3>
        <form>
          <Input type="text" placeholder='Enter your email address' className='mb-3' />
        </form>
        <button className='primary_btn w-full'>Submit</button>

        </div>
      </div>

    </footer>



  )
}

export default Footer
