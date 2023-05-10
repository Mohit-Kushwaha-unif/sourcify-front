import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import gal1 from '../../../assests/gal1.png'
import gal2 from '../../../assests/gal2.png'
import gal3 from '../../../assests/gal3.png'
import gal4 from '../../../assests/gal4.png'
import gal5 from '../../../assests/gal5.png'
import right from '../../../assests/right.png'
import { Link } from 'react-router-dom';
const Insight = () => {
    useEffect(() => {
        AOS.init();
      }, [])
  return (
    <div className='container mb-24 ' >
    <p className='prime_h2_rale mb-16' data-translate="hi">Our Insights</p>
    <div className='grid grid-cols-1 md:grid-cols-5 gap-y-6 md:gap-6'  >
        <div className="relative col-span-2 "  >
            <img src={gal1} className=" inset-0 object-cover w-full h-full  " alt="Your Image" />
            <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
            <div className="absolute  left-[5%] right-[5%] bottom-[10%]  text-white" data-aos="fade-up" >

                <h1 data-translate="hi" className="white_h3 mb-10 ">5 Ways Sourcify Can Help Small Businesses Optimize Their Supply Chain</h1>
                <Link to="/blog"> <button data-translate="hi" className="mt-2 brand_button flex items-center"> <span>Continue Reading </span><img className='ml-3' src={right}/></button></Link>
            </div>
        </div>
        <div className="relative md:col-span-3  grid-cols-1 gap-y-4 grid md:grid-cols-2 md:gap-4">
            <div className='relative'>
          <img src={gal2} className="inset-0 object-cover w-full h-full  " />
          <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
          <div className="absolute  left-[10%] right-[10%] bottom-[10%]  text-white" data-aos="fade-up" >

                <h1 className="white_semi_head "data-translate="hi">Why Outsourcing Your Sourcing and Supply Chain Operations Makes Sense</h1>
                <Link to="/blog">  <button className="mt-2 flex items-center" data-translate="hi"> <span>Continue Reading </span><img className='ml-3' src={right}/></button> </Link>
            </div>
            </div>
            <div className='relative'>
            <img src={gal3} className="inset-0 object-cover w-full h-full  " />
            <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
            <div className="absolute  left-[10%] right-[10%] bottom-[10%]  text-white" data-aos="fade-up" >

                <h1 className="white_semi_head " data-translate="hi"> How Sourcify is Revolutionizing the Sourcing Process</h1>
                <Link to="/blog"> <button className="mt-2 flex items-center" data-translate="hi"> <span>Continue Reading </span><img className='ml-3' src={right}/></button> </Link>
            </div>
            </div>
            <div className='relative'>
            <img src={gal4} className="inset-0 object-cover w-full h-full  " />
            <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
            <div className="absolute  left-[10%] right-[10%] bottom-[10%]  text-white" data-aos="fade-up" >

                <h1 className="white_semi_head " data-translate="hi"> Navigating Global Supply Chain Challenges </h1>
                <Link to="/blog"><button className="mt-2 flex items-center" data-translate="hi"> <span>Continue Reading </span><img className='ml-3' src={right}/></button> </Link>
            </div>
            </div>
            <div className='relative'>
            <img src={gal5} className="inset-0 object-cover w-full h-full  " />
            <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
            <div className="absolute  left-[10%] right-[10%] bottom-[10%]  text-white" data-aos="fade-up" >
                <h1 className="white_semi_head " data-translate="hi"> The Future of Sourcing and Supply Chain Management </h1>
                <Link to="/blog"> <button data-translate="hi" className="mt-2 flex items-center"> <span>Continue Reading </span><img className='ml-3' src={right}/></button></Link>
            </div>
            </div>
        </div>

        <div>

        </div>
    </div>
</div>
  )
}

export default Insight