import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_content } from '../../../services/content'
import useDocumentTitle from '../../Helper/useDocumentTitle'
import ban_img from '../../../assests/3227422.jpg'
import hero from '../../../assests/About_us_Hero_Banner.jpg'
import Person from '../../../assests/person.jpg'
import { Form, Input, Select } from 'antd'
import build from '../../../assests/build.jpg'
import TextArea from 'antd/es/input/TextArea'
import { add_feedback } from '../../../services/FeedBack'
import { useForm } from 'antd/es/form/Form'
import { get_about } from '../../../services/About'
import { useNavigate } from 'react-router-dom'
import Owner from '../../../assests/owner.jpg'
import Regsiter from '../auth/Register'

const AboutUs = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const [form] = Form.useForm()
  useDocumentTitle('About Us')
  const [showMsg, setShowMsg] = useState(false)
  const [about, setAbout] = useState(true)
  var [initialWord, setInitialWord] = useState()
  const [lastWord, setLastWord] = useState()
  const [screenSize, getDimension] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false)
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    if (screenSize <= 759) {
      // setShowMenu(true)
      setShowMenu(false)
    } else {
      setShowMenu(true)
    }
  }, [screenSize])

  useEffect(() => {
    dispatch(get_about()).then((res) => {
      setAbout(res[0])

      var str = res[0].Banner[0].sub_title;
      var lastIndex = str.lastIndexOf(" ");
      var strlen = str.length
      var str1 = str.slice(lastIndex, strlen);
      setLastWord(str1)
      var string = str.substring(0, lastIndex);
      setInitialWord(string)
    })
  }, [])
  console.log(showMsg)
  function feedBackHandler(value) {
    (
      dispatch(add_feedback(value)).then((res) => {
        setShowMsg(true)
        form.resetFields()

      })
    )
  }
  const setDimension = () => {
    getDimension(window.innerWidth)
  }
  return (

    <div className=' mx-auto bg-[#ffffff] ' >
     {showMenu? <div className='relative object-cover w-full h-full about_image' style={{backgroundImage: `url(${hero})`}}>
   <div className="absolute  inset-0 bg-[#000000] opacity-5"></div>
      <div className='grid grid-cols-1 md:grid-cols-5 ' >
      <div className='col-span-3  relative h-[500px]'      >
        {/* <img src={hero} className=" inset-0 object-cover w-full h-full " /> */}
        {/* <div className="absolute  inset-0 bg-[#000000] opacity-75"></div> */}
        
        <div className="ml-[11px] md:ml-0 absolute top-1/2  md:left-1/2 md:-translate-x-1/2 -translate-y-1/2">
          <div className="hero-abt-sourcify text-center text-base md:hero-abt-sourcify mb-1">Sourcify</div>
          <h1 className=" hero-abt-title text-center mb-2">Where Sourcing meets Innovation</h1>
          <div className='flex justify-center'>
            <button className='text-white  font-semibold  bg-[#FF5757] rounded-[50px] px-[2.25rem] hover:bg-[#e64d4d] md:px-[3.25rem] py-2 ' onClick={() => navigator('/register')}>Get Started</button>
          </div>
        </div>
        
      </div>
      <div className='col-span-2 my-10 mx-5 md:mr-10  rounded-[25px] bg-white'>  <Regsiter/></div>
     
      </div>
      </div>
      :
      
      <div className='grid grid-cols-1 md:grid-cols-5 ' >
      <div className='md:col-span-3 relative h-[500px]'      >
        <img src={hero} className=" inset-0 object-cover w-full h-full " />
        <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
        <div className="ml-[11px] w-full md:ml-0 absolute top-1/2  md:left-1/2 md:-translate-x-1/2 -translate-y-1/2">
          <div className="hero-abt-sourcify text-center text-base md:hero-abt-sourcify mb-1">Sourcify</div>
          <h1 className=" hero-abt-title text-center mb-2">Where Sourcing meets Innovation</h1>
          <div className='flex justify-center'>
            <button className='text-white  font-semibold  bg-[#FF5757] rounded-[50px] px-[2.25rem] hover:bg-[#e64d4d] md:px-[3.25rem] py-2 ' onClick={() => navigator('/login')}>Login</button>
          </div>
        </div>
      
        
      </div>
      <div className='col-span-2 my-10 mx-5 md:mr-10  rounded-[25px] bg-white'>  <Regsiter/></div>
     
      </div>
      
      }
      <div className='px-4 md:px-8'>
        <div className='who_we_are'>
          <div className="  grid grid-cols-1 md:grid-cols-2 pt-5">
            {about !== true &&
              about?.Hero.map((hero) => (
                <>
                  <div className=" mt-[4rem] order-2 md:order-1">
                    <p className="text-base font-bold">
                      {hero.qutoe} <span className="text-[#FF5757]">{hero.quto_emph}</span>
                    </p>
                    <p className="text-[32px] font-bold leading-8">
                      {hero.title}
                    </p>
                    <div className="mt-5">
                      <p className="text-lg font-weight-normal mb-5">
                        {hero.description}
                      </p>
                    </div>
                    <div className='inline-block'>
                      <button
                        onClick={() => navigator('/register')}
                        className="primary_btn btn-lg text-uppercase shadow rounded-pill"
                      >
                        {hero.button}
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-10 col-xl-7 order-1 order-md-2">
                    <img src={ban_img} className="img-fluid rounded" alt="" />
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className='founder mt-10 '>
          <div className='grid grid-cols-1 md:grid-cols-3 pt-5'>

            {about !== true && about.founderAbout.map((founder) => (
              <>
                <div className=" ">
                  <img src={Owner} className="mt-[1.5rem] h-[90%] w-full md:w-[75%] rounded md:mt-0" alt="" />
                </div>
                <div className="   md:my-auto md:col-span-2">
                  <p className="font-semibold text-base">
                    <span className=' text-[red] '>{founder.qutoe}</span>
                  </p>
                  <p className=" text-[2rem] font-semibold leading-8 ">
                    <span className=''>{founder.title}</span>
                  </p>
                  <div className="mt-8">
                    <p
                      className="text-[1.125rem] leading-6 font-normal mb-5">
                      {founder.description}
                    </p>
                  </div>
                </div>

              </>
            ))}

          </div>
        </div>
        <div className='feedback_form pb-6 '>
          <div className=' grid grid-cols-1  md:grid-cols-3 mb-3  pt-10'>


            <div className="col-span-1  md:w-[100%] radius-12  ">
              <img src={about !== true && build} alt="" className='w-full md:w-[90%] h-full object-fill md:object-cover' />
            </div>
            <div className=" h-auto pt-5 w-full my-auto col-span-2  ">
              <p className='  font-bold mb-2 text-[2rem]'>Get in touch</p>
              <Form labelAlign="left"
                form={form}
                onFinish={feedBackHandler}
                layout="vertical" >
                <div className='grid mb-3 grid-cols-1 gap-8 md:grid-cols-2'>
                  <Form.Item name="fullname" label="Full Name " rules={[
                    {
                      required: true,
                      message: 'Please enter your Full Name'
                    },
                  ]}
                    className="mb-1"
                  >

                    <Input placeholder='Enter your Full Name' />
                  </Form.Item>
                  <Form.Item name='company_name' className='mb-1 mt-0' label="Company Name" rules={[
                    {
                      required: true,
                      message: 'Please enter your Company Name'
                    },
                  ]}
                  >

                    <Input placeholder='Enter your Company Name' />
                  </Form.Item>
                </div>
                <div className='grid  mb-3 grid-cols-1 gap-8 md:grid-cols-2'>
                  <Form.Item name='mobile_number' className='mb-1 mt-0' label="Mobile Number" rules={[
                    {
                      required: true,
                      message: 'Please enter your Mobile Number'
                    },
                  ]}
                  >

                    <Input placeholder='Enter your 10 digit Mobile Number' />
                  </Form.Item>
                  <Form.Item name='email' className='mb-1 mt-0' label="Email ID" rules={[
                    {
                      required: true,
                      message: 'Please enter your Email ID'
                    },
                  ]}
                  >

                    <Input type='email' placeholder='Enter your Email' />
                  </Form.Item>
                </div>

                <Form.Item name='Message' className='mb-1 mt-0' label="Message" rules={[
                  {
                    required: true,
                    message: 'Please enter your Message'
                  },
                ]}
                >

                  <TextArea row={4} cols={50} />
                </Form.Item>


                <div className="text-center lg:text-left mt-2 md:float-right">
                  <button
                    type="submit"
                    className="primary_btn inline-block px-7 py-3 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#FF5759] rounded-[50px] hover:shadow-lg focus:bg-[#FF5757] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FF5757] active:shadow-lg transition duration-150 ease-in-out"
                  >

                    Send
                  </button>

                </div>
                {showMsg && <p className='text-base mr-4 text-[#FF5757]'>Your response has been
                  successfully submitted,
                  Our team will get back to you soon</p>}
              </Form>
            </div>


          </div>
        </div>
      </div>

    </div>











  )
}

export default AboutUs