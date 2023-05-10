import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_category } from '../../../services/category'
// import Caraousel from '../../Helper/caraousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import { get_carausel } from '../../../services/Carausle';

import Construction_pana from '../../../assests/Construction-pana.png'
import frame_charge from '../../../assests/frame_charge.png'
import web from '../../../assests/web.png'
import bookmark from '../../../assests/bookmark.png'
import checked from '../../../assests/checked.png'
import carbon_clean from '../../../assests/carbon_clean.png'
import proposal from '../../../assests/proposal.png'
import post from '../../../assests/post.png'
import register from '../../../assests/register.png'
import sourc_img from '../../../assests/sourc_img.png'
import mssg from '../../../assests/mssg.png'
import personalized from '../../../assests/personalized.png'
import down_arrow from '../../../assests/down_arrow.png'

import right from '../../../assests/right.png'
import Insight from '../Blogs/Insight';
import Regsiter from '../auth/Register';
const Dashboard = () => {
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [category, setCategory] = useState([])
    const [caraousel, setCarausel_img] = useState([])
    // const userRole =  useSelector(state => state.User.user_role);
    useEffect(() => {
        dispatch(get_category()).then((res) => {
            // console.log(res)
            var data = []
            res.map((cats) => {
                data.push(cats)
            })
            setCategory(data)
        })
        dispatch(get_carausel()).then((res) => {
            setCarausel_img(res)
        })
    }, [])


    return (
        <div>
            <div className='container mb-24'>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div className='content order-2 md:order-1'>


                        <div className='mt-5 '>
                            <h2 className='prime_h2 mb-5' data-translate="hi">Bringing Businesses &
                                Contractors Together</h2>
                            <p className='section_text mb-5'data-translate="hi">Sourcify creates a seamless bridge between businesses looking for contractors and contractors looking for projects.
                                With our platform, businesses can easily find and connect with vetted contractors and suppliers who meet
                                their specific needs. </p>
                            <div className='flex flex-col md:flex-row  '>
                                <button className='prime_button_sec mb-5 md:mb-0 md:mr-5' data-translate="hi" onClick={() => navigator('/register')}>Register as a Contractor</button>
                                <button className='brand_button justify-center text-center w-auto' data-translate="hi" onClick={() => navigator('/dashboard/listing-form')}>Post Project</button>
                            </div>
                        </div>
                    </div>



                    <img className='w-full h-full order-1 md:order-2' src={Construction_pana} />

                </div>


            </div>
            <div className=' bg-[#00272B] mb-24'>
                <div className='container'>
                    <div className=' grid grid-cols-1 md:grid-cols-4 py-8 mx-4 md:mx-0 gap-y-10 place-content-center'>

                        <div className='flex items-center  place-items-start'>
                            <img src={frame_charge} className="mr-5" />
                            <p className='white_h3'data-translate="hi">Free of Charge</p>
                        </div>
                        <div className='flex items-center  place-items-start'>
                            <img src={web} className="mr-5" />
                            <p className='white_h3'data-translate="hi">Top-notch Contractors</p>
                        </div>
                        <div className='flex items-center  place-items-start'>
                            <img src={bookmark} className="mr-5" />
                            <p className='white_h3'data-translate="hi">Easy & Transparent</p>
                        </div>
                        <div className='flex items-center  place-items-start'>
                            <img src={checked} className="mr-5" />
                            <p className='white_h3'data-translate="hi">Collaboration made easy</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container grid md:grid-cols-2 grid-cols-1 gap-6 contractor mb-24'>
                <div>
                    <h2 className='prime_h2_rale mb-3'data-translate="hi">Register Yourself</h2>
                    <br/>
                    <p data-translate="hi">Welcome to our registration page! We're excited to have you join our community. <br/><br/>

                        To get started, please provide us with some basic information so we can create your account. This includes your  email address, mobile number, and a password of your choice.

                        Once you've filled out the required fields and accepted our terms and conditions, click the "Register" button to create your account. After that, you'll receive a confirmation email with a link to activate your account.

                        <br/> <br/>With your new account, you'll be able to access all the features and benefits of our platform. This includes personalized recommendations, exclusive content, and the ability to connect with other members of our community.

                        <br/><br/>Thank you for choosing to register with us. We look forward to seeing you around </p>
                </div>
                <Regsiter />
                {/* <p className='text-[#FF5757] underline mb-16 cursor-pointer' onClick={()=>{navigator('/work_segment')}}>Browse all Work Segments</p>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-x-6 mb-10  '>

                    {
                        category.map((cats) => {
                            return <div onClick={() => navigator('/all_contractors', { state: cats })} className="p-16 shadow-md center_content flex-col  rounded-[6px] " >
                                <img src={carbon_clean} />
                               <p className='text-center'>{cats.name}</p> 
                            </div>
                        })
                    } </div>
                <div className='center_content'>
                    <button  onClick={()=>{navigator('/work_segment')}} className=' prime_button'>
                        See All Work Segments
                    </button>
                </div> */}


            </div>
            <div className=' bg-[#00272B] mb-24 py-16 md:p-16'>
                <p data-translate="hi" className='center_content mb-5 white_h3 cursor-pointer' onClick={() => navigator('/SourcifyWork')}>
                    How it works
                </p>
                <p data-translate="hi" className='center_content text-center white_p '>
                    Create your free account, register as a contractor to find projects or post projects
                </p>
                <p data-translate="hi" className='center_content white_p mb-16'>to find contractors to get work done.</p>
                <div className='grid container md:gap-x-6  gap-y-6 grid-cols-1 md:grid-cols-3 mb-16'>
                    <div className='grid_card_design'>
                        <img src={register} className="grid_img_design w-full" alt="Register Account" />
                        <h2 data-translate="hi" className='grid_heading text-center'>Register Account</h2>
                        <p data-translate="hi" className='text-center'>
                            Create your free account, register as a contractor to find projects or post projects to find contractors to get work done.
                        </p>
                    </div>
                    <div className='grid_card_design '>
                        <img src={post} className="grid_img_design" alt="Post Projects" />
                        <h2 data-translate="hi" className='grid_heading text-center' >Post Projects</h2>
                        <p data-translate="hi" className='text-center'>
                            Companies looking for contractors can post their projects and hire contractors to get the work done.
                        </p>
                    </div>
                    <div className='grid_card_design'>
                        <img src={proposal} className="grid_img_design" alt="Share Interests" />
                        <h2 data-translate="hi" className='grid_heading text-center'>Share Interest</h2>
                        <p data-translate="hi" className='text-center'>
                            Contractors looking for projects can share their interest
                            for the projects listed by top companies.
                        </p>
                    </div>


                </div>
                <div className='center_content '>
                    <button data-translate="hi" className='brand_button' onClick={() => navigator('/SourcifyWork')}>See How Sourcify Works <img src={right} /> </button>
                </div>
            </div>
            <div className='absolute border-2  border-[#FF5757] right-[47%] left-[47%]'> </div>

            <div className='relative'>
                <h2 data-translate="hi" className='center_content  mt-32  prime_h2_rale mb-5'>Why Sourcify</h2>
                <p data-translate="hi" className='text-center md:px-80 mb-16'> Sourcify is the ideal platform for businesses looking to streamline their sourcing and supply chain operations. With our platform businesses can access a wide network of contractors
                    and contractors can get projects from top companies</p>
            </div>
            <div className='container grid grid-cols-1 md:grid-cols-2 gap-8 mb-24'>
                <img src={sourc_img} className="" alt="why sourcify image" />
                <div className='mt-3'>
                    <div className='flex my-3'>
                        <img className='h-full mr-3'  src={down_arrow} />
                        <p data-translate="hi" className='text-[#FF5757] font-semibold text-[21px] '>Innovation Free of Cost</p>
                    </div>
                    <p data-translate="hi" className='mb-8'>
                        Sourcify drives innovation free of cost through data-driven insights and technology. Sourcify provides a comprehensive platform for businesses to manage their sourcin g and supply chain operations
                    </p>
                    <div className='flex my-3'>
                        <img className='h-full mr-3' src={mssg} />
                        <p data-translate="hi" className='text-[#FF5757] font-semibold text-[21px] '> Communication and Collaboration </p>
                    </div>
                    <p data-translate="hi" className='mb-8'>
                        Sourcify facilitates communication and collaboration between businesses and contractors, enabling them to work together seamlessly. With Sourcify, businesses can communicate with their contractors and suppliers in real-time, ensuring that everyone is on the same page.
                    </p>
                    <div className='flex my-3'>
                        <img className='h-full mr-3' src={personalized} />
                        <p data-translate="hi"  className='text-[#FF5757] font-semibold text-[21px] '>Personalized Support</p>
                    </div>
                    <p data-translate="hi" className='mb-8'>
                        Sourcify offers personalized support from a team of experts with sourcing and supply chain expertise. With Sourcify, businesses have access to a dedicated account manager who can provide customized solutions and support throughout the sourcing process.
                    </p>

                </div>
            </div>
            <Insight />

        </div>
    )
}

export default Dashboard