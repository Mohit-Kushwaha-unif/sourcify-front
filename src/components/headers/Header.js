import React, { useEffect, useState } from 'react'
import { Dropdown, Space } from 'antd'
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import Sourcify from '../../assests/Sourcify Logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Helper/LogooutHelper'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
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
    window.addEventListener('resize', setDimension);
    if(screenSize<=759){
      setShowMenu(false)
    }else{
      setShowMenu(true)
    }
  }, [screenSize])
  function logoutHandler() {
    dispatch(logout()).then((res) => {
      localStorage.clear()
      localStorage.setItem("isLoggedIn", false)
      window.location = '/login'
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
  return (
    <header className=' flex justify-between flex-col items-center md:flex-row md:justify-between"'>
      <div className='navbar__title navbar__item flex items-center justify-between '>
        <img className='h-8 my-4 mx-4 ' onClick={() => navigate('/')} src={Sourcify} alt="logo" />
        <MenuOutlined  onClick={() => setShowMenu(!showMenu)} className='md:hidden flex-end absolute right-[21px] top-[37px] ' />
      </div>
     {showMenu&& <>
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

        </div>
        {isAdmin !== 2 && <>
          <div className='navbar__item'><Link to='/about-us'>Company</Link></div>
          <div className='navbar__item'><Link to='/services'>Work Areas</Link> </div>
          <div className='navbar__item'><Link to="/editor">Resources</Link> </div>
          <div className='navbar__item'>Support</div>
        </>}
        {isLoggedIn ?

          <>
            <div className='navbar__item'>
              <p>{localStorage.getItem('email') != null && localStorage.getItem('email').split('@')[0]}</p>
            </div>
            <div className='navbar__item'>
              <button className='navbar__button hover:text-white rounded-[25px]' onClick={logoutHandler} type="link">Logout </button>
            </div></>
          :
          <button className='navbar__button hover:text-white rounded-[25px]' type="link"><Link to='/login'>Login/Signup</Link> </button>
        }
      </>}
    </header>
  )
}

export default Header