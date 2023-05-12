import { Button, Card, Checkbox, Form, Select, Space, Table, Tag } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import state_cites from '../../../../assests/state_city.'
import { get_category, get_category_for_ws } from '../../../../services/category'
import { get_contractor } from '../../../../services/contractor'
import { adminSearch } from '../../../../services/DB'
import { get_listing } from '../../../../services/listing'
import { get_Vendor } from '../../../../services/Vendor'
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import { useRef } from 'react'
import { get_feedback } from '../../../../services/FeedBack'


const DashboardAdmin = () => {

  const dispatch = useDispatch()
  const [contractor, setContractor] = useState([])
  const navigate = useNavigate()
  const [companie, setCompanie] = useState([])
  const [categories,setCategories] = useState([])
  const [sub_cat,setSub_cat] = useState([])
  const [projects, setProjects] = useState([])
  const [feedBacks ,setFeedBack] = useState([])
  useEffect(() => {
    var cont_data = []
    var vend_data = []
    var proj_data = []
    var work_segment = []
    dispatch(get_contractor()).then((res) => {
      res.map((conts) => {
        cont_data.push(conts)
      })
      setContractor([...cont_data])
    })
    dispatch(get_Vendor()).then((res) => {
      res.map((conts) => {
        vend_data.push(conts)
      })
      setCompanie([...vend_data])
    })
    dispatch(get_listing()).then((res) => {
      res.map((conts) => {
        proj_data.push(conts)
      })
      setProjects([...proj_data])
    })
    dispatch(get_category()).then((res) => {
      
      setCategories([...res])
    })
    dispatch(get_category_for_ws()).then((res) => {
    
      setSub_cat([...res])
    })
    dispatch(get_feedback()).then((res) => {
    
      setFeedBack([...res])
    })
    
  }, [])


 

  return (
    <section className="min-h-screen flex  flex-col w-full  py-6 sm:px-6 lg:px-3" >
      <div className="px-2 h-auto text-gray-800">
        <div
          className=" w-full   "
        >
          <div className='grid grid-cols-1 md:gap-x-6  mb-5 md:grid-cols-3'>
            <Card   className='bg-gray-200 shadow-md border-2 border-solid mb-5' title="Contractors " bordered={false}>

              <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color hover:underline cursor-pointer' onClick={()=>{navigate('/admin/contractors-list')}}> {contractor?.length}</p>

            </Card>

            <Card className='bg-gray-200 shadow-md border-2 border-solid mb-5'  title="Companies " bordered={false}>
              <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color hover:underline cursor-pointer'  onClick={()=>{navigate('/admin/companies')}}> {companie?.length}</p>
            </Card>

            <Card className='bg-gray-200 shadow-md border-2 border-solid mb-5'  title="Total Projects" bordered={false}>
              <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color hover:underline cursor-pointer' onClick={()=>{navigate('/admin/all-listing')}}>{projects.length} </p>
            </Card>
            <Card className='bg-gray-200 shadow-md border-2 border-solid mb-5'  title="Work Segment " bordered={false}>

              <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color hover:underline cursor-pointer' onClick={()=>{navigate('/admin/category-list')}}> {sub_cat?.length}</p>

            </Card>

            <Card className='bg-gray-200 shadow-md border-2 border-solid mb-5'  title="Parent Work Segment " bordered={false}>
              <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color hover:underline cursor-pointer'  onClick={()=>{navigate('/admin/category-list')}}> {categories?.length}</p>
            </Card>
            <Card className='bg-gray-200 shadow-md border-2 border-solid mb-5'  title="Sub Work Segment " bordered={false}>
              <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color hover:underline cursor-pointer'  onClick={()=>{navigate('/admin/category-list')}}>{sub_cat?.length - categories?.length} </p>
            </Card>

            <Card className='bg-gray-200 shadow-md border-2 border-solid mb-5'  title="Feedbacks Recieved" bordered={false}>
              <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color hover:underline cursor-pointer' onClick={()=>{navigate('/admin/feedbacks')}}>{feedBacks.length} </p>
            </Card>
           
          </div>

        
        </div>
      </div>
    </section>
  )
}

export default DashboardAdmin