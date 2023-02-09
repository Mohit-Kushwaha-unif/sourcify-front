import React from 'react'
import { Button, Space } from 'antd'
import Sourcify from '../../assests/Sourcify Logo.png'
const Header = () => {
  return (
    <header className='navbar'>
    <div className='navbar__title navbar__item'>
      <img className='navbar__image' src={Sourcify}  alt="logo"/>
    </div>
    <div className='navbar__item'>Company</div>
    <div className='navbar__item'>Work Areas</div>
    <div className='navbar__item'>Resources</div>        
    <div className='navbar__item'>Support</div>        
    <div className='navbar__item'>
       
      <Button className='navbar__button' type="link">Login/Signup</Button>
    </div>        
</header>
  )
}

export default Header