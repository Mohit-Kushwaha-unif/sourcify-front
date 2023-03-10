import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { get_listing } from '../../../../../services/listing';

const Moderation_listings = () => {
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [formData, setFormData] = useState([])
    const [tableData, setTableData] = useState([])
    var data = []
    useEffect(() => {
        dispatch(get_listing()).then((res) => {
            console.log(res);
            res = res.reverse()
            res.map((tableData, index) => {
                if(tableData.status==0)
               { data.push({
                    '_id': tableData._id,
                    'key': index,
                    'entity': tableData.project_discription,
                    'work_segment': tableData.wok_segment,
                    'status': "Approved" 
                })}
            })
            console.log({ data })
            setTableData(data)
            setFormData(res)
            console.log(formData)
        })
    }, [])
    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (text) => <Link>{text + 1}</Link>,
        },
        {
            title: 'Project Discription',
            dataIndex: 'entity',
            key: 'entity',
            render: (text) => <Link>{text}</Link>,
        },
        {
            title: 'Work Segment',
            dataIndex: 'work_segment',
            key: 'work_segment',
            render: (_, { work_segment }) => (
                <>
                    {console.log(work_segment)}
                    {Array.isArray(work_segment) ? work_segment.map((tag, index) => {
                        console.log(work_segment)
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
            render: (text) => {return <Tag color="green">{text}</Tag>
            } 
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to='/edit-listing' state={{ _id: record._id }}>Edit </Link>
                    <Link>Delete</Link>
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
                <button
                    onClick={() => navigator('/dashboard/listing-form')}
                    className="inline-block mb-5 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    Add New Listing </button>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                    <p className="text-lg mb-0 mr-4">All Listings</p>
                </div>
                <Table columns={columns} dataSource={tableData} />
            </div>
        </div>
    </div>
</section>
  )
}

export default Moderation_listings