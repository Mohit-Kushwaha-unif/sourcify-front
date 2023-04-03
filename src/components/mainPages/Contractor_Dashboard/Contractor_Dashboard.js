import { Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineMessage } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { get_contractor } from '../../../services/contractor'
import { get_listing, get_listingBy_id } from '../../../services/listing'

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
    dispatch(get_contractor()).then((respnse) => {
      setContractors(respnse)
      // if(res._id === formValues.vendorDetail._id){
      respnse.map((contact) => {
        if (contact.user_id?._id === localStorage.getItem('user_id')) {
          setContractors(contact)

          contact?.Applied.map((applied, index) => {

            if (applied.listing_id != null) {
              console.log({ applied })
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
    console.log(contractors)
    contractors?.Applied.map((contDet) => {
      if (contDet._id == data._id) {
        console.log(contDet)
        dispatch(get_listingBy_id(contDet.listing_id._id)).then((res) => {
          console.log(res)
          navigator('/messages', { state: { _id: res.listing.user_id } })
        })

      }
    })
  }

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
        <section className="min-h-auto flex flex-col w-full mb-6  pt-6 sm:px-6 " >
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

        <div className='ml-6 font-semibold'>Projects you might Like to work on </div>
        <div className='grid grid-cols-6'>

          <div className='p-6 col-span-5'><div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
              lisitngs.length > 0 && lisitngs.map((res) => {
                // console.log(res)
                return <div className='grid grid-cols-2 rounded-lg border-2 h-auto  '>
                  {/* <div className=' '>
                    <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="User image" class="w-full h-60" />

                  </div> */}
                  <div class="relative w-full font-semibold col-span-2 p-4 h-auto text-xl">
                    <h2 class="font-semibold  mt-4 overflow-hidden text-ellipsis  truncate"><span>Project Description</span> <span className='overflow-hidden text-ellipsis text-[#FF5757] truncate'> {res.project_discription}</span></h2>
                    <p class="font-semibold  mt-4 overflow-hidden text-ellipsis  truncate"><span>Project scope</span><span className='max-w-2xl overflow-hidden text-ellipsis text-[#FF5757] truncate"'> {res.project_scope }</span></p>
                    <div class="mt-4 flex items-center">
                      <div class=" wrap  pt-4 pb-2">
                      <h3 className=' mb-2'>Working Sectors</h3>
                        {
                          res.wok_segment.map((work) => {
                            return <span class="inline-block wrap bg-[#FF5757] rounded-full px-3  text-sm font-semibold text-[#ffffff] py-2 mr-2 mb-2">{work}</span>
                          })
                        }
                      </div>

                    </div>

                    <button
                      type="submit"
                      onClick={() => projectHandler(res._id)}
                      className="md:absolute right-1 bottom-0 primary_btn mb-3 mr-3"
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