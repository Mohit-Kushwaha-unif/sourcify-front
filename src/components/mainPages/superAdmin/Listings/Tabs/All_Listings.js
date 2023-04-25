import { Space,  Tag,Table, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { get_listing } from '../../../../../services/listing'
// import Table from 'ant-responsive-table'
const All_Listings = () => {
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [entity, setEntity] = useState([])
    const [tableData, setTableData] = useState([])
    var data = []
    useEffect(() => {
        dispatch(get_listing()).then((res) => {
            console.log(res);
            res = res.reverse()
            var dataTable = []
            res.map((tableData, index) => {
                var dataText = {}
                dataText.text = tableData.wok_segment
                dataText.value = tableData.wok_segment
                dataTable.push(dataText)
                data.push({
                    '_id': tableData._id,
                    'key': index,
                    'entity': tableData.project_discription,
                    'work_segment': tableData.wok_segment,
                    'status': tableData.status ===1 ? "Moderation" : tableData.status ===0 ? "Approved": "Rejected"
                })
            })
            console.log({ data })
            setEntity( [...dataTable])
            setTableData(data)
        })
    }, [])
    console.log(entity)
    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (text) => <p>{text + 1}</p>,
            sorter: (a, b) => a.key - b.key,
            sortDirections:  ['ascend','descend'],
        },
        {
            title: 'Project Description',
            dataIndex: 'entity',
            key: 'entity',
            render: (_, record) => <Link to='/edit-listing' state={{ _id: record?._id }}>{record.entity}</Link>,
            sorter: (a, b) => a.entity.length - b.entity.length,
            sortDirections: ['ascend','descend'],
        },
        {
            title: 'Work Segment',
            dataIndex: 'work_segment',
            key: 'work_segment',
            render: (_,  work_segment ) => (
                <>
                    {console.log(work_segment)}
                    {Array.isArray(work_segment?.work_segment) ? work_segment?.work_segment.map((tag, index) => {
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
            filters: [
                {
                    text: "Approved",
                    value: "Approved"
                },
                {
                    text: "Moderation",
                    value: "Moderation"
                },
                {
                    text: "Rejected",
                    value: "Rejected"
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.status.includes(value),
     
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                console.log(record),
                <Space size="middle">
                    <Link to='/edit-listing' state={{ _id: record?._id }}>Edit </Link>
                    {record?.status ==='Approved'&& <Link to='/viewForm' state={{ _id: record?._id }}>View </Link>}
                    <Link>Delete</Link>
                    <Link></Link>
                </Space>
                
            ),
            showOnResponse: true,
            showOnDesktop: true
        },
    ];
    const search = value => {
        
        console.log("PASS", { value ,tableData});
    
        const filterTable = tableData.filter(o =>
          Object.keys(o).some(k =>
            String(o[k])
              .toLowerCase()
              .includes(value.toLowerCase())
          )
        );
    
        setTableData(filterTable );
      };
    return (
        <section className="min-h-screen flex flex-col w-full  py-6 sm:px-6 lg:px-3" >
            <div className="px-2 h-auto text-gray-800">
                <div
                    className="flex w-full  flex-wrap h-full g-6 "
                >
                    <div className="xl: w-full overflow-x-auto lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                        <button
                            onClick={() => navigator('/dashboard/listing-form')}
                            className="primary_btn mb-5"
                        >
                            Add New Listing </button>
                        <div className="flex flex-row items-center justify-center lg:justify-start">
                            <p className="text-lg mb-0 mr-4">All Listings</p>
                        </div>
                        <p className='flex mb-6 items-baseline flex-col  md:flex-row'>
                           <span className='my-6 md:mb-0'> Search in the table - </span>

                        <Input.Search
                            className='md:w-[30%] mx-8'
                            placeholder="Search by..."
                            onSearch={search}
                        />
                        </p>
                        
                        <Table 
                            columns={columns}
                            dataSource={ tableData}
                            pagination={{pageSize:5}}
                            // pagination:{{ "pageSize": 10 }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default All_Listings