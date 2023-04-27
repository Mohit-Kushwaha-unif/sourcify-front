import { Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineMessage } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { get_contractor } from '../../../services/contractor'
import { get_listing, get_listingBy_id } from '../../../services/listing'
import Company_Dashboard from '../Company_Dashboard/Company_Dashboard'
import { get_Vendor } from '../../../services/Vendor'

const Contractor_Dashboard = () => {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [project, setProjects] = useState([])
  var data = []
  const [tableData, setTableData] = useState([])
  const [lisitngs, setAllLisitngs] = useState([])
  const [contractors, setContractors] = useState([])
  useEffect(() => {
    dispatch(get_listing(location?.state)).then((res) => {
      var data = []

      res.map((list_details) => {
        if (list_details.status == 0 && list_details.form_status === 0) {
          data.push(list_details)
        }
      })
      setAllLisitngs(data)
    })
    dispatch(get_Vendor()).then((respnse) => {
      setContractors(respnse)
      // if(res._id === formValues.vendorDetail._id){
      respnse.map((contact) => {
        if (contact.user_id?._id === localStorage.getItem('user_id')) {
          setContractors(contact)

          contact?.Applied.map((applied, index) => {

            if (applied.listing_id != null) {
                console.log(applied)
              data.push({
                '_id': applied._id,
                'key': index,
                'scope': applied.listing_id.project_scope,
                'entity': applied.listing_id.project_discription,
                'work_segment': applied.listing_id.prefferd_state,
                'status': applied.status === 1 ? "Accepted" : applied.status === 0 ? "Waiting" : "Rejected",
                'listing_user_id': applied.listing_id.user_id
              })
            }
          })
        }
        setTableData(data)
      })

      // }
    })
  }, [location])


  function msgNavigationHandler(data) {
    contractors?.Applied.map((contDet) => {
      if (contDet._id == data._id) {
   
        dispatch(get_listingBy_id(contDet.listing_id._id)).then((res) => {
         
          navigator('/messages', { state: { _id: res.listing.user_id } })
        })

      }
    })
  }

  const projectHandler = (id) => {
    navigator('/projectDetails', { state: id })
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
      title: 'Scope',
      dataIndex: 'scope',
      key: 'scope',
      render: (text) => text,
    },
    {
      title: 'Preffered States',
      dataIndex: 'work_segment',
      key: 'work_segment',
      render: (_, { work_segment }) => (
        <>
          {Array.isArray(work_segment) ? work_segment.map((tag, index) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }

            return (
              <Tag key={index}>
                {tag}
              </Tag>
            );
          }) : work_segment}
        </>
      ),

    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, data) => {

        let color = 'Green'
        if (text === "Waiting") {
          color = 'yellow'

        }
        if (text === "Accepted") {
          color = 'green'
        }
        if (text === "Rejected") {
          color = 'volcano'
        }
        return <>
          {text == "Accepted" ? <div className='flex'>
            <Tag color={color}>{text}</Tag>
            <span className='cursor-pointer' onClick={() => msgNavigationHandler(data)}>
              <AiOutlineMessage className='h-auto' />
            </span>
          </div>
            : <Tag color={color}>{text}</Tag>}
        </>

      }
    },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //         <Space size="middle">
    //             <Link to='/edit-listing' state={{ _id: record._id }}>Edit </Link>
    //             <Link>Delete</Link>
    //         </Space>
    //     ),
    // },
  ];
  return (
    <>
      <div>
        <section className="container min-h-auto flex flex-col w-full mb-6  pt-6 sm:px-6 " >
          <div className="px-2 h-auto text-gray-800">
            <div
              className="flex w-full flex-wrap h-full  "
            >
              <div className="xl: w-full overflow-x-auto  lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 p-6">

                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-1 mr-4 font-semibold">Your Previous Projects</p>
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

export default Contractor_Dashboard