import { Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineMessage } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { get_contractor } from '../../../services/contractor'
import { get_listing } from '../../../services/listing'

const Contractor_Dashboard = () => {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [project, setProjects] = useState([])
  var data = []
  const [tableData, setTableData] = useState([])
  const [lisitngs, setAllLisitngs] = useState([])
  const [filterCategory, setFilterCategory] = useState([])
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
    dispatch(get_contractor()).then((respnse) => {
      // if(res._id === formValues.vendorDetail._id){
      respnse.map((contact) => {
        if (contact.user_id._id === localStorage.getItem('user_id')) {
          //  console.log(contact)
          contact?.Applied.map((applied, index) => {
           
            if (applied.listing_id != null) {
              console.log({ applied })
              data.push({
                '_id': applied._id,
                'key': index,
                'scope': applied.listing_id.project_scope,
                'entity': applied.proposal,
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
  const projectHandler = (id) => {
    navigator('/projectDetails', { state: id })
  }
  // console.log({tableData})
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
            // console.log({ work_segment })
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
            <span className='cursor-pointer' onClick={() => navigator('/messages', { state: { _id: data } })}>
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
        <section className="min-h-auto flex flex-col w-full mb-6  pt-6 sm:px-6 " >
          <div className="px-2 h-auto text-gray-800">
            <div
              className="flex w-full flex-wrap h-full  "
            >
              <div className="xl: w-full  lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">

                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-1 mr-4 font-semibold">Your Previous Projects</p>
                </div>
                <Table columns={columns} dataSource={tableData} pagination={{pageSize:5}} />
              </div>
            </div>
          </div>
        </section>

        <div className='ml-6 font-semibold'>Projects you might Like to work on </div>
        <div className='grid grid-cols-6'>

          <div className='p-6 col-span-5'><div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
              lisitngs.length > 0 && lisitngs.map((res) => {
                // console.log(res)
                return <div className='grid grid-cols-3 rounded-lg border-2 min-h-60  max-h-60 rounded-[25px] shadow-gray-50  '>
                  <div className=' '>
                    <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="User image" class="w-full h-60" />

                  </div>
                  <div class="relative bg-white w-full col-span-2 shadow p-4 h-60">
                    <h2 class="text-lg font-medium mt-4">{res.project_discription}</h2>
                    <p class="text-gray-600">{res.project_scope}</p>
                    <div class="mt-4 flex items-center">
                      <div class=" wrap md:px-6 pt-4 pb-2">
                        {
                          res.wok_segment.map((work) => {
                            return <span class="inline-block wrap bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{work}</span>
                          })
                        }
                      </div>

                    </div>

                    <button
                      type="submit"
                      onClick={() => projectHandler(res._id)}
                      className="absolute right-1 bottom-0 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      View Details
                    </button>


                  </div>
                </div>
              })
            }

          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contractor_Dashboard