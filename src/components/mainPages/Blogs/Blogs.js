import React from 'react'
import Insight from './Insight'
import gal4 from '../../../assests/gal4.png'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const Blogs = () => {
    useEffect(() => {
        AOS.init();
      }, [])
    return (
        <div className=' mt-3 mb-16'>
            <Insight />
            <div className='container'> 
            <p className='prime_h2 mb-5'>Blogs</p>
            <div className=' grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='relative' data-aos="fade-left">
                    <img src={gal4} className="inset-0 object-cover w-full h-full  " />
                    <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
                    <div className="absolute  left-[10%] right-[10%] bottom-[10%]  text-white">

                        <h1 className="white_semi_head " data-translate="hi"> How Sourcify is Revolutionizing the Sourcing Process</h1>
                        <button className="mt-2  flex items-center text-[#FF5757] leading-10 mb-3 "> <span className='text-sm '><Link to="/blog" data-translate="hi">Continue Reading</Link> </span></button>
                        <div className='realtive'>
                            <div className='absolute border-[1px] border-[#FF5757] top-[83%] left-[2px] right-[61%]'></div>
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <img src={gal4} className="inset-0 object-cover w-full h-full  " />
                    <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
                    <div className="absolute  left-[10%] right-[10%] bottom-[10%]  text-white">

                        <h1 className="white_semi_head " data-translate="hi"> How Sourcify is Revolutionizing the Sourcing Process</h1>
                        <button className="mt-2  flex items-center text-[#FF5757] leading-10 mb-3 "> <span className='text-sm '><Link to="/blog" data-translate="hi">Continue Reading</Link> </span></button>
                        <div className='realtive'>
                            <div className='absolute border-[1px] border-[#FF5757] top-[83%] left-[2px] right-[61%]'></div>
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <img src={gal4} className="inset-0 object-cover w-full h-full  " />
                    <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
                    <div className="absolute  left-[10%] right-[10%] bottom-[10%]  text-white">

                        <h1 className="white_semi_head " data-translate="hi"> How Sourcify is Revolutionizing the Sourcing Process</h1>
                        <button className="mt-2  flex items-center text-[#FF5757] leading-10 mb-3 "> <span className='text-sm '><Link to="/blog" data-translate="hi">Continue Reading</Link> </span></button>
                        <div className='realtive'>
                            <div className='absolute border-[1px] border-[#FF5757] top-[83%] left-[2px] right-[61%]'></div>
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <img src={gal4} className="inset-0 object-cover w-full h-full  " />
                    <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
                    <div className="absolute  left-[10%] right-[10%] bottom-[10%]  text-white">

                        <h1 className="white_semi_head " data-translate="hi"> How Sourcify is Revolutionizing the Sourcing Process</h1>
                        <button className="mt-2  flex items-center text-[#FF5757] leading-10 mb-3 "> <span className='text-sm '><Link to="/blog" data-translate="hi">Continue Reading</Link> </span></button>
                        <div className='realtive'>
                            <div className='absolute border-[1px] border-[#FF5757] top-[83%] left-[2px] right-[61%]'></div>
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <img src={gal4} className="inset-0 object-cover w-full h-full  " />
                    <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
                    <div className="absolute  left-[10%] right-[10%] bottom-[10%]  text-white">

                        <h1 className="white_semi_head " data-translate="hi"> How Sourcify is Revolutionizing the Sourcing Process</h1>
                        <button className="mt-2  flex items-center text-[#FF5757] leading-10 mb-3 "> <span className='text-sm '><Link to="/blog" data-translate="hi">Continue Reading</Link> </span></button>
                        <div className='realtive'>
                            <div className='absolute border-[1px] border-[#FF5757] top-[83%] left-[2px] right-[61%]'></div>
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <img src={gal4} className="inset-0 object-cover w-full h-full  " />
                    <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
                    <div className="absolute  left-[10%] right-[10%] bottom-[10%]  text-white">

                        <h1 className="white_semi_head " data-translate="hi"> How Sourcify is Revolutionizing the Sourcing Process</h1>
                        <button className="mt-2  flex items-center text-[#FF5757] leading-10 mb-3 "> <span className='text-sm '><Link to="/blog" data-translate="hi">Continue Reading</Link> </span></button>
                        <div className='realtive'>
                            <div className='absolute border-[1px] border-[#FF5757] top-[83%] left-[2px] right-[61%]'></div>
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <img src={gal4} className="inset-0 object-cover w-full h-full  " />
                    <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
                    <div className="absolute  left-[10%] right-[10%] bottom-[10%]  text-white">

                        <h1 className="white_semi_head " data-translate="hi"> How Sourcify is Revolutionizing the Sourcing Process</h1>
                        <button className="mt-2  flex items-center text-[#FF5757] leading-10 mb-3 "> <span className='text-sm '><Link to="/blog" data-translate="hi">Continue Reading</Link> </span></button>
                        <div className='realtive'>
                            <div className='absolute border-[1px] border-[#FF5757] top-[83%] left-[2px] right-[61%]'></div>
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <img src={gal4} className="inset-0 object-cover w-full h-full  " />
                    <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
                    <div className="absolute  left-[10%] right-[10%] bottom-[10%]  text-white">

                        <h1 className="white_semi_head " data-translate="hi"> How Sourcify is Revolutionizing the Sourcing Process</h1>
                        <button className="mt-2  flex items-center text-[#FF5757] leading-10 mb-3 "> <span className='text-sm '><Link to="/blog" data-translate="hi">Continue Reading</Link> </span></button>
                        <div className='realtive'>
                            <div className='absolute border-[1px] border-[#FF5757] top-[83%] left-[2px] right-[61%]'></div>
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <img src={gal4} className="inset-0 object-cover w-full h-full  " />
                    <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
                    <div className="absolute  left-[10%] right-[10%] bottom-[10%]  text-white">

                        <h1 className="white_semi_head " data-translate="hi"> How Sourcify is Revolutionizing the Sourcing Process</h1>
                        <button className="mt-2  flex items-center text-[#FF5757] leading-10 mb-3 "> <span className='text-sm '><Link to="/blog" data-translate="hi">Continue Reading</Link> </span></button>
                        <div className='realtive'>
                            <div className='absolute border-[1px] border-[#FF5757] top-[83%] left-[2px] right-[61%]'></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Blogs