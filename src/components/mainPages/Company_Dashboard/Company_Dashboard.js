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
        console.log({tableData})
        const found = tableData.proposals.find((val) => val.contract_status === 1);
        data.push({
          '_id': tableData._id,
          'key': index,
          'entity': tableData.project_discription,
          'work_segment': tableData.wok_segment,
          'Intrests': tableData.proposals.length,
          'status': tableData.status === 1 ? "Under Review" : tableData.status === 0 ? "Approved" : "Rejected",
          'found': found? found : "false"
        })
      })
     
      setTableData(data)
      
    })

    dispatch(get_contractor()).then((res) => {
      setContractors(res)
    })
  }, [])
  useEffect(()=>{
    dataTransfer(tableData)
  },[tableData])
  
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
      title: 'Project Name',
      dataIndex: 'entity',
      key: 'entity',
      render: (_,text) => <><Link  to='/viewForm' state={{ _id: text?._id }}>{_}</Link></>,

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
        if (text === "Under Review") {
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
      title: 'Interest Received',
      dataIndex: 'Intrests',
      key: 'Intrests',
 
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        console.log(record),
        <Space size="middle">
          {record.status !== 'Approved' && <><Link to='/edit-listing' state={{ _id: record?._id }}>Edit </Link>
            <Link onClick={() => deleteHandler(record?._id)}>Delete</Link> </>}
            <Link to='/viewForm' state={{ _id: record?._id }}>View </Link>
            
            {record?.found !="false" &&<Link to='/messages' state={{ _id: record?.found.contractor_id }}>Message </Link> }
        </Space>
      ),

    },
  ];

  return (
    <>
    <ToastContainer/>
    <section className="container min-h-auto flex flex-col w-full mb-6  pt-6 sm:px-6 " >
          <div className="px-0 h-auto text-gray-800">
            <div
              className="flex w-full flex-wrap h-full  "
            >
              <div className="xl: w-full overflow-x-auto  lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 p-6">

                <div claassName="flex flex-row  lg:justify-start">
                  <p className="text-lg mb-6 mr-4 font-semibold" data-translate="hi">Your Posted Projects</p>
                </div>

                <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 5 }} />
              </div>
            </div>
          </div>
        </section>
      

       

    </>
  )
}

export default Company_Dashboard