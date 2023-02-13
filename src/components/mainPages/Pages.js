import React, { useState } from 'react'
import Login from './auth/Login'
import Regsiter from './auth/Register'
import { Routes, Route,Navigate   } from 'react-router-dom'
import PersonalDetails from './contractorForm/PersonalDetails'
import WorkExperience from './contractorForm/WorkExperience'
const Pages = () => {


  return (
    <div>
           <Routes>
           <Route path="/contractor-form" element={<div  className="container"> <PersonalDetails/></div>  } />
         <Route path="contractor-form/work-experience" element={<div  className="container"> <WorkExperience/> </div>  } />
           <Route path="/login" element={<div  className="container"> <Login/></div>  } />
         <Route path="/register" element={<div  className="container"> <Regsiter/></div>  } />
          </Routes>
    </div>
  )
}

export default Pages