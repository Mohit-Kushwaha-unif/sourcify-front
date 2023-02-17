import React from 'react'
import { Button, Space } from 'antd'
import Sourcify from '../../assests/Sourcify Logo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const isAdmin = useSelector(state => state.User.user_role);
  var isLoggedIn = true
  if (localStorage.getItem('isLoggedIn') === null) {
    isLoggedIn = false
  }
  return (
    <header className='navbar'>
    <div className='navbar__title navbar__item'>
      <img className='navbar__image' src={Sourcify}  alt="logo"/>
    </div>
    {isAdmin !==2 && <>
      <div className='navbar__item'><Link to='/about-us'>Company</Link></div>
    <div className='navbar__item'><Link to='/services'>Work Areas</Link> </div>
    <div className='navbar__item'><Link to ="/editor">Resources</Link> </div>        
    <div className='navbar__item'>Support</div>      
    </>}
     
    <div className='navbar__item'>
     {  isLoggedIn ? 'mohit@gmial.com':
      <Button className='navbar__button' type="link"><Link to='/login'>Login/Signup</Link> </Button>}
    </div>        
</header>
  )
}

export default Header