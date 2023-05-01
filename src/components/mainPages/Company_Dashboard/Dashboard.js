import React from 'react'
import Company_Dashboard from './Company_Dashboard'
import Company_contracts from './Company_contracts'
import { Card } from 'antd'
import { useState } from 'react'
import Loader from '../../Helper/Loader'

const Dashboard = () => {
  const [postedProjects, setPostedProjects] = useState(0)
  const [activeProjects, setActiveProjects] = useState(0)
  const [tableData, setTableData] = useState([])
  console.log("hey")
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
    setActiveProjects(count)
    setPostedProjects(val.length);
    
  }
  return (
    <>
     
            <div className=' container grid grid-cols-1 md:gap-x-6  mb-5 md:grid-cols-4'>

              <Card title="Posted Projects " bordered={false}>
                <div className='grid grid-cols-3 place-items-center'>

                  <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color'> {postedProjects}</p>
                  <p className='col-span-2 text-lg'> You had posted {postedProjects} projects till now</p>
                </div>
              </Card>

              <Card title="Shared Intreseted Projects" bordered={false}>
                <div className='grid grid-cols-3 place-items-center'>
                  <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color'> {tableData.length}</p>
                  <p className='col-span-2 text-lg'> You have shared your interest in {tableData.length} project</p>
                </div>

              </Card>


              <Card title="Active Projects" bordered={false}>
                <div className='grid grid-cols-3 place-items-center'>
                  <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color'> {activeProjects}</p>
                  <p className='col-span-2 text-lg'> Your Ongoing Projects are {activeProjects}</p>
                </div>

              </Card>

              <Card title="All Projects" bordered={false}>
                <div className='grid grid-cols-3 place-items-center'>
                  <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color'> {postedProjects + tableData.length}</p>
                  <p className='col-span-2 text-lg'> Your Total Number of projects</p>
                </div>

              </Card>
            </div>


            <Company_Dashboard dataTransfer={Company_Data} />


            <Company_contracts companyContractData={ContractData} />
        




    </>
  )
}

export default Dashboard