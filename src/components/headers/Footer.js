import React from 'react'
import { useLocation } from 'react-router-dom'
import { AiFillLinkedin, AiFillFacebook } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Work_segment_foooter from './Work_segment_foooter'
import email from '../../assests/email.png'
import Sourcify_white from '../../assests/Sourcify_white.png'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
const Footer = () => {
  const isAdmin = useSelector(state => state.User.user_role);
  const location = useLocation()
  useEffect(() => { }, [location])
  return (
    <>
      {
        isAdmin != 2 &&
        <>
          {location.pathname == "/work_segment/" ? '' : <Work_segment_foooter />}
          <footer className='bg-[#00272B]  text-[14px] mx-auto px-4 '>
            <div className='container'>
              <div className="grid grid-cols-1 mb-10  md:grid-cols-12 footer">

                <div className="col-span-3  mt-3 md:col-span-3  md:mt-0">
                  <h3 className='white_h3 mt-8' data-translate="hi">Quick Links</h3>
                  <ul>
                    <li className='pt-3'> <Link className='cursor-pointer white_p' data-translate="hi" to={'/register'}>Register as Contractor</Link></li>
                    <li className='pt-3'> <Link className='cursor-pointer white_p' data-translate="hi" to={'/dashboard/listing-form'}>Post Projects</Link></li>
                    <li className='pt-3'> <Link className='cursor-pointer white_p' data-translate="hi" to={'/work_segment/#all'}>Work Segments</Link></li>
                    <li className='pt-3'> <Link className='cursor-pointer white_p' data-translate="hi" to={'/contractors'}>Find Contractors</Link></li>
                  </ul>
                </div>
                <div className="col-span-3 md:col-span-3">
                  <h3 className='white_h3 mt-8' data-translate="hi">Company</h3>
                  <ul>
                    <li className='pt-3'><Link className='cursor-pointer white_p ' data-translate="hi" to={'/about-us'}>About Sourcify</Link></li>
                    <li className='pt-3'><Link className='cursor-pointer white_p ' data-translate="hi" to={'/SourcifyWork'}>How Sourcify Works</Link></li>
                    <li className='pt-3'><Link className='cursor-pointer white_p ' data-translate="hi" to={'/contact-us'}>Contact us</Link></li>

                  </ul>
                </div>

                <div className="mb-3 col-span-3">
                  <h3 className='white_h3 mt-8' data-translate="hi">Resources</h3>
                  <ul >
                    <li className='pt-3'> <Link className='cursor-pointer white_p p  mt-3' data-translate="hi" to={'/blogs'}>Blog</Link></li>
                    <li className='pt-3'> <Link className='cursor-pointer white_p p  mt-3' data-translate="hi" to={'/support'}>Help & FAQ</Link></li>
                    <li className='pt-3'><Link className='cursor-pointer white_p ' data-translate="hi" to={'/privacy-policy'}>Terms of Services</Link></li>
                    <li className='pt-3'><Link className='cursor-pointer white_p ' data-translate="hi" to={'/privacy-policy'}>Privacy Policy</Link></li>
                  </ul>
                </div>

                <div className="mb-3 col-span-3">
                  <h3 className='white_h3 mt-8 mb-5' data-translate="hi">Connect with us</h3>
                  <div className='flex pt-3'>
                    <Link target="_blank" to="https://www.facebook.com/profile.php?id=100091400896776">
                      <AiFillFacebook className='mb-3  rounded-[50px] text-white text-[50px]' />
                    </Link>
                    <Link to="https://www.linkedin.com/company/sourcify-in">
                      <AiFillLinkedin className='ml-5 rounded-[50px] text-white text-[50px]' />
                    </Link>
                  </div>
                  <p className='white_p mb-5 pt-3' data-translate="hi">Write us at</p>

                  <p className='flex mb-5'>
                    <span className='mr-3' > <img src={email} /></span>
                    <span className='white_p'  > info@sourcify.in</span>
                  </p>
                </div>
              </div>
              <div className='border_footer mb-3'></div>
              <div className="pb-5 flex md:flex-row flex-col justify-between">
                <img src={Sourcify_white} className="md:w-[10%] md:mb-0 mb-3  image-box bg-white" />

                <p className='white_p t data-translate="hi" ext-center' data-translate="hi">Copyright 2023, Shras Technologies Private Limited </p>
                <p className='white_p t data-translate="hi" ext-center' data-translate="hi">Designed & Developed by uniftec.com</p>
              </div>
            </div>
          </footer>

        </>
      }
    </>


  )
}

export default Footer
