import React from 'react'
import { useNavigate } from 'react-router-dom'
import Sourcify from '../../assests/Sourcify Logo.png'
const Footer = () => {
  const navigate = useNavigate()
  return (
    
    <footer class="relative py-15 flex flex-col items-center bg-white overflow-hidden">
      <div class="relative z-[1] container m-auto px-6 md:px-12">
        <div class="m-auto md:w-11/12 lg:w-11/12 xl:w-11/12">
          <div class="flex flex-wrap items-center justify-between md:flex-nowrap">
            <div class="w-full space-x-12 flex justify-center  sm:w-7/12 md:justify-start">
              <ul class="space-y-8 flex-1">
                <li><img className=' ml-20 mb-2 w-3/4' src={Sourcify} /></li>
              </ul>

              <ul role="list" class="space-y-8">
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
            <div class="w-10/12 m-auto  mt-16 space-y-6 ml-20 text-center sm:text-left sm:w-5/12 sm:mt-auto">
              <span class="block font-semibold cursor-pointer">Resources</span>

              <span class="block cursor-pointer">Blog</span>
              <span class="block cursor-pointer" >Case Study</span>
              <span class="block cursor-pointer" onClick={()=>navigate('/about-us')}>About Us </span>
              <span class="block cursor-pointer">Career</span>
            </div>
          </div>
        </div>
      </div>


    </footer>

  )
}

export default Footer
