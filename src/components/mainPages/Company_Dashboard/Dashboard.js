import React from 'react'
import Company_Dashboard from './Company_Dashboard'
import Company_contracts from './Company_contracts'
import { Card } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Dashboard = () => {
  const [postedProjects, setPostedProjects] = useState(0)
  const [activeProjects, setActiveProjects] = useState(0)
  const [tableData, setTableData] = useState([])
  const navigator = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigator('/login');
  }
  }, [])
  var count = 0
  function ContractData(val) {
    setTableData([...val])
  }
  function Company_Data(val) {
    val.map((details) => {
      if (details.status == 'Approved') {
        count = count + 1
        // setActiveProjects((prevActiveProjects) => prevActiveProjects + 1);
      }

    })
    console.log(count)
    setActiveProjects(count)
    setPostedProjects(val.length);
    
  }
  return (
    <>
     
            <div className=' container grid grid-cols-1 md:gap-x-6  mb-5 md:grid-cols-3'>
            <Card title="Active Projects" bordered={false}>
              <div className='grid grid-cols-3 place-items-center'>
                <p className='col-span-1 mr-1 brand_text font_64 font_inter new_color'>{activeProjects}</p>
                <p className='col-span-2 text-lg' ><span data-translate="hi">Your Ongoing Projects are</span> {activeProjects}</p>
              </div>
            </Card>
      

            <Card title="Shown Interest " bordered={false}>
              <div className='grid grid-cols-3 place-items-center'>
                <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color' > {tableData.length}</p>
                <p className='col-span-2 text-lg' > <span  data-translate="hi">Projects in that you have shown intrest</span> {tableData.length} </p>
              </div>

            </Card>
            <Card title="Posted Projects " bordered={false}>
              <div className='grid grid-cols-3 place-items-center'>
                <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color' > {postedProjects}</p>
                <p className='col-span-2 text-lg' > <span  data-translate="hi">Projects that you have posted till now </span> {postedProjects}  </p>
              </div>
            </Card>
             

              {/* <Card title="All Projects" bordered={false}>
                <div className='grid grid-cols-3 place-items-center'>
                  <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color' data-translate="hi"> {postedProjects + tableData.length}</p>
                  <p className='col-span-2 text-lg'data-translate="hi"> Your Total Number of projects</p>
                </div>

              </Card> */}
            </div>


            <Company_Dashboard dataTransfer={Company_Data} />


            <Company_contracts companyContractData={ContractData} />
        




    </>
  )
}

export default Dashboard