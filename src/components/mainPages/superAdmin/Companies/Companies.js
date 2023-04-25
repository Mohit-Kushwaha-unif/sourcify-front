import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as ContractorServices from '../../../../services/contractor'
import { Space, Tag, Table, Input } from 'antd';
// import Table from 'ant-responsive-table'
import { Link, useNavigate } from 'react-router-dom';
import { get_Vendor, remove_vendor } from '../../../../services/Vendor';
import { tab } from '@testing-library/user-event/dist/tab';
const Companies = () => {
    const dispatch = useDispatch([])
    const navigator = useNavigate()
    const data = []
    const [entity,setEntity] = useState([])
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        var tableDataFilter = []
        dispatch(get_Vendor()).then((res) => {
        
            res.map((tableData, index) => {
                console.log(tableData);
                

                if (tableData != undefined) {
                    var tableCont = {}
                    tableCont.text = tableData.agency_name
                    tableCont.value = tableData.agency_name
                    tableDataFilter.push(tableCont)
                    data.push({
                        '_id': tableData._id,
                        'key': index,
                        'entity': tableData.agency_name,
                        'username': tableData.contact_person,
                        'number': tableData.user_id?.number.toString(),
                        'email': tableData.user_id?.email,
                        'status': tableData.status === 1 ? 'Moderation' : tableData.status === 0 ? 'Approved' : 'Rejected'

                    })
                }
            })
            setEntity([...tableDataFilter])
            setTableData(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    const search = value => {
        const filterTable = tableData.filter(o =>
            Object.keys(o).some(k =>
                String(o[k])
                    .toLowerCase()
                    .includes(value.toLowerCase())
            )
        );

        setTableData(filterTable);
    };
    function deleteHandler(id) {
        dispatch(remove_vendor(id)).then((res)=>{
            window.location = '/admin/companies'
        })
    }
    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (text) => <p>{text + 1}</p>,
            sorter: (a, b) => a.key - b.key,
            sortDirections: ['descend'],
        },
        {
            title: 'Name of Contractor',
            dataIndex: 'entity',
            key: 'entity',
            render: (_, record) => (console.log(record), <Link to='/admin/edit-company' state={{ _id: record?._id }}>{record.entity}</Link>),
            filters: [
                ...entity
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.entity.includes(value),
        },
        {
            title: 'Contact Person',
            dataIndex: 'username',
            key: 'username',

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
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                console.log(_, record),
                <Space size="middle">
                    <Link to='/admin/edit-company' state={{ _id: record?._id }}>Edit </Link>
                    <Link onClick={() => deleteHandler(record?._id)}>Delete</Link>
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
                    <div className="xl: w-full overflow-x-scroll lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                        <button
                            onClick={() => navigator('/vendor-form')}
                            className="primary_btn mb-3"
                        >
                            Add New Company </button>
                        <div className="flex flex-row items-center justify-center lg:justify-start">
                            <p className="text-lg mb-0 mr-4">Companies List</p>
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
                            dataSource={tableData}
                            pagination={{ pageSize: 5 }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Companies