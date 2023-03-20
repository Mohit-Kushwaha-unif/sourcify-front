import React, { useEffect, useState } from 'react'
import { Dropdown, Input, Space } from 'antd'
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import Sourcify from '../../assests/Sourcify Logo.png'
import NEW_Sourcify from '../../assests/Sourcify.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Helper/LogooutHelper'
import { search_listing } from '../../services/listing';
import { search_vendor } from '../../services/Vendor';
import { search_contractor } from '../../services/contractor';
import { get_user_info } from '../../services/user';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [selected, setSelected] = useState("Vendor");
  const [input, setInput] = useState('')
  const [userName, setUserName] = useState('')
  const isAdmin = useSelector(state => state.User.user_role);
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === null || localStorage.getItem('isLoggedIn') == "false") {
      setisLoggedIn(false)
    } else {
      setisLoggedIn(localStorage.getItem('isLoggedIn'))
    }
  }, [localStorage.getItem('isLoggedIn')])

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
    <div className='container'>
    <header className='navbar flex justify-between flex-col items-center md:flex-row md:justify-between'>
      <div className='navbar__title navbar__item flex items-center justify-between '>
        <div> <img className='w-[70%] mt-1 md-w-auto' onClick={() => navigate('/')} src={NEW_Sourcify} alt="logo" /></div>
        <div className='md:hidden flex-end absolute right-[10px] top-[30px] '>
        <span><MenuOutlined onClick={() => setShowMenu(!showMenu)}  /></span>
        </div>
      </div>
      {showMenu && <>
        {/* <div className='navbar__item flex-row'>
          <form className="flex" onSubmit={submitHandler} >
            <Input type="text" className="w-full pl-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" value={input} onChange={inputHandler} placeholder="Search..." />
            <select value={selected} className="ml-1 px-1 py-1 rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" onChange={selectHandler}>
              <option value="Vendor">Vendor</option>
              <option value="Listing">Listing</option>
              <option value="Contractor">Contractor</option>
            </select>
          </form>
        </div>
        <div className='navbar__item'>
          <Dropdown
            menu={{
              items,
            }}
          >
            <Link onClick={(e) => e.preventDefault()}>
              <Space className='text-base font-sans	font-normal'>
                Find Work
              </Space>
            </Link>
          </Dropdown>

        </div> */}

        {/* {isAdmin !== 2 && <>
          <div className='navbar__item'><Link to='/about-us'>Company</Link></div>
          <div className='navbar__item'><Link to="/editor">Resources</Link> </div>
          <div className='navbar__item'><Link to="/support">Support</Link></div>
        </>} */}
        {isLoggedIn ?

          <>
            {/* <div className='navbar__item'>
              Dashboard
            </div> */}
            <div className='navbar__item relative'>
              <button
                onClick={() => setIsOpen(!isOpen)}

                className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              >
                <span>{userName}</span>
                <svg
                  className="w-5 h-5 ml-2"
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

            </div>

          </>
          :
          <button className='navbar__button hover:text-white rounded-[25px]' type="link"><Link to='/register'>Login/Signup</Link> </button>
        }
      </>}
      {isOpen && (
        <div className="absolute z-10 top-16 right-0 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
    </div>
  )
}

export default Header