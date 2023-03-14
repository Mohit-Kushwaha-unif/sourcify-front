import React from 'react'
import { useNavigate } from 'react-router-dom'
import Sourcify from '../../assests/Sourcify Logo.png'
const Footer = () => {
  const navigate = useNavigate()
  return (
    
    <footer className="relative py-15 flex flex-col items-center bg-white overflow-hidden">
      <div className="relative z-[1] container m-auto px-6 md:px-12">
        <div className="m-auto md:w-11/12 lg:w-11/12 xl:w-11/12">
          <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
            <div className="w-full space-x-12 flex flex-col md:flex-row justify-center sm:w-7/12 md:justify-start">
              <ul className="space-y-8  flex-1">
                <li><img className='  mb-2 w-3/4' src={Sourcify} /></li>
              </ul>

              <ul role="list" className="footer space-y-8" style={{marginLeft: '5rem'}}>
                <li>
                  <span className='flex items-center font-semibold space-x-3'>Quick Links</span>
                </li>
                <li>
                  <span className='flex items-center space-x-3'> Terms & Conditions</span>
                </li>
                <li>

                  <span className='flex items-center space-x-3'>Privacy Policy</span>

                </li>

                <li>

                  <span className='flex items-center space-x-3'>Disclaimer</span>

                </li>

              </ul>
            </div>
            <div className="w-10/12 m-auto  flex justify-center flex-col mt-4 space-y-6 ml-20   sm:w-5/12 ">
              <span className="block font-semibold cursor-pointer">Resources</span>

              <span className="block cursor-pointer">Blog</span>
              <span className="block cursor-pointer" >Case Study</span>
              <span className="block cursor-pointer" onClick={()=>navigate('/about-us')}>About Us </span>
              <span className="block cursor-pointer">Career</span>
            </div>
          </div>
        </div>
      </div>


    </footer>

  )
}

export default Footer
