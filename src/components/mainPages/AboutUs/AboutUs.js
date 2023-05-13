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

const AboutUs = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const [form] = Form.useForm()
  useDocumentTitle('About Us')
  const [showMsg, setShowMsg] = useState(false)
  const [about, setAbout] = useState(true)
  var [initialWord, setInitialWord] = useState()
  const [lastWord, setLastWord] = useState()
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

  return (

    <div className=' mx-auto  ' >
        <div className='relative h-[500px]'      >
        <img src={hero} className=" inset-0 object-cover w-full h-full " />
        <div className="absolute  inset-0 bg-[#000000] opacity-75"></div>
        <div className=" md:ml-0 absolute top-[17%] md:left-[25%]  md:right-[25%]  ">
          <div className="hero-abt-sourcify text-center text-base md:hero-abt-sourcify mb-5  ">Sourcify</div>
          <div className="white_h3 ml-1 font_42 sm:text-base text-center mb-16 line130">
            Where sub-contracting meets innovation
          </div>
        </div>
        <div className='absolute bottom-[30%] md:bottom-[30%]  md:left-[20%] font_14  md:right-[20%] '>
          <div className='white_p md:font_16 sm:text-base text-center line130'>Sourcify is a technology-driven sourcing platform that brings businesses and contractors together to streamline the sourcing and supply chain management process. Our mission is to provide a reliable and efficient sourcing solution for businesses of all sizes, while also providing opportunities for contractors to showcase their skills and grow their businesses.</div>
        </div>

      </div>



      <div className='container '>
        <div className='who_we_are'>
          <div className="  grid grid-cols-1 md:gap-x-6 md:grid-cols-2 pt-5">
            {about !== true &&
              about?.Hero.map((hero) => (
                <>

                  <div className="col-md-6 col-lg-10 col-xl-7 order-1 order-md-2 flex items-center">
                    <img src={ban_img} className="img-fluid rounded" alt="" />
                  </div>
                  <div className=" mt-[4rem] order-2 md:order-1 ">
                    <p className="text-base font-bold">
                      {hero.qutoe} <span className="text-[#FF5757]">{hero.quto_emph}</span>
                    </p>
                    <p className="prime_h2 leading-8">
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
                        className="prime_button_sec btn-lg text-uppercase shadow rounded-pill"
                      >
                        {hero.button}
                      </button>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className='founder mt-10 '>
          <div className='grid grid-cols-1 md:gap-x-6  md:grid-cols-3 pt-10'>

            {about !== true && about.founderAbout.map((founder) => (
              <>

                <div className="   md:my-auto order-2 md:col-span-2 md:order-1 pr-5">
                  <p className="font-semibold text-base">
                    <span className=' text-[red] '>{founder.qutoe}</span>
                  </p>
                  <p className=" text-[2rem] font-semibold leading-8 ">
                    <span className=''>{founder.title}</span>
                  </p>
                  <div className="mt-8">
                    <p
                      className="text-[1.125rem] leading-6 font-normal mb-5">
                      <p className='mb-5'> We are delighted to introduce you to Sourcify, a platform that was born out of our passion for making sub-contracting process easy and tranparent for everyone involved. After working in procurement and contracting for 2 decades, we realized that there is significant gap in the market when it came to connecting buyers with Contractors/Sub-Contractors.</p>

                      <p className='mb-5'>   Both parties often face challenges when it came to finding new opportunities and projects. We have tried to create the solution that can address this issue. This is only the first step. At Sourcify, we're committed to innovation, integrity, and providing an outstanding experience for our users.</p>

                      <p className='mb-5'>   We believe that by simplifying the sub-contracting process, we can help businesses and contractors achieve their goals, and in turn, contribute to the growth and success of the industry as a whole.We will strive to solve more issues in coming time</p>
                      </p>
                  </div>
                </div>
                <div className="order-1 md:order-2  ">
                  <img src={Owner} className="mt-[1.5rem] h-[90%] w-full  rounded md:mt-0" alt="" />
                </div>
              </>
            ))}

          </div>
        </div>

      </div>

    </div>











  )
}

export default AboutUs