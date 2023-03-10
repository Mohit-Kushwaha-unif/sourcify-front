import { Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { get_feedback } from '../../../../services/FeedBack'

const FeedBack = () => {
  const dispatch = useDispatch()
  const [tableData, setTableData] = useState([])
  const data = [];
  useEffect(()=>{
    dispatch(get_feedback()).then((res)=>{
        console.log(res)
        res.map((feedback,index)=>{
            data.push({
                "_id": feedback._id,
                'key' : index,
                'entity':feedback.fullname,
                'email': feedback.email,
                'number': feedback.mobile_number
            })
        })
        setTableData(data)
    })
  },[])
   
    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (text) => <Link>{text + 1}</Link>,
        },
        {
            title: 'Name of Sender',
            dataIndex: 'entity',
            key: 'entity',
            render: (text) => <Link>{text}</Link>,
        },
        {
            title: 'Email ID',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Mobile Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to='/admin/view-feedback' state={{_id:record._id}}>view </Link>
                    <Link >Delete</Link>
                </Space>
            ),
        },
    ];

  return (
    <section className="min-h-screen flex flex-col w-full  py-6 sm:px-6 lg:px-3" >
    <div className="px-2 h-auto text-gray-800">
        <div
            className="flex w-full  flex-wrap h-full g-6 "
        >
            <div className="xl: w-full  lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
          
                <div className="flex flex-row items-center justify-center lg:justify-start">
                    <p className="text-lg mb-0 mr-4 font-semibold">FeedBack List</p>
                </div>
                <Table columns={columns} dataSource={tableData} />
            </div>
        </div>
    </div>
</section>
  )
}

export default FeedBack