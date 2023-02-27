import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_content } from '../../../services/content'
import useDocumentTitle from '../../Helper/useDocumentTitle'
import ban_img from '../../../assests/3227422.jpg'
import hero from '../../../assests/About us Hero Banner.jpg'
import Person from '../../../assests/person.jpg'
import { Form, Input, Select } from 'antd'
import build from '../../../assests/build.jpg'
import TextArea from 'antd/es/input/TextArea'
const AboutUs = () => {
  const dispatch = useDispatch()

  useDocumentTitle('About Us')
  const [about, setAbout] = useState()
  dispatch(get_content()).then((res) => {
    res.map((content) => {
      if (content.section_type === "About Us") {
        setAbout(content.description)
      }
    })
  }).catch((err) => { console.log(err) })
  //     <div className='flex flex-col w-full'>
  //     <header class=" bg-gray-900 text-white">
  //   <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
  //     <h1 class="text-3xl font-bold">About Us</h1>
  //   </div>
  // </header>
  // <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
  //   <div class="max-w-3xl mx-auto">
  //     <p class="text-xl mb-6" dangerouslySetInnerHTML={{__html:about}}>
  //     </p>
  //     <p class="text-xl mb-6">

  //     </p>
  //   </div>
  // </main>
  // {/* <footer class="fixed bottom-0 w-full b bg-gray-900 text-white">
  //   <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
  //     <p class="text-center">&copy; 2023 My Company. All rights reserved.</p>
  //   </div>
  // </footer> */}
  //   </div>
  return (
    <>
      <div className='bg-white'>
        <body>
          <div class="relative">
            <img src={hero} className="h-[32rem] w-full" />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <h1 class="flex justify-center mb-3 text-5xl font-bold  text-[#FF5757]">
                Sourcify</h1>
                <div className='flex mb-3 flex-col '>
              <div className=' text-white font-semibold capitalize mb-3 text-4xl '>Where sub-contracting meets </div>
              <p className='flex justify-center text-white font-semibold capitalize mb-3 text-4xl'>Innovation</p>
              </div>
              <div className='flex justify-center'>
              <button className='text-white fixed font-semibold bg-[#FF5757] rounded-[50px] px-3 py-2 hover:bg-transparent hover:border-2 hover:broder-white'>Get Started</button>
              </div>
            </div>
          </div>
        </body>
        <div className='bg-white '>

          <section id="hero h-auto">

            <div class="container flex flex-col-reverse bg-white item-center p-6 mx-auto mt-10 space-y-0 md:flex-row">

              <div class="flex flex-col mb-2 h-auto  md:w-1/2">
                <p class="max-w-md text-4xl text-base font-bold ml-5 text-center md:text-base md:text-left">
                  What we <span className='text-red-400'>Do</span>
                </p>
                <p class="max-w-sm text-center ml-1  md:text-4xl text-left">
                  Bringing Businesses & Contractors
                  Together.
                </p>
                <div class="flex justify-center md:justify-start">
                  <p
                    class="p-3 px-6 pt-2  bg-brightRed rounded-full baseline hover:bg-brightRedLight">Get
                    At Sourcify, we’re all about bringing businesses and contractors together, our platform creates a bridge between businesses looking for contractors and contractors looking for project opportunities. We strive to provide a seamless and reliable platform that makes  it easy for businesses and contractors to collaborate and succeed.</p>
                </div>
                <div className=' flex justify-center '>
                  <button
                    className="w-1/2 px-7 py-3 bg-[#FF5757] rounded-[50px] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Get Started


                  </button>
                </div>
              </div>

              <div class="md:w-1/2 radius-12">
                <img src={ban_img} alt="" />
              </div>
            </div>
          </section>
          <section id="hero">
            <div class=" flex flex-col bg-white item-center p-6 mx-auto mt-10 space-y-0 md:flex-row">
              <div class="flex align-stretch justify-center md: max-h-80  overflow-hidden radius-12 ">
                <img src={Person} alt="" className=" w-full"  />
              </div>
              <div class="flex flex-col md:max-h-10">
                <p class="max-w-md text-4xl text-base font-bold ml-5 text-center md:text-base md:text-left">
                  <span className='text-red-400'>Our Story</span>
                </p>
                <p class="max-w-sm  ml-5  md:text-4xl text-left">
                  Founder's Message
                </p>
                <div class="flex justify-center md:justify-start">
                  <p
                    class="p-3 px-6 pt-2  bg-brightRed rounded-full baseline hover:bg-brightRedLight">Get
                    I'm delighted to introduce you to Sourcify, a platform that was born out of my passion for sub-contracting and the desire to make it easy and transparent for everyone involved. After working in the sub-contracting industry for 20 years, I realized that there was a significant gap in the market when it came to connecting buyers with sub-contractors. Both parties often faced challenges when it came to finding new opportunities and projects, and I wanted to create a solution that could address these issues.

                    At Sourcify, we're committed to innovation, integrity, and providing an outstanding experience for our users. We believe that by simplifying the sub-contracting process, we can help businesses and contractors achieve their goals, and in turn, contribute to the growth and success of the industry as a whole.</p> </div>

              </div>


            </div>
          </section>
        </div>
        <section id="hero h-auto">

          <div class="flex flex-col bg-white item-center p-6 mx-auto  space-y-0 md:flex-row">
            <div class="md:w-[96%] radius-12 ">
              <img src={build} alt="" className='w-[85%] h-full' />
            </div>
            <div class="flex flex-col mb-2 h-auto  md:w-full">
              <p className='font-semibold mb-2'>Get in touch</p>
              <Form labelAlign="left"

                layout="vertical" >
                <Form.Item name="name" label="Full Name " rules={[
                  {
                    required: true,
                    message: 'Please input your Full Name'
                  },
                ]}
                  className="mb-1"
                >

                  <Input placeholder='Enter your Full Name' />
                </Form.Item>
                <Form.Item name='mobile_number' className='mb-1 mt-0' label="Mobile Number" rules={[
                  {
                    required: true,
                    message: 'Please input your Mobile Number'
                  },
                ]}
                >

                  <TextArea placeholder='Enter your 10 digit Mobile Number' />
                </Form.Item>
                <Form.Item name='email_id' className='mb-1 mt-0' label="Email ID" rules={[
                  {
                    required: true,
                    message: 'Please input your Email ID'
                  },
                ]}
                >

                  <Input type='email' placeholder='Enter your Email' />
                </Form.Item>
                <Form.Item name='message' className='mb-1 mt-0' label="Message" rules={[
                  {
                    required: true,
                    message: 'Please input your Message'
                  },
                ]}
                >

                  <TextArea row={4} cols={50} />
                </Form.Item>



                <div className="text-center lg:text-left mt-2">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                  >

                    Save
                  </button>
                </div>
              </Form>
            </div>


          </div>
        </section>
      </div>
    </>

  )
}

export default AboutUs