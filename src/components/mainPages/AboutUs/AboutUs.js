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
import Swal from 'sweetalert2'

const AboutUs = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const [form] = Form.useForm()
  useDocumentTitle('About Us')
  const [showMsg, setShowMsg] = useState(false)
  const [about, setAbout] = useState(true)
  var [initialWord, setInitialWord] = useState()
  const [lastWord, setLastWord] = useState()
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
        // Swal.fire({
        //   icon: 'info',
        //   title: 'your response has been  <br/> successfully submitted',
        //   text: 'Our team will get back to you soon',

        // })
        // Swal.fire('your response has been successfully submitted', 'Our team will get back to you soon', 'info')
        form.resetFields()

      })
    )
  }
  const a = <div className='container d-none'>

    {/* Head Imagae */}
    <div className='head_image_title row'>
      {
        about !== true && about?.Banner.map((bann) => {
          // return <div className="relative row">
          //   {/* <img src={hero} className=" inset-0 object-cover w-full h-full max-h-[31rem]" />
          //   <div className="absolute inset-0 bg-gray-900 opacity-75"></div> */}
          //   {/* <img src={bann.image} className=" w-full h-[31rem] object-cover" /> */}
          //   <div class="col-12 about_head_content">
          //     <span>Sourcify</span>
          //     <h1></h1>
          //     <button>Get Started</button>
          //   </div>
          //   <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          //     <h1 className="flex justify-center text-2xl font-bold  text-[#FF5757]">
          //       {bann.title}</h1>
          //     <div className='flex mb-3 flex-col '>
          //       <p className="text-center text-white font-semibold capitalize text-[18px] md:text-[2.265rem]">
          //         {initialWord}
          //         <br className="md:hidden" />
          //         <span className="block text-center">{lastWord}</span>
          //       </p>
          //       {/* <div className=' text-white font-semibold capitalize text-[42px] '>{initialWord}</div>
          //       <p className='flex justify-center text-white font-semibold capitalize  text-[42px]'>{lastWord}</p> */}
          //     </div>
          //     <div className='flex justify-center'>
          //       <button className='text-white fixed font-semibold  bg-[#FF5757] rounded-[50px] px-[3.25rem] py-2 hover:bg-transparent hover:border-2 hover:broder-white' onClick={() => navigator('/register')}>{bann.button}</button>
          //     </div>
          //   </div>
          // </div>
          return <div class="col-12">
            <div class="background-image " style={{ backgroundImage: `url(${hero})` }}>
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <h1 className="flex justify-center text-2xl font-bold  text-[#FF5757]">
                  {bann.title}</h1>
                <div className='flex mb-3 flex-col '>
                  <p className="text-center text-white font-semibold capitalize text-[18px] md:text-[2.265rem]">
                    {initialWord}
                    <br className="md:hidden" />
                    <span className="block text-center">{lastWord}</span>
                  </p>
                  {/* <div className=' text-white font-semibold capitalize text-[42px] '>{initialWord}</div>
             <p className='flex justify-center text-white font-semibold capitalize  text-[42px]'>{lastWord}</p> */}
                </div>
                <div className='flex justify-center'>
                  <button className='text-white fixed font-semibold  bg-[#FF5757] rounded-[50px] px-[3.25rem] py-2 hover:bg-transparent hover:border-2 hover:broder-white' onClick={() => navigator('/register')}>{bann.button}</button>
                </div>
              </div>
            </div>
          </div>
        })
      }


    </div>
    {/*  */}
    {/* <div className='pt-16 px-16 grid grid-cols-1 md:grid-cols-5  gap-8  place-items-center'>
  {
    about !== true && about?.Hero.map((hero) => {
      return <>

        <div className=" order-2 md:order-1 md:col-span-2">
          <p className="text-base font-semibold">
            {hero.qutoe} <span className='text-red-400'>{hero.quto_emph}</span>
          </p>
          <p className="text-[2rem] font-semibold leading-8 ">
            {hero.title}
          </p>
          <div className="mt-8">
            <p
              className="text-[1.125rem] leading-6 font-normal mb-5">
              {hero.description}
            </p>
          </div>
          <div className=' '>
            <button
              onClick={() => navigator(hero.buttonLink)}
              className=" px-7 py-3 bg-[#FF5757] rounded-[10px] text-white font-medium text-sm  uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out "
            >
              {hero.button}


            </button>
          </div>
        </div>

        <div className="order-1 md:order-2   md:col-span-3 h-auto  radius-12">
          <img src={ban_img} className="h-auto w-full" alt="" />
        </div>
      </>
    })

  }


</div> */}
    <div className="px-3 pt-5 ">
      <div className="row align-items-center">
        {about !== true &&
          about?.Hero.map((hero) => (
            <>
              <div className="col-md-4 col-lg-8 col-xl-5 order-2 order-md-1">
                <p className="text-base font-weight-bold">
                  {hero.qutoe} <span className="text-danger">{hero.quto_emph}</span>
                </p>
                <p className="text-2xl font-weight-bold leading-8">
                  {hero.title}
                </p>
                <div className="mt-5">
                  <p className="text-lg font-weight-normal mb-5">
                    {hero.description}
                  </p>
                </div>
                <div className="">
                  <button
                    onClick={() => navigator(hero.buttonLink)}
                    className="btn btn-danger btn-lg text-uppercase shadow rounded-pill"
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

    <div className='pt-16 px-16 grid-cols-1 md:grid grid-cols-5'>
      {
        about !== true && about.founderAbout.map((founder) => {
          return <>
            <div className="  col-span-2  h-[24rem] radius-12" style={{ maxWidth: "100%" }}>
              <img src={Person} alt="Founder" className=" w-[90%] object-fill" style={{ maxHeight: "100%" }} />
            </div>

            <div className="col-span-3 mt-[3rem]">
              <p className="font-semibold text-base">
                <span className=' text-[#FF5757]'>{founder.qutoe}</span>
              </p>
              <p className=" text-[2rem] font-semibold leading-8 ">
                <span className=''>{founder.title}</span>
              </p>
              <div className="mt-8">
                <p
                  className="text-[1.125rem] leading-6 font-normal mb-5">
                  {founder.description}
                </p> </div>

            </div>


          </>
        })
      }

    </div>
    <div className='pt-16 px-16 grid grid-cols-1  md:grid-cols-3 mb-3  pt-10'>


      <div className="col-span-1  md:w-[100%] radius-12  ">
        <img src={about !== true && build} alt="" className='w-[90%] h-full object-fill md:object-cover' />
      </div>
      <div className=" h-auto w-full   ">
        <p className='col-span-2 font-bold mb-2 text-[2rem]'>Get in touch</p>
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
            <Form.Item name='mobile_number' className='mb-1 mt-0' label="Mobile Number" rules={[
              {
                required: true,
                message: 'Please enter your Mobile Number'
              },
            ]}
            >

              <Input placeholder='Enter your 10 digit Mobile Number' />
            </Form.Item>
          </div>
          <div className='grid  mb-3 grid-cols-1 gap-8 md:grid-cols-2'>
            <Form.Item name='email' className='mb-1 mt-0' label="Email ID" rules={[
              {
                required: true,
                message: 'Please enter your Email ID'
              },
            ]}
            >

              <Input type='email' placeholder='Enter your Email' />
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

            <TextArea placeholder='Enter your message' row={4} cols={50} />
          </Form.Item>


          <div className="text-center lg:text-left mt-2 md:float-right">
            <button
              type="submit"
              className="inline-block  px-7 py-3 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
            >

              Send
            </button>
            {showMsg && <p>your response has been
              successfully submitted
              Our team will get back to you soon </p>}
          </div>
        </Form>
      </div>


    </div>

  </div>
  return (
    // <div className=" overflow:hidden">
    //   {
    //     about !== true && about?.Banner.map((bann) => {
    //       return <div className="relative row hero-section">

    //         <img src={hero} className="hero-section inset-0 object-cover w-full h-full " />
    //         <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
    //         {/* <img src={bann.image} className=" w-full h-[31rem] object-cover" /> */}
    //         <div class="col-12 hero-abt-sourcify">
    //           <span>Sourcify</span>
    //           <h1 className="hero-abt-title mb-2">Where sub-contracting meets <br />innovation</h1>
    //           <button className='text-white  font-semibold  bg-[#FF5757] rounded-[50px] px-[3.25rem] py-2 hover:bg-transparent hover:border-2 hover:broder-white' onClick={() => navigator('/register')}>Get Started</button>

    //         </div>
    //         <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
    //           <h1 className="flex justify-center text-2xl font-bold  text-[#FF5757]">
    //             {bann.title}</h1>
    //           <div className='flex mb-3 flex-col '>
    //             <p className="text-center text-white font-semibold capitalize text-[18px] md:text-[2.265rem]">
    //               {initialWord}
    //               <br className="md:hidden" />
    //               <span className="block text-center">{lastWord}</span>
    //             </p>
    //             {/* <div className=' text-white font-semibold capitalize text-[42px] '>{initialWord}</div>
    //             <p className='flex justify-center text-white font-semibold capitalize  text-[42px]'>{lastWord}</p> */}
    //           </div>
    //           <div className='flex justify-center'>
    //             <button className='text-white fixed font-semibold  bg-[#FF5757] rounded-[50px] px-[3.25rem] py-2 hover:bg-transparent hover:border-2 hover:broder-white' onClick={() => navigator('/register')}>{bann.button}</button>
    //           </div>
    //         </div>
    //       </div>

    //     })
    //   }
    //   <div className="row hero-section order-md-1" style={{ backgroundImage: `url(${hero})` }}>
    //     <div className="col-md-12 my-auto mx-auto text-center">
    //       <div className="hero-abt-sourcify mb-1">Sourcify</div>
    //       <h1 className="hero-abt-title mb-2">Where sub-contracting meets <br />innovation</h1>
    //       <button className='text-white  font-semibold  bg-[#FF5757] rounded-[50px] px-[3.25rem] py-2 hover:bg-transparent hover:border-2 hover:broder-white' onClick={() => navigator('/register')}>Get Started</button>
    //     </div>
    //   </div>
    //   <div className="row align-items-center">
    //     {about !== true &&
    //       about?.Hero.map((hero) => (
    //         <>
    //           <div className="col-md-4 col-lg-8 col-xl-5 order-2 order-md-1">
    //             <p className="what_we_do_quote text-base font-weight-bold">
    //               {hero.qutoe} <span className="text-danger">{hero.quto_emph}</span>
    //             </p>
    //             <p className="what_We_do_title font-weight-bold ">
    //               {hero.title}
    //             </p>
    //             <div className="pt-3">
    //               <p className="text-lg font-weight-normal mb-3">
    //                 {hero.description}
    //               </p>
    //             </div>
    //             <div className="">
    //               <button
    //                 onClick={() => navigator('/register')}
    //                 className="btn btn-danger bg-[#FF5757] btn-lg text-uppercase shadow rounded-pill"
    //               >
    //                 {hero.button}
    //               </button>
    //             </div>
    //           </div>
    //           <div className="col-md-6 col-lg-10 col-xl-7 order-1 order-md-2">
    //             <img src={ban_img} className="img-fluid rounded" alt="" />
    //           </div>
    //         </>
    //       ))}
    //   </div>
    //   <div className="row align-items-center pt-5 founder_about_image">
    //     {about !== true && about.founderAbout.map((founder) => (
    //       <>
    //         <div className="col-md-2 col-lg-2 col-xl-5 ">
    //           <img src={Person} className="img-responsive md:w-[75%] rounded" alt="" />
    //         </div>
    //         <div className="col-md-9 col-lg-10 col-xl-7 pt-3  ">
    //           <p className="font-semibold text-base">
    //             <span className=' text-red-400 '>{founder.qutoe}</span>
    //           </p>
    //           <p className=" text-[2rem] font-semibold leading-8 ">
    //             <span className=''>{founder.title}</span>
    //           </p>
    //           <div className="mt-8">
    //             <p
    //               className="text-[1.125rem] leading-6 font-normal mb-5">
    //               {founder.description}
    //             </p>
    //           </div>
    //         </div>

    //       </>
    //     ))}
    //   </div>
    //   <div className="row align-items-center  founder_about_image">
    //     {about !== true && about.founderAbout.map((founder) => (
    //       <>
    //         <div className="col-md-2 col-lg-2 col-xl-5 ">
    //           <img src={about !== true && build} alt="" className='md:w-[90%] h-full object-fill md:object-cover' />

    //         </div>
    //         <div className="col-md-9 col-lg-10 col-xl-7 pt-5  ">
    //           <p className='col-span-2 font-bold mb-2 text-[2rem]'>Get in touch</p>
    //           <Form labelAlign="left"
    //             form={form}
    //             onFinish={feedBackHandler}
    //             layout="vertical" >
    //             <div className='grid mb-3 grid-cols-1 gap-8 md:grid-cols-2'>
    //               <Form.Item name="fullname" label="Full Name " rules={[
    //                 {
    //                   required: true,
    //                   message: 'Please enter your Full Name'
    //                 },
    //               ]}
    //                 className="mb-1"
    //               >

    //                 <Input placeholder='Enter your Full Name' />
    //               </Form.Item>
    //               <Form.Item name='company_name' className='mb-1 mt-0' label="Company Name" rules={[
    //                 {
    //                   required: true,
    //                   message: 'Please enter your Company Name'
    //                 },
    //               ]}
    //               >

    //                 <Input placeholder='Enter your Company Name' />
    //               </Form.Item>
    //             </div>
    //             <div className='grid  mb-3 grid-cols-1 gap-8 md:grid-cols-2'>
    //               <Form.Item name='mobile_number' className='mb-1 mt-0' label="Mobile Number" rules={[
    //                 {
    //                   required: true,
    //                   message: 'Please enter your Mobile Number'
    //                 },
    //               ]}
    //               >

    //                 <Input placeholder='Enter your 10 digit Mobile Number' />
    //               </Form.Item>
    //               <Form.Item name='email' className='mb-1 mt-0' label="Email ID" rules={[
    //                 {
    //                   required: true,
    //                   message: 'Please enter your Email ID'
    //                 },
    //               ]}
    //               >

    //                 <Input type='email' placeholder='Enter your Email' />
    //               </Form.Item>


    //             </div>
    //             <Form.Item name='Message' className='mb-1 mt-0' label="Message" rules={[
    //               {
    //                 required: true,
    //                 message: 'Please enter your Message'
    //               },
    //             ]}
    //             >

    //               <TextArea row={4} cols={50} />
    //             </Form.Item>


    //             <div className="text-center lg:text-left mt-2 md:float-right">
    //               <button
    //                 type="submit"
    //                 className="inline-block  px-7 py-3 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
    //               >

    //                 Send
    //               </button>
    //             </div>
    //           </Form>
    //         </div>

    //       </>
    //     ))}
    //   </div>
    // </div>
    <div className='container mx-auto  ' >
      <div className='relative h-[500px]'      >
        <img src={hero} className=" inset-0 object-cover w-full h-full " />
        <div className="absolute inset-0 bg-[#000000] opacity-75"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="hero-abt-sourcify text-center text-base md:hero-abt-sourcify mb-1">Sourcify</div>
          <h1 className=" hero-abt-title text-center mb-2">Where sub-contracting meets <br />innovation</h1>
          <div className='flex justify-center'>
            <button className='text-white  font-semibold  bg-[#FF5757] rounded-[50px] px-[2.25rem] hover:bg-[#e64d4d] md:px-[3.25rem] py-2 ' onClick={() => navigator('/register')}>Get Started</button>
          </div>
        </div>
      </div>
      <div className='px-4'>
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
                        onClick={() => navigator(hero.buttonLink)}
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
                  <img src={Person} className="mt-[1.5rem] h-[90%] w-full md:w-[75%] rounded md:mt-0" alt="" />
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
        <div className='feedback_form'>
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