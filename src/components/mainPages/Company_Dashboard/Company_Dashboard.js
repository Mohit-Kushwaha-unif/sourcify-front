import { Space, Tag, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { get_contractor } from '../../../services/contractor'
import { get_listing_user, remove_listing } from '../../../services/listing'
import useDocumentTitle from '../../Helper/useDocumentTitle'
import Contractor_Dashboard from '../Contractor_Dashboard/Contractor_Dashboard'
import ListingCard from './Listing/listingCard'
// import Table from 'ant-responsive-table'
const Company_Dashboard = ({dataTransfer}) => {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const [tableData, setTableData] = useState([])
  const [contractor, setContractors] = useState([])
  const [accountStatus, setaccountStatus] = useState()
  var [activeProjects,setActiveProjects] = useState(0)
  var data = []
  var status = useSelector(state =>state.User.acc_status)
  useEffect(()=>{
    setaccountStatus(status) 
  },[status])
  useDocumentTitle('Dashboard')
  
  useEffect(() => {
    dispatch(get_listing_user(localStorage.getItem('user_id'))).then((res) => {
      res.map((tableData, index) => {
        if( tableData.status === 0){
          setActiveProjects(prevState =>prevState+1)
        }
        data.push({
          '_id': tableData._id,
          'key': index,
          'entity': tableData.project_discription,
          'work_segment': tableData.wok_segment,
          'status': tableData.status === 1 ? "Moderation" : tableData.status === 0 ? "Approved" : "Rejected"
        })
      })
      setTableData(data)
      
    })

    dispatch(get_contractor()).then((res) => {
      setContractors(res)
    })
  }, [])
  dataTransfer(tableData)
  function deleteHandler(id) {
    dispatch(remove_listing({ listing_id: id }))
  }
  const columns = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'key',
      render: (text) => text + 1,

    },
    {
      title: 'Description',
      dataIndex: 'entity',
      key: 'entity',
      render: (text) => text,

    },
    {
      title: 'Work Segment',
      dataIndex: 'work_segment',
      key: 'work_segment',
      render: (_, work_segment) => (
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

    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let color = 'Green'
        if (text === "Moderation") {
          color = 'yellow'

        }
        if (text === "Approved") {
          color = 'green'
        }
        if (text === "Rejected") {
          color = 'volcano'
        }
        return <Tag color={color}>{text}</Tag>
      },

    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status !== 'Approved' && <><Link to='/edit-listing' state={{ _id: record?._id }}>Edit </Link>
            <Link onClick={() => deleteHandler(record?._id)}>Delete</Link> </>}
          <Link to='/viewForm' state={{ _id: record?._id }}>View </Link>

        </Space>
      ),

    },
  ];

  return (
    <>
    <ToastContainer/>
      <div className='p-6 container w-full'>
        <section className="min-h-auto flex flex-col w-full mb-6  pt-6 " >
          <div className="px-2 h-auto text-gray-800">
            <div
              className="flex w-full flex-wrap h-full  "
            >
              <div className="xl: w-full overflow-x-auto   lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-6 mr-4 font-semibold">Your Posted Projects</p>
                </div>

                <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 5 }} />
              </div>
            </div>
          </div>
        </section>
      

      </div>
       

    </>
  )
}

export default Company_Dashboard