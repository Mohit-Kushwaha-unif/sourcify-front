import React from 'react'
import { Button, Space } from 'antd'
const Header = () => {
  return (
    <header className='navbar'>
    <div className='navbar__title navbar__item'>Sourcify</div>
    <div className='navbar__item'>Company</div>
    <div className='navbar__item'>Work Areas</div>
    <div className='navbar__item'>Resources</div>        
    <div className='navbar__item'>Support</div>        
    <div className='navbar__item'> <Space wrap>
    <Button className='navbar__button' type="link">Login/Signup</Button></Space></div>        
</header>
  )
}

export default Header