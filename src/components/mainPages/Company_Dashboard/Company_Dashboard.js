import { Space,  Tag,Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { get_contractor } from '../../../services/contractor'
import { get_listing_user,remove_listing } from '../../../services/listing'
import ListingCard from './Listing/listingCard'
// import Table from 'ant-responsive-table'
const Company_Dashboard = () => {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const [tableData, setTableData] = useState([])
  const [contractor,setContractors] = useState([])
  var data =[]
  useEffect(() => {
    dispatch(get_listing_user(localStorage.getItem('user_id'))).then((res) => {
      res.map((tableData, index) => {
        data.push({
            '_id': tableData._id,
            'key': index,
            'entity': tableData.project_discription,
            'work_segment': tableData.wok_segment,
            'status': tableData.status ===1 ? "Moderation" : tableData.status ===0 ? "Approved": "Rejected"
        })
    })
    setTableData(data)
    })
    dispatch(get_contractor()).then((res)=>{
      console.log(res)
      setContractors(res)
    })
  }, [])
 function deleteHandler(id){
  dispatch(remove_listing({listing_id:id}))
 }
  const columns = [
    {
        title: 'S.No',
        dataIndex: 'key',
        key: 'key',
        render: (text) => text + 1,
        showOnResponse: true,
        showOnDesktop: true
    },
    {
        title: 'Description',
        dataIndex: 'entity',
        key: 'entity',
        render: (text) => text,
        showOnResponse: true,
        showOnDesktop: true
    },
    {
        title: 'Work Segment',
        dataIndex: 'work_segment',
        key: 'work_segment',
        render: (_,  work_segment ) => (
            <>
                {Array.isArray(work_segment?.work_segment) ? work_segment?.work_segment?.map((tag, index) => {
                    let color = tag?.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'vlcano';
                    }
                    return (
                        <Tag key={index}>
                            {tag}
                        </Tag>
                    );
                }) : work_segment?.work_segment}
            </>
        ),
        showOnResponse: true,
        showOnDesktop: true
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
            let color = 'Green'
            if(text ==="Moderation"){
                color = 'yellow'
               
            }
            if(text === "Approved"){
                color = 'green'
            }
            if(text === "Rejected"){
                color= 'volcano'
            }
            return <Tag color={color}>{text}</Tag>
        } ,
        showOnResponse: true,
        showOnDesktop: true
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
              {record.status !=='Approved' && <Link to='/edit-listing' state={{ _id: record?._id }}>Edit </Link>} 
                <Link to='/viewForm' state={{ _id: record?._id }}>View </Link>
                <Link onClick={()=>deleteHandler(record?._id)}>Delete</Link>
            </Space>
        ),
        showOnResponse: true,
        showOnDesktop: true
    },
];
 
  return (
    <>
      <div className='p-6'>
        <section className="min-h-auto flex flex-col w-full mb-6  pt-6 sm:px-6 " >
        <div className="px-2 h-auto text-gray-800">
          <div
            className="flex w-full flex-wrap h-full  "
          >
            <div className="xl: w-full overflow-x-auto   lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
              <button
                onClick={() => navigator('/dashboard/listing-form')}
                className="save_Btn mb-4 px-6 "
              >
                Add New Listing </button>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-lg mb-1 mr-4 font-semibold">Your Previous Listings</p>
              </div>
 
              <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 5 }}  />
            </div>
          </div>
        </div>
      </section>
      <div className='px-6 '>
       <p className='text-xl font-semibold  capitalize'>Sub-Contractors you might want to  work with </p> 
       <div class="p-10 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    
    
      {contractor.length> 0 && contractor.reverse().map((contract,index)=>{
        console.log({contract})
        if(index <5)
     {
        return <>
        <div class="rounded-[25px] overflow-hidden shadow-lg ">
        {/* <img class="w-full max-h-64" src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="Mountain"/> */}
      <div class="px-6 py-4">
        <h1 className='font-bold mb-2'> Details</h1>
        <div class="font-semibold text-xl mb-2 capitalize"> <span className=''>Username- </span> 
          <span className='text-[#FF5757]'>{contract.username}</span></div>
        <h3 className='font-semibold mb-2 '>Working States</h3>
        { contract.prefferd_states.map((state)=>{
           return <span class="inline-block bg-[#FF5757] rounded-full px-3 py-1 text-sm  text-[#ffffff] mb-2 mr-2">{state}</span>
        })
        }
        {/* <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p> */}
      </div>
      <div class="px-6 pt-1 pb-2">
      <h3 className='font-semibold mb-2'>Working Sectors</h3>
        {
          contract.work_area.map((work)=>{
           return <span class="inline-block  bg-[#FF5757]  rounded-full px-3 py-1 text-sm  text-[#ffffff] mr-2 mb-2">{work.work_segment}</span>
          })
        }
       </div>
    </div>
        </>
        }
      })}
      

    </div>
</div>

        </div>

     
    </>
  )
}

export default Company_Dashboard