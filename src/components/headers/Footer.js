import { Button, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Sourcify from '../../assests/Sourcify.png'
import { FaLandmark } from 'react-icons/fa'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {MdAlternateEmail} from 'react-icons/md'
// import { icons } from 'react-icons'
const Footer = () => {
  const navigate = useNavigate()
  return (
    


    <footer className='container'>

      <div className="row footer">
        <div className="col-md-4">
          <img src={Sourcify}/>
          <div className='flex'><i className='mr-2'><FaLandmark/></i>115, Tower A, Spazedge, Sohna Road, Gurugram, Haryana 122018</div>
          <div className='flex'><i className='mr-2'><BsFillTelephoneFill/></i>+91-99676 62976</div>
          <div className='flex'><i className='mr-2'><MdAlternateEmail/></i>info@sourcify.in</div>
        </div>
        <div className="col-md-2">
          <h3>Quick Links</h3>
          <ul>
            <li>Terms & Conditions</li>
            <li>Disclaimer</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="col-md-2">
        <h3>Resources</h3>
          <ul>
            <li>Blog</li>
            <li>Case Study</li>
            <li>About us</li>
            <li>Career</li>
          </ul>
        </div>

        <div className="col-md-4">
        <h3>Newsletter</h3>
        <form>
          <Input type="text" className='mb-3' style={{width:'70%'}}/>
        </form>
        <Button>Submit</Button>

        </div>
      </div>

    </footer>



  )
}

export default Footer
