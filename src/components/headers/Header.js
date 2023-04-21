import React, { useEffect, useState } from 'react'
import { Dropdown, Input, Space } from 'antd'
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import Sourcify from '../../assests/Sourcify Logo.png'
import NEW_Sourcify from '../../assests/Sourcify.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Helper/LogooutHelper'

import { search_listing } from '../../services/listing';
import { search_vendor } from '../../services/Vendor';
import { search_contractor } from '../../services/contractor';
import { get_user_info } from '../../services/user';
import profile from '../../assests/profile.png'
import edit_icon from '../../assests/edit_icon.png'
import search_icon from '../../assests/search_icon.png'
import TopBar from './TopBar';
import { get_category } from '../../services/category';
import SubHeader from './Sub-Header';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [selected, setSelected] = useState("Vendor");
  const [input, setInput] = useState('')
  const [userName, setUserName] = useState('')
  const [category, setCategory] = useState([])
  const isAdmin = useSelector(state => state.User.user_role);
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === null || localStorage.getItem('isLoggedIn') == "false") {
      setisLoggedIn(false)
    } else {
      setisLoggedIn(localStorage.getItem('isLoggedIn'))
    }
  }, [localStorage.getItem('isLoggedIn')])
  useEffect(() => {
    dispatch(get_category()).then((res) => {
        // console.log(res)
        var data = []
        res.map((cats) => {
            data.push(cats.category)
        })
        setCategory(data)
    })
 
}, [])
  const [screenSize, getDimension] = useState(window.innerWidth);
  const setDimension = () => {
    getDimension(window.innerWidth)
  }
  useEffect(() => {
    if (localStorage.getItem('email') != null)
      dispatch(get_user_info({ user_id: localStorage.getItem('user_id') })).then((res) => {
        if (Object.keys(res).includes('contractor_id')) {
          console.log(res)
          setUserName(res.contractor_id.username)
        }
        if (Object.keys(res).includes('vendor_id')) {
          setUserName(res.vendor_id.contact_person)
        }
        if (userName == '') {
          setUserName(localStorage.getItem('email').split('@')[0])
        }
      })
  })
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    if (screenSize <= 759) {
      // setShowMenu(true)
      setShowMenu(false)
    } else {
      setShowMenu(true)
    }
  }, [screenSize])
  function logoutHandler() {
    setIsOpen(false)
    dispatch(logout()).then((res) => {
      localStorage.clear()
      localStorage.setItem("isLoggedIn", false)
      window.location = '/'
      // window.location = '/login'
      setisLoggedIn(false)
    })
  }
  const items = [
    {
      key: '1',
      label: (
        <Link rel="noopener noreferrer" to="/all_projects">
          Projects
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link rel="noopener noreferrer" to="/all_contractors">
          Contractors
        </Link>
      ),

    },
  ];


  function selectHandler(e) {
    setIsOpen(false)
    setSelected(e.target.value)

  }
  function inputHandler(e) {
    setIsOpen(false)
    setInput(e.target.value)
  }

  function submitHandler(e) {
    e.preventDefault()
    setIsOpen(false)
    if (selected === "Vendor") {
      dispatch(search_vendor(input)).then((res) => {
        setIsOpen(false)
        navigate('/results', { state: { selected, input, res } })
        // console.log(res)
      })
    }
    else if (selected === "Listing") {
      dispatch(search_listing(input)).then((res) => {
        setIsOpen(false)
        navigate('/results', { state: { selected, input, res } })
        // console.log(res)
      })

    }
    else {
      dispatch(search_contractor(input)).then((res) => {
        setIsOpen(false)
        navigate('/results', { state: { selected, input, res } })
        // console.log(res)
      })
    }
  }
  const handleSettings = () => {
    // Handle settings logic
    setIsOpen(false)
    navigate('/update-profile')
  };
  return (
    <>
      <TopBar />
      <div className='bg-white'>
        <div className='container py-2'>
          <header className=' grid grid-cols-2 md:grid-cols-12 '>

            <div className='md:col-span-2 grid place-items-center '>
              <div> <img className='  md-w-auto' onClick={() => navigate('/')} src={NEW_Sourcify} alt="logo" /></div>
            </div>

            <div className='absolute cursor-pointer text-2xl right-3 top-[3rem] md:hidden'><MenuOutlined onClick={() => { setShowMenu(!showMenu) }} /></div>

            {/* {isLoggedIn && showMenu && <><NavLink to={'/dashboard'} className='navbar__item mr-2' >
              Dashboard
            </NavLink>
              </>} */}

            {showMenu && <>
              <div className='col-span-4 md:flex justify-between items-center place-content-center'>
                
                  <NavLink className='header_text cursor-pointer' to={'/contractors'} >Find Contractors</NavLink>
                
               
                  <NavLink className='header_text cursor-pointer' to={'/project_list'}>Find Projects</NavLink>
                
               
                  <NavLink className='header_text cursor-pointer ' to={'/SourcifyWork'}>How it works</NavLink>
              </div>
              {showMenu && <>
                <div className='grid place-items-center col-span-3 mx-4 ' >
  
      <Input placeholder='Search for contractors or projects ' className='input_radius' suffix={<img src={search_icon}/>} />
 
    </div>
    </>
    }
              <div className='col-span-3  md:flex flex-start items-center place-items-center'>
                {isLoggedIn ?
                <>
                 <NavLink to="/messages" className="mr-2">Messages</NavLink>
                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex h-[70%]  justify-center items-center  w-full "
                      >
                        <img src={profile} />
                        {/* <span>{userName}</span> */}
                        <svg
                          className=" w-[10px] ml-2"
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

                    <Link className='flex items-center mr-3' to='/login'><span className='w-auto bold mr-1'><img src={edit_icon} /></span> <p className='header_text'>Sign up</p>  </Link>
                    <Link className='flex items-center mr-3' to='/register'><span className='w-auto bold mr-1'><img src={profile} /></span> <p className='header_text'> Login </p> </Link>

                  </>
                }
                <div className='prime_button min-w-[41%]  cursor-pointer'  onClick={()=>{navigate('/dashboard/listing-form')}}>
                  Post Project
                </div>
              </div>
            </>}
            {isOpen && (
              <div className="absolute z-10 top-[13%] right-[15%] w-40 mt-2 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {/* <button
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
                    Update Profile
                  </button> */}

                  {/* <button className='navbar__button hover:text-white rounded-[25px]' onClick={logoutHandler} type="link">Logout </button> */}
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
                    Logout
                  </button>


                </div>
              </div>
            )}

          </header>
         <SubHeader/>
        </div>
      </div>
    </>
  )
}

export default Header