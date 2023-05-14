import { Card, Col, Row, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineMessage } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { get_contractor } from '../../../services/contractor'
import { get_listing, get_listingBy_id } from '../../../services/listing'
import Company_Dashboard from '../Company_Dashboard/Company_Dashboard'
import Meta from 'antd/es/card/Meta'

const Contractor_Dashboard = () => {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const [project, setProjects] = useState([])
  var data = []
  const [tableData, setTableData] = useState([])
  const [lisitngs, setAllLisitngs] = useState([])
  const [render, setRender] = useState(false)
  const [contractors, setContractors] = useState([])
  const [postedProjects, setPostedProjects] = useState(0)
  const [activeProjects, setActiveProjects] = useState(0)
  var count = 0
  function Company_Data(val) {
    console.log(val)

    val.map((details) => {
      if (details.status == 'Approved') {
        count = count + 1;
        // setActiveProjects((prevActiveProjects) => prevActiveProjects + 1);
      }

    })
    setActiveProjects(count);
    setPostedProjects(val.length)
    setRender(true)
  }
  console.log(activeProjects, postedProjects, tableData.length)
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigator('/login');
    }
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
      respnse.map((contact) => {
        if (contact.user_id?._id === localStorage.getItem('user_id')) {
          setContractors(contact)

          contact?.Applied.map((applied, index) => {

            if (applied.listing_id != null) {
              if (applied.status == 1) {
                setActiveProjects((prevActiveProjects) => prevActiveProjects + 1);
              }
              data.push({
                '_id': applied._id,
                'key': index,
                'scope': applied.listing_id.project_scope,
                'entity': applied.listing_id.project_discription,
                'work_segment': applied.listing_id.prefferd_state,
                'status': applied.status === 1 ? "Accepted" : applied.status === 0 ? "Pending Acceptence" : "Rejected",
                'listing_user_id': applied.listing_id.user_id,
                'listing_id': applied.listing_id._id
              })
            }
          })
        }
        setTableData(data)
        setRender(false)
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
  const columns = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'key',
      render: (_,text) =><Link to="/projectDetails"  state={  text.listing_id } >  {_+1}</Link> ,
    },
    {
      title: 'Project Name',
      dataIndex: 'entity',
      key: 'entity',
      render:(_,text) =><Link to="/projectDetails"  state={  text.listing_id } > {_}</Link> ,
    },
    {
      title: 'Scope',
      dataIndex: 'scope',
      key: 'scope',
      render: (text) => text,
    },
    {
      title: 'Project State',
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
        if (text === "Pending Acceptence") {
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
              Message
            </span>
          </div>
            : <Tag color={color}>{text}</Tag>}
        </>

      }
    },

  ];
  return (
    <>


      <div >

        <section className="container  min-h-auto flex flex-col w-full mb-6  pt-6 sm:px-6 " >
          <div className='grid grid-cols-1 md:gap-x-6  mb-5 md:grid-cols-3'>
            <Card title="Active Projects" bordered={false}>
              <div className='grid grid-cols-3 place-items-center'>
                <p className='col-span-1 mr-1 brand_text font_64 font_inter new_color'>{activeProjects}</p>
                <p className='col-span-2 text-lg' ><span data-translate="hi">Your Ongoing Projects are</span> {activeProjects}</p>
              </div>
            </Card>
      

            <Card title="Shown Interest " bordered={false}>
              <div className='grid grid-cols-3 place-items-center'>
                <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color' > {tableData.length}</p>
                <p className='col-span-2 text-lg' > <span  data-translate="hi">Projects in which you have shown intrest</span> {tableData.length} </p>
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
                <p className='col-span-1  mr-1 brand_text font_64 font_inter new_color'data-translate="hi"> {postedProjects + tableData.length}</p>
                <p className='col-span-2 text-lg'data-translate="hi"> Your Total Number of projects</p>
              </div>
               
            </Card> */}
          </div>
          <Company_Dashboard dataTransfer={Company_Data} />
          <div className=" h-auto text-gray-800 ">
            <div
              className="flex w-full flex-wrap h-full  "
            >
              <div className="xl: w-full overflow-x-auto  lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 p-6 rounded-xl">

                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-1 mr-4 font-semibold" data-translate="hi">Projects in which you have shown interests</p>
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