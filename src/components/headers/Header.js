import React from 'react'
import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import Sourcify from '../../assests/Sourcify Logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Helper/LogooutHelper'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAdmin = useSelector(state => state.User.user_role);
  var isLoggedIn = true

  if (localStorage.getItem('isLoggedIn') === null) {
    isLoggedIn = false
  }
  function logoutHandler(){
    dispatch(logout()).then((res) => {
      localStorage.clear()
      localStorage.setItem("isLoggedIn", false)
      window.location = '/login'

  })
  }
  const items = [
    {
      key: '1',
      label: (
        <Link  rel="noopener noreferrer" to="/all_projects">
         Projects
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link  rel="noopener noreferrer" to="/all_contractors">
          Contractors
        </Link>
      ),
     
    },
  ];
  return (
    <header className='navbar'>
      <div className='navbar__title navbar__item'>
        <img className='navbar__image' onClick={() => navigate('/')} src={Sourcify} alt="logo" />
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

      </div>
      {isAdmin !== 2 && <>
        <div className='navbar__item'><Link to='/about-us'>Company</Link></div>
        <div className='navbar__item'><Link to='/services'>Work Areas</Link> </div>
        <div className='navbar__item'><Link to="/editor">Resources</Link> </div>
        <div className='navbar__item'>Support</div>
      </>}
      {isLoggedIn ==true ?
       <>
        <div className='navbar__item'>
          <p>{ localStorage.getItem('email')!=null&&localStorage.getItem('email').split('@')[0]}</p>
        </div>
        <div className='navbar__item'>
          <button className='navbar__button hover:text-white rounded-[25px]' onClick={logoutHandler} type="link">Logout </button>
        </div></>
        :
        <button className='navbar__button hover:text-white rounded-[25px]' type="link"><Link to='/login'>Login/Signup</Link> </button>
      }

    </header>
  )
}

export default Header