import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_content } from '../../../services/content'
import useDocumentTitle from '../../Helper/useDocumentTitle'
import ban_img from '../../../assests/3227422.jpg'
import heros from '../../../assests/About us Hero Banner.jpg'
import Person from '../../../assests/person.jpg'
import { Form, Input, Select } from 'antd'
import build from '../../../assests/build.jpg'
import TextArea from 'antd/es/input/TextArea'
import { add_feedback } from '../../../services/FeedBack'
import { useForm } from 'antd/es/form/Form'
import { get_about } from '../../../services/About'
import { useNavigate } from 'react-router-dom'

const AboutUs = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const [form] = Form.useForm()
  useDocumentTitle('About Us')
  const [about, setAbout] = useState(true)
  var [initialWord,setInitialWord] = useState()
  const [lastWord,setLastWord] = useState()
  // dispatch(get_content()).then((res) => {
  //   res.map((content) => {
  //     if (content.section_type === "About Us") {
  //       setAbout(content.description)
  //     }
  //   })
  // }).catch((err) => { console.log(err) })
  useEffect(() => {
    dispatch(get_about()).then((res) => {
      setAbout(res[0])
  
      var str = res[0].Banner[0].sub_title;
      var lastIndex = str.lastIndexOf(" ");
      var strlen =   str.length
      var str1 = str.slice(lastIndex,strlen);
      setLastWord(str1)
      var string = str.substring(0, lastIndex);
      setInitialWord(string)
    })
  }, [])
  
  function feedBackHandler(value) {
    (
      dispatch(add_feedback(value)).then((res) => {
        form.resetFields()
        window.scrollTo(0, 0)
      })
    )
  }

  return (
    <>
      <div className='bg-white'>
        <body>
          {
            about!==true && about?.Banner.map((bann) => {
              return <div class="relative">
                <img src={heros} className="h-[32rem] w-full" />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <h1 class="flex justify-center mb-3 text-5xl font-bold  text-[#FF5757]">
                    {bann.title}</h1>
                  <div className='flex mb-3 flex-col '>

                    <div className=' text-white font-semibold capitalize mb-3 text-4xl '>{initialWord}</div>
                    <p className='flex justify-center text-white font-semibold capitalize mb-3 text-4xl'>{lastWord}</p>
                  </div>
                  <div className='flex justify-center'>
                    <button className='text-white fixed font-semibold bg-[#FF5757] rounded-[50px] px-3 py-2 hover:bg-transparent hover:border-2 hover:broder-white' onClick={() => navigator(bann.buttonLink)}>{bann.button}</button>
                  </div>
                </div>
              </div>
            })
          }

        </body>
        <div className='bg-white '>

          <section id="hero h-auto">
          { 
            about!==true && about?.Hero.map((hero)=>{
            return <div class="container flex flex-col-reverse bg-white item-center p-6 mx-auto mt-10 space-y-0 md:flex-row">

            <div class="flex flex-col mb-2 h-auto  md:w-1/2">
              <p class="max-w-md text-4xl text-base font-bold ml-5 text-center md:text-base md:text-left">
                {hero.qutoe} <span className='text-red-400'>{hero.quto_emph}</span>
              </p>
              <p class="max-w-sm text-center ml-1  md:text-4xl text-left">
                {hero.title}
              </p>
              <div class="flex justify-center md:justify-start">
                <p
                  class="p-3 px-6 pt-2  bg-brightRed rounded-full baseline hover:bg-brightRedLight">
                    {hero.description}
                     </p>
              </div>
              <div className=' flex justify-center '>
                <button
                onClick={() => navigator(hero.buttonLink)}
                  className="w-1/2 px-7 py-3 bg-[#FF5757] rounded-[50px] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                 {hero.button}


                </button>
              </div>
            </div>

            <div class="md:w-1/2 radius-12">
              <img src={ban_img} alt="" />
            </div>
          </div>
          })

          }
            
          </section>
          <section id="hero">
            {
              about!==true && about.founderAbout.map((founder)=>{
                return <div class=" flex flex-col bg-white item-center p-6 mx-auto mt-10 space-y-0 md:flex-row">
                <div class="flex align-stretch justify-center md: max-h-80  overflow-hidden radius-12 ">
                  <img src={Person} alt="" className=" w-full" />
                  
                </div>
                <div class="flex flex-col md:max-h-10">
                  <p class="max-w-md text-4xl text-base font-bold ml-5 text-center md:text-base md:text-left">
                    <span className='text-red-400'>{founder.qutoe}</span>
                  </p>
                  <p class="max-w-sm  ml-5  md:text-4xl text-left">
                    {founder.title}
                  </p>
                  <div class="flex justify-center md:justify-start">
                    <p
                      class="p-3 px-6 pt-2  bg-brightRed rounded-full baseline hover:bg-brightRedLight">
                        {founder.description}
                          </p> </div>
  
                </div>
  
  
              </div>
              })
            }
            
          </section>
        </div>
        <section id="hero h-auto">

          <div class="flex flex-col bg-white item-center p-6 mx-auto  space-y-0 md:flex-row">
            <div class="md:w-[96%] radius-12 ">
              <img src={ about!==true &&build} alt="" className='w-[85%] h-full' />
            </div>
            <div class="flex flex-col mb-2 h-auto  md:w-full">
              <p className='font-semibold mb-2'>Get in touch</p>
              <Form labelAlign="left"
                form={form}
                onFinish={feedBackHandler}
                layout="vertical" >
                <Form.Item name="fullname" label="Full Name " rules={[
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
                <Form.Item name='email' className='mb-1 mt-0' label="Email ID" rules={[
                  {
                    required: true,
                    message: 'Please input your Email ID'
                  },
                ]}
                >

                  <Input type='email' placeholder='Enter your Email' />
                </Form.Item>
                <Form.Item name='Message' className='mb-1 mt-0' label="Message" rules={[
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

                    Send
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