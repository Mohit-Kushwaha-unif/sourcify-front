import React, { useEffect, useState } from 'react'
import Login from './auth/Login'
import Regsiter from './auth/Register'
import { Routes, Route, useLocation, useNavigate, Redirect, Navigate } from 'react-router-dom'
import PersonalDetails from './contractorForm/PersonalDetails'
import WorkExperience from './contractorForm/WorkExperience'
import FinancialDetail from './contractorForm/FinancialDetail'
import { useDispatch, useSelector } from 'react-redux'
import AboutUs from './AboutUs/AboutUs'
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
import Listing from './superAdmin/Listings/Listing'
import EditListing from './superAdmin/Listings/Edit/Edit'
import Dashboard from './Homepage/HomePage'
import Com_Dash from './Company_Dashboard/Dashboard'
import reactRouterToArray from 'react-router-to-array';
import Contractor_Dashboard from './Contractor_Dashboard/Contractor_Dashboard'
import All_projects from './All_Projects/All_projects'
import All_Contractors from './All_Contractor/All_Contractors'
import ProjectDetails from './ProjectDetails/ProjectDetails'
import ViewForm from './Company_Dashboard/Listing/ViewForm'
import FeedBack from './superAdmin/FeedBack/FeedBack'
import ResourceDenied from './ResourceDenied/ResourceDenied'
import NotFound from './NotFound/NotFound'
import ViewFeedback from './superAdmin/FeedBack/ViewFeedback'
import { add_slug } from '../../services/Slug'
import Messages from './Messages/Messages'
import SearchResult from './Search_Result/SearchResult'
import CarauselList from './superAdmin/Carausel/CarauselList'
import Add_Carausel from './superAdmin/Carausel/add_carausel/Add_Carausel'
import Edit_caraousel from './superAdmin/Carausel/Edit_caraousel/Edit_caraousel'
import Support from './Support/Support'
import UpdateProfie from './UpdateProfile/UpdateProfie'
import UserRole from './useRole/userRole'
import OTPForm from './auth/OTPForm'
import EmailForm from './auth/EmailForm'
import Privacy from './LegalAgreement/Privacy'
import SourcifyWork from './SourciyWork/SourcifyWork'
import FindContractor from './Find_Contractor/FindContractor'
import FindProjects from './FindProjects/FindProjects'
import Work_Segment from './Work_segment/Work_Segment'
import Blogs from './Blogs/Blogs'
import Blog from './Blogs/Blog'
import Contact from './ContactUs/Contact'
import ForgotPassword from './auth/ForgotPassword'
import EmailScreen from './auth/EmailScreen'
import ResetPassword from './auth/ResetPassword'
import Dashboardss from './Company_Dashboard/Dashboard'
import Post from './superAdmin/Post/Post'
import Add_Post from './superAdmin/Post/Add_Edit/Add_Post'
import DashboardAdmin from './superAdmin/Dashboard/DashboardAdmin'
import Report from './superAdmin/Report/ReportGenerator'
import SendEmail from './superAdmin/Email/SendEmail'
const Pages = (props) => {
  const location = useLocation()
  const dispatch = useDispatch()

  const isAdmin = useSelector(state => state.User.user_role);
  var isLoggedIn = true
  if (localStorage.getItem('isLoggedIn') === null) {
    isLoggedIn = false
  }
  useEffect(() => {
    window.scroll(0, 0)
  }, [location])

  const item = reactRouterToArray(<Routes>
    <Route path='/' element={isAdmin == 2 ? <Navigate to="/admin/contractors-list" /> : <Dashboard />} />
    <Route path='/about-us' element={<AboutUs />} />
    <Route path="/contractor-form" element={<PersonalDetails />} />
    <Route path="contractor-form/work-experience" element={<WorkExperience />} />
    <Route path="contractor-form/financial-detail" element={<FinancialDetail />} />
    <Route path="vendor-form" element={<VendorForm />} />
    <Route path="/register" element={<Regsiter />} />
    <Route path="/login" element={<Login />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/services" element={isAdmin == 2 ? <Service /> : <ResourceDenied />} />
    <Route path="/editor" element={isAdmin == 2 ? <><DraftEditor /></> : <ResourceDenied />} />
    <Route path="/admin/contractors-list" element={isAdmin == 2 ? <><Contractor /></> : <ResourceDenied />} />
    <Route path="/admin/edit-contractors" element={isAdmin == 2 ? <><Edit_Form /></> : <ResourceDenied />} />
    <Route path="/admin/about-us" element={isAdmin == 2 ? <><About_us /></> : <ResourceDenied />} />
    <Route path="/admin/companies" element={isAdmin == 2 ? <><Companies /></> : <ResourceDenied />} />
    <Route path="/admin/edit-company" element={isAdmin == 2 ? <><EditForm_Vendor /></> : <ResourceDenied />} />
    <Route path="/admin/category-list" element={isAdmin == 2 ? <><Category /></> : <ResourceDenied />} />
    <Route path="/admin/category-form" element={isAdmin == 2 ? <><Add_Category /></> : <ResourceDenied />} />
    <Route path="/admin/edit-categories" element={isAdmin == 2 ? <><Tab /></> : <ResourceDenied />} />
    <Route path="/dashboard" element={isAdmin == 1 ? <Company_Dashboard /> : isAdmin == 0 ? <Contractor_Dashboard /> : <ResourceDenied />} />
    <Route path="/dashboard/listing-form" element={isAdmin != 0 ? <ListingForm /> : <ResourceDenied />} />
    <Route path="/admin/all-listing" element={isAdmin == 2 ? <Listing /> : <ResourceDenied />} />
    <Route path="/edit-listing" element={<EditListing />} />
    {/* <Route path="/all_contractors" element={ <All_Contractors/>}/> */}
    <Route path="/all_projects" element={<All_projects />} />
    <Route path="/projectDetails" element={<ProjectDetails />} />
    <Route path="/viewForm" element={<ViewForm />} />
    <Route path="/admin/feedbacks" element={isAdmin == 2 ? <><FeedBack /></> : <ResourceDenied />} />
    <Route path="/admin/view-feedback" element={isAdmin == 2 ? <><ViewFeedback /></> : <ResourceDenied />} />
    <Route path='*' element={<NotFound />} />
  </Routes>)

  useEffect(() => {
    if (localStorage.getItem("isSlug") !== null && localStorage.getItem("isSlug") == true) {
      dispatch((add_slug({ "slugs": item }))).then((res) => {
      })
    }
  }, [])


  return (
    <div className={isLoggedIn && isAdmin != 1 && isAdmin != 0 ? ' flex' : 'container-fluid'}>
      {
        isAdmin == 2 && <Sidebar />
      }
      <Routes>
        <Route path='/' element={isAdmin == 2 ? <Navigate to="/admin/contractors-list" /> : <Dashboard />} />
        <Route path="/contractor-form" element={<PersonalDetails />} />
        <Route path="contractor-form/work-experience" element={<WorkExperience />} />
        <Route path="contractor-form/financial-detail" element={<FinancialDetail />} />
        <Route path="vendor-form" element={<VendorForm />} />
        <Route path="/register" element={<Regsiter />} />
        {/* <Route path="/otp-verification" element={<OTPForm/>}/> */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/passwordreset" element={<EmailScreen />} />
        <Route path="/resetPassword/:id" element={<ResetPassword />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={isAdmin == 2 ? <Service /> : <ResourceDenied />} />
        <Route path="/editor" element={isAdmin == 2 ? <><DraftEditor /></> : <ResourceDenied />} />
        <Route path="/admin/contractors-list" element={isAdmin == 2 ? <><Contractor /></> : <ResourceDenied />} />
        <Route path="/admin/edit-contractors" element={isAdmin == 2 ? <><Edit_Form /></> : <ResourceDenied />} />
        <Route path="/edit-contractors" element={<><Edit_Form /></>} />
        <Route path="/admin/about-us" element={isAdmin == 2 ? <><About_us /></> : <ResourceDenied />} />
        <Route path="/admin/report" element={isAdmin == 2 ? <Report /> : <ResourceDenied />} />
        <Route path="/admin/companies" element={isAdmin == 2 ? <><Companies /></> : <ResourceDenied />} />
        <Route path="/admin/edit-company" element={isAdmin == 2 ? <><EditForm_Vendor /></> : <ResourceDenied />} />
        <Route path="/edit-company" element={<><EditForm_Vendor /></>} />
        <Route path="/admin/category-list" element={isAdmin == 2 ? <><Category /></> : <ResourceDenied />} />
        <Route path="/admin/category-form" element={isAdmin == 2 ? <><Add_Category /></> : <ResourceDenied />} />
        <Route path="/admin/edit-categories" element={isAdmin == 2 ? <><Tab /></> : <ResourceDenied />} />
        <Route path="/dashboard" element={isAdmin == 1 ? <Dashboardss /> : isAdmin == 0 ? <Contractor_Dashboard /> : <ResourceDenied />} />
        <Route path="/dashboard/listing-form" element={<ListingForm />} />
        <Route path="/admin/all-listing" element={isAdmin == 2 ? <Listing /> : <ResourceDenied />} />
        <Route path="/admin/carausel-list" element={isAdmin == 2 ? <CarauselList /> : <ResourceDenied />} />
        <Route path="/admin/caraousel-form" element={isAdmin == 2 ? <Add_Carausel /> : <ResourceDenied />} />
        <Route path="/admin/edit-caraousel" element={isAdmin == 2 ? <Edit_caraousel /> : <ResourceDenied />} />
        <Route path="/admin/post-list" element={isAdmin == 2 ? <Post /> : <ResourceDenied />} />
        <Route path="/admin/post-form" element={isAdmin == 2 ? <Add_Post /> : <ResourceDenied />} />
        {/* <Route path="/admin/post-list" element={isAdmin==2 ? <Post/>: <ResourceDenied/>}/> */}
        <Route path="/edit-listing" element={<EditListing />} />
        <Route path="/all_contractors" element={<All_Contractors />} />
        <Route path="/all_projects" element={<All_projects />} />
        <Route path="/projectDetails" element={<ProjectDetails />} />
        <Route path="/support" element={<Support />} />
        <Route path="/viewForm" element={<ViewForm />} />
        <Route path="/admin/feedbacks" element={isAdmin == 2 ? <><FeedBack /></> : <ResourceDenied />} />
        <Route path="/admin/view-feedback" element={isAdmin == 2 ? <><ViewFeedback /></> : <ResourceDenied />} />
        <Route path="/messages" element={<Messages />} />
        <Route path='/results/:query' element={<SearchResult />} />
        <Route path='/update-profile' element={<UpdateProfie />} />
        <Route path='/userRole' element={<UserRole />} />
        <Route path='/verify' element={<OTPForm />} />
        <Route path='/everify/:token' element={<EmailForm />} />
        <Route path='/everifing' element={<EmailForm />} />
        <Route path='/privacy-policy' element={<Privacy />} />
        <Route path='/admin' element={<Navigate to="/admin/contractors-list" />} />
        <Route path='/admin/dashboard' element={<DashboardAdmin />} />
        <Route path='/SourcifyWork' element={< SourcifyWork />} />
        <Route path='/contractors' element={< FindContractor />} />
        <Route path='/project_list' element={< FindProjects />} />
        <Route path='/Work_Segment' element={<Work_Segment />} />
        <Route path='/admin/email-list' element={<SendEmail />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='*' element={<NotFound />} />

      </Routes>

    </div>
  )
}

export default Pages