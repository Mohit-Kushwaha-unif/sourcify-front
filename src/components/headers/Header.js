import React, { useEffect, useState } from 'react'
import { Input, Tag } from 'antd'
import { MenuOutlined } from '@ant-design/icons';

import NEW_Sourcify from '../../assests/Sourcify.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Helper/LogooutHelper'

import { TiMessages } from 'react-icons/ti'
import { RxCross2 } from 'react-icons/rx'
import { get_Vendor_by_id } from '../../services/Vendor';
import { get_contractorBy_id } from '../../services/contractor';
import { get_user_info } from '../../services/user';
import profile from '../../assests/profile.png'
import edit_icon from '../../assests/edit_icon.png'
import search_icon from '../../assests/search_icon.png'
import TopBar from './TopBar';
import SubHeader from './Sub-Header';
import { toast, ToastContainer } from 'react-toastify'
import { acc_status } from '../../store/actions/user';
import { search_db } from '../../services/DB';

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [selected, setSelected] = useState("Vendor");
  const [input, setInput] = useState('')
  const [userName, setUserName] = useState('')
  const [accountStatus, setAccountStatus] = useState()
  const [showStatus, setShowStatus] = useState(false)
  const [isLocal, setIsLocal] = useState(false)
  const [mobilView, setMobileView] = useState(false)
  const isAdmin = useSelector(state => state.User.user_role);
  const [language, setLanguage] = useState(); // Default language is English
  const location = useLocation()
  useEffect(() => {
    if (localStorage.getItem('lan') === "hi") {
      setIsLocal(true)
    }
    if (localStorage.getItem('isLoggedIn') === null || localStorage.getItem('isLoggedIn') == "false") {
      setisLoggedIn(false)
    } else {
      setisLoggedIn(localStorage.getItem('isLoggedIn'))
    }
  }, [localStorage.getItem('isLoggedIn')])
  useEffect(() => {
    setLanguage(localStorage.getItem("lan"))
  }, [localStorage])
  const [screenSize, getDimension] = useState(window.innerWidth);
  const setDimension = () => {
    getDimension(window.innerWidth)
  }

  useEffect(() => {
    if (localStorage.getItem('email') != null)
      dispatch(get_user_info({ user_id: localStorage.getItem('user_id') })).then((res) => {
        if (Object.keys(res).includes('contractor_id')) {
          dispatch(get_contractorBy_id(res.contractor_id._id)).then((res) => {
            dispatch(acc_status(res.status))
            setAccountStatus(res.status)
            localStorage.setItem('status', res.status)
          })
          setShowStatus(true)
          setUserName(res.contractor_id.username)
        }
        if (Object.keys(res).includes('vendor_id')) {
          setShowStatus(true)
          dispatch(get_Vendor_by_id(res.vendor_id._id)).then((res) => {
            dispatch(acc_status(res.status))
            setAccountStatus(res.status)
            localStorage.setItem('status', res.status)
          })
          setUserName(res.vendor_id.contact_person)
        }
        if (userName == '') {
          setUserName(localStorage.getItem('email').split('@')[0])
          localStorage.setItem('status', res.status)
        }
      })

  })
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    if (screenSize <= 759) {
      // setShowMenu(true)
      setMobileView(true)
      setShowMenu(false)
    } else {
      setMobileView(false)
      setShowMenu(true)
    }
  }, [screenSize])
  function logoutHandler() {
    setIsOpen(false)
    if (mobilView) {
      clossAll()
    }
    //  setShowMenu(false) 
    localStorage.clear();
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("lan", "hi");
    localStorage.setItem("isModal", false);
    dispatch(logout()).then((res) => {
      setisLoggedIn(false);
      window.location = '/';
    });
  }
  // const handleLanguageChange = (event) => {
  //   setLanguage(event.target.value);
  //   localStorage.setItem("lan", event.target.value)
  //   window.location = location.pathname
  // };



  function inputHandler(e) {
    setIsOpen(false)
    setInput(e.target.value)
  }

  function submitHandler(e) {
    e.preventDefault()
    setIsOpen(false)
    clossAll()
    dispatch(search_db(input)).then((res) => {
      setIsOpen(false)
      navigate('/results/' + input, { state: { selected, input, res } })

    })
  }
  const handleSettings = () => {
    // Handle settings logic
    if (mobilView) {
      clossAll()
    }
    setIsOpen(false)
    navigate('/update-profile')
  };
  const dashboard = () => {
    setIsOpen(false)
    if (mobilView) {
      clossAll()
    }
    navigate('/dashboard')
  }
  const handleMenus = () => {
    setShowMenu(!showMenu);
    setIsOpen(false)
  }
  function clossAll() {
    setIsOpen(false)
    setShowMenu(false)
  }
  function navigateHandler() {
    if (mobilView) {
      clossAll()
    }
    if (localStorage.getItem("isLoggedIn") == null || localStorage.getItem("isLoggedIn") == "false") {
      navigate('/login')
    }

    else if (accountStatus !== 0) {
      toast.error('Account is  not approved by admin', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
    else { navigate('/dashboard/listing-form') }

  }
  return (
    <>
      {
        isAdmin != 2 &&
        <>
          <ToastContainer />
          <TopBar />
          <div className='bg-white'>
            <div className='container py-2'>
              <header className={`${showMenu && mobilView ? 'container white fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] translate-x-0 dark:bg-zinc-800' : ''} md:h-auto md:grid  md:place-items-center  md:mb-0 md:grid-cols-9`}>

                <div className={`${mobilView && !showMenu ? "grid grid-cols-7" : ''}`}>
                  <div className='col-span-2 md:col-span-1 mr-3 md:mr-0 '>
                    <div> <img className='  md-w-auto' onClick={() => navigate('/')} src={NEW_Sourcify} alt="logo" /></div>
                  </div>
                  {
                    mobilView && showMenu && <><div className='mt-3 h-5  flex  items-center header_text '>

                    </div>
                      {showMenu && <>
                        <div className='grid  col-span-7  md:col-span-2 w-full  md:mb-0 mb-5 mt-5 md:mt-0 ' >
                          <form onSubmit={submitHandler} className="w-full">
                            <Input onChange={inputHandler} placeholder='Search for contractors or projects ' className='input_radius w-full' suffix={<img onClick={submitHandler} src={search_icon} />} />
                          </form>
                        </div>
                      </>
                      }
                    </>
                  }
                  {mobilView && !showMenu && <>
                    {isLoggedIn ?
                      <>
                        <div className={`col-span-3 md:hidden ${mobilView && showMenu ? 'mx-0 order-3 justify-start' : 'justify-end'} flex   my-2 mr-3`}>
                          <span className='mr-2 mt-1'><TiMessages /></span>  <NavLink to="/messages" className=" h-5  flex  items-center header_text"><p className='header_text' data-translate="hi">Messages</p></NavLink>
                        </div>
                        <div
                          onClick={() => setIsOpen(!isOpen)}
                          className={` inline-flex md:hidden justify-start col-span-1 h-[70%] my-1 mr-8 md:justify-center items-center  w-full `}
                        >
                          <img src={profile} />
                          <svg
                            className=" w-[10px]   mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>

                      </>
                      : <div className={` ${mobilView && showMenu ? "ml-0 my-3 gap-y-1 mb-2" : "place-items-end gap-0"} md:hidden grid grid-cols-4 col-span-4 `} >

                        <Link onClick={() => { setShowMenu(false) }} className={`flex   ${mobilView && showMenu ? "col-span-4 mb-2 " : '  col-span-2  my-3 '}  `} to='/register'><span className='w-auto items-center  bold mr-1'><img src={edit_icon} /></span> {isLocal ? <p className='header_text' translate='no'>रजिस्टर</p> : <p className='header_text' data-custom-translate="hi">Register</p>}  </Link>
                        <Link onClick={() => { setShowMenu(false) }} className={`flex   ${mobilView && showMenu ? "col-span-4 " : ' col-span-2 my-3 mr-3 '} `} to='/login'><span className='w-auto  items-center bold mr-1'><img src={profile} /></span> <p className='header_text' data-translate="hi"> Login </p> </Link>
                      </div>}
                  </>}
                </div>
                {!showMenu ?
                  <div className='absolute col-span-1 cursor-pointer text-2xl right-3 top-[2rem] md:hidden'><MenuOutlined onClick={() => { handleMenus() }} /></div>
                  :
                  <div className='absolute col-span-1 cursor-pointer text-2xl right-3 top-[2rem] md:hidden'>< RxCross2 onClick={() => { handleMenus() }} /></div>

                }
                {showMenu && <>
                  <div className='md:col-span-3 col-span-7 md:grid grid-cols-1 md:grid-cols-3  md:items-center '>

                    <NavLink onClick={() => { mobilView && clossAll() }} className='header_text flex md:justify-center cursor-pointer md:mb-0 mb-5 mt-5 md:mt-0 md:ml-2' to={'/contractors'} data-translate="hi" >Find Contractors</NavLink>


                    <NavLink className='header_text flex md:justify-center cursor-pointer  md:mb-0 mb-5 mt-5 md:mt-0 ' onClick={() => { mobilView && clossAll() }} to={'/project_list'} data-translate="hi">Find Projects</NavLink>

                    <NavLink onClick={() => { mobilView && clossAll() }} className='header_text flex md:justify-center cursor-pointer  md:mb-0 mb-5 mt-5 md:mt-0 ' to={'/SourcifyWork'} data-translate="hi">How it works</NavLink>



                  </div>
                  {showMenu && <>
                    <div className='grid  col-span-7  hidden md:inline-block md:col-span-2 w-full  md:mb-0 mb-5 mt-5 md:mt-0 ' >
                      <form onSubmit={submitHandler} className="w-full">
                        <Input onChange={inputHandler} placeholder='Search for contractors or projects ' className='input_radius w-full' suffix={<img onClick={submitHandler} src={search_icon} />} />
                      </form>
                    </div>
                  </>
                  }
                  <div className='md:col-span-3 col-span-7  md:grid grid-cols-1 md:grid-cols-3 flex-start justify-between items-center place-items-center'>
                    {isLoggedIn ?
                      <>

                        <NavLink onClick={() => { mobilView && clossAll() }} to="/messages" className="hidden  md:flex items-baseline mr-3 header_text">
                          <span className='mr-2'><TiMessages /></span>
                          <p className='header_text' data-translate="hi">Messages</p>
                        </NavLink>

                        <button
                          onClick={() => setIsOpen(!isOpen)}
                          className="hidden md:flex items-center justify-center w-full"
                        >
                          <img src={profile} />
                          <svg
                            className=" w-[10px] "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>


                      </>
                      :
                      <>
                        <div className='flex items-center mr-3 hidden md:inline-block' to='/register'>
                          <span className='flex items-center'>
                            <img src={edit_icon} className='mr-1' />
                            {isLocal ? <NavLink onClick={() => { mobilView && clossAll() }} to='/register' className='header_text' >रजिस्टर</NavLink>
                              : <NavLink onClick={() => { mobilView && clossAll() }} to='/register' className='header_text' data-custom-translate="hi">Register</NavLink>
                            }</span>
                        </div>

                        <div className='flex items-center mr-3 hidden md:inline-block' >
                          <span className='flex items-center'>
                            <img src={profile} className='mr-1' />
                            <NavLink onClick={() => { mobilView && setShowMenu(false) }} to='/login' className='header_text' data-translate="hi">Login</NavLink>
                          </span>
                        </div>

                      </>
                    }
                    <div className='w-full'>
                      <div className='prime_button md:min-w-[41%]  cursor-pointer' onClick={() => {
                        navigateHandler()

                      }} data-translate="hi">
                        Post Project
                      </div>
                      {
                        mobilView && <div onClick={clossAll}> <SubHeader /> </div>
                      }
                    </div>
                  </div>
                </>}
                {isOpen && (
                  <div className="absolute z-[999] top-[10%] md:top-[88px] w-[210px]  left-[34%]  md:left-[66%] bg-[white]  w-60 mt-2 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style={{ overflowWrap: 'break-word' }}>
                    <div className="py-1" style={{ overflowWrap: 'break-word' }}>
                      {showStatus && <div className={`px-4 py-2`}>
                        <span className='cursor-pointer' onClick={() => { accountStatus === 0 && navigate('/dashboard') }}>{`${showMenu && mobilView ? 'Status' : "Account status -"} `} </span>
                        <span>{accountStatus === 0 ? <Tag color="green">Live</Tag> : accountStatus === 1 ? <Tag color="yellow">Under Review</Tag> : <Tag color="volcano">Blocked</Tag>}</span>
                      </div>}
                      <div className='px-4 py-2' onClick={() => { dashboard() }}>Dashboard</div>
                      <button
                        onClick={handleSettings}
                        className="block px-4 py-2 text-sm w-full text-left"
                      >
                        <svg
                          className="w-4 h-4 mr-2 inline"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        <span data-translate="hi">Update Profile</span>

                      </button>

                      <button
                        onClick={logoutHandler}
                        className="block px-4 py-2 text-sm w-full text-left"
                      >
                        <svg
                          className="w-4 h-4 mr-2 inline"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                        <span data-translate="hi">Logout</span>

                      </button>


                    </div>

                  </div>

                )}

              </header>
              {
                !mobilView &&
                <SubHeader />}
            </div>
          </div>
        </>
      }

    </>
  )
}

export default Header