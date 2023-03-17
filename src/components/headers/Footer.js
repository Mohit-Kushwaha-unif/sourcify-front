import { Button, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Sourcify from '../../assests/Sourcify.png'
import { FaLandmark } from 'react-icons/fa'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {MdAlternateEmail} from 'react-icons/md'
// import { icons } from 'react-icons'
const Footer = () => {
  const navigate = useNavigate()
  return (
    


    <footer className='container bg-white'>

      <div className="row footer">
        <div className="col-md-4">
          <img src={Sourcify}/>
          <div className='flex'><i className='mr-2'><FaLandmark/></i>115, Tower A, Spazedge, Sohna Road, Gurugram, Haryana 122018</div>
          <div className='flex'><i className='mr-2'><BsFillTelephoneFill/></i>+91-99676 62976</div>
          <div className='flex'><i className='mr-2'><MdAlternateEmail/></i>info@sourcify.in</div>
        </div>
        <div className="col-md-2">
          <h3>Quick Links</h3>
          <ul>
            <li>Terms & Conditions</li>
            <li>Disclaimer</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="col-md-2">
        <h3>Resources</h3>
          <ul>
            <li>Blog</li>
            <li>Case Study</li>
            <li>About us</li>
            <li>Career</li>
          </ul>
        </div>

        <div className="col-md-4">
        <h3>Newsletter</h3>
        <form>
          <Input type="text" className='mb-3' placeholder='Enter your email address'/>
        </form>
        <button className='inline-block w-full py-2 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded-[50px] shadow-md hover:bg-[#FF5759] hover:shadow-lg focus:bg-[#FF5757] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FF5757] active:shadow-lg transition duration-150 ease-in-out"'>Subscribe</button>

        </div>
      </div>

    </footer>



  )
}

export default Footer
