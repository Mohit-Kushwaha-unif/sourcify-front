import React, { useState } from 'react'
import Login from './auth/Login'
import Regsiter from './auth/Register'
import { Routes, Route, Navigate } from 'react-router-dom'
import PersonalDetails from './contractorForm/PersonalDetails'
import WorkExperience from './contractorForm/WorkExperience'
import VendorForm from './vendorForm/VendorForm'
import FinancialDetail from './contractorForm/FinancialDetail'
import AboutUs from './AboutUs/AboutUs'
const Pages = () => {


  return (
    <div>
      <Routes>
        <Route path='/' element={ <AboutUs/>} />
        <Route path="/contractor-form" element={<div className="container"> <PersonalDetails /></div>} />
        <Route path="contractor-form/work-experience" element={<div className="container"> <WorkExperience /> </div>} />
        <Route path='/vendor-form' element={<VendorForm />} />
        <Route path="/login" element={<div className="container"> <Login /></div>} />
        <Route path="/register" element={<div className="container"> <Regsiter /></div>} />

        <Route path="contractor-form/financial-detail" element={<FinancialDetail />} />
      </Routes>
    </div>
  )
}

export default Pages