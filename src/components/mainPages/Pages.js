import React, { useEffect, useState } from 'react'
import Login from './auth/Login'
import Regsiter from './auth/Register'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import PersonalDetails from './contractorForm/PersonalDetails'
import WorkExperience from './contractorForm/WorkExperience'
import FinancialDetail from './contractorForm/FinancialDetail'
import { useSelector } from 'react-redux'
import AboutUs from './superAdmin/AboutUs'
import Service from './services/Service'
import DraftEditor from './superAdmin/editor/editor'
import Sidebar from '../headers/sidebar'
import Contractor from './superAdmin/Contractors/Contractor'
import Edit_Form from './superAdmin/Contractors/Edit_Form/Edit_Form'
import About_us from './superAdmin/About_Us/About_us'
import VendorForm from './vendorForm/VendorForm'
import Companies from './superAdmin/Companies/Companies'
import EditForm_Vendor from './superAdmin/Companies/Edit_Form/Edit_Form_vendor'
import Category from './superAdmin/Category/Category'
import Add_Category from './superAdmin/Category/add_category/Add_Category'
import Edit_category from './superAdmin/Category/Edit_Category/Edit_category'
import Tab from './superAdmin/Category/Edit_Category/Tab'
import Company_Dashboard from './Company_Dashboard/Company_Dashboard'
import ListingForm from './Company_Dashboard/Listing/ListingForm'
const Pages = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isAdmin = useSelector(state => state.User.user_role);
  var isLoggedIn = true
  if (localStorage.getItem('isLoggedIn') === null) {
    isLoggedIn = false
  }
  useEffect(() => {
    window.scroll(0,0)

  }, [location])
  console.log(isAdmin,isLoggedIn)
  return (
    <div className={isLoggedIn && isAdmin!=1 &&isAdmin!=0 ? 'flex': ''}>
      {
        isAdmin==2 && <Sidebar/>
      }
      <Routes>
        <Route path="/contractor-form" element={ <PersonalDetails />} />
        <Route path="contractor-form/work-experience" element={<WorkExperience />} />
        <Route path="contractor-form/financial-detail" element={<FinancialDetail />} />
        <Route path="vendor-form" element={<VendorForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={ <Regsiter/>} />
        <Route path="/about-us" element={isAdmin==2 ?<AboutUs/>: 'ddd'}/>
        <Route path="/services" element={isAdmin==2 ?<Service/>: 'ddd'}/>
        <Route path="/editor" element={isAdmin==2 ?<><DraftEditor/></> : 'ddd'}/>
        <Route path="/admin/contractors-list" element={isAdmin==2 ?<><Contractor/></> : 'ddd'}/>
        <Route path="/admin/edit-contractors" element={isAdmin==2 ?<><Edit_Form/></> : 'ddd'}/>
        <Route path="/admin/about-us" element={isAdmin==2 ?<><About_us/></> : 'ddd'}/>
        <Route path="/admin/companies" element={isAdmin==2 ?<><Companies/></> : 'ddd'}/>
        <Route path="/admin/edit-company" element={isAdmin==2 ?<><EditForm_Vendor/></> : 'ddd'}/>
        <Route path="/admin/category-list" element={isAdmin==2 ?<><Category/></> : 'ddd'}/>
        <Route path="/admin/category-form" element={isAdmin==2 ?<><Add_Category/></> : 'ddd'}/>
        <Route path="/admin/edit-categories" element={isAdmin==2 ?<><Tab/></> : 'ddd'}/>
        <Route path="/dashboard" element={isAdmin==1 ? <Company_Dashboard/>: 'ddd'}/>
        <Route path="/dashboard/listing-form" element={isAdmin==1 ? <ListingForm/>: 'ddd'}/>
      </Routes>
    </div>
  )
}

export default Pages