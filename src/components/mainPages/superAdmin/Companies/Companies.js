import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as ContractorServices from '../../../../services/contractor'
import { Space, Tag } from 'antd';
import Table from 'ant-responsive-table'
import { Link, useNavigate } from 'react-router-dom';
import { get_Vendor } from '../../../../services/Vendor';
const Companies = () => {
    const dispatch = useDispatch([])
    const navigator = useNavigate()
    const data = []

    const [tableData, setTableData] = useState([])
    useEffect(() => {
        dispatch(get_Vendor()).then((res) => {
            res.map((tableData, index) => {
                console.log(tableData);
                if (tableData != undefined) {
                    data.push({
                        '_id': tableData._id,
                        'key': index,
                        'entity': tableData.agency_name,
                        'username': tableData.contact_person,
                        'number': tableData.user_id?.number.toString(),
                        'email': tableData.user_id.email
                    })
                }
            })
            setTableData(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (text) => <Link>{text + 1}</Link>,
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Name of Contractor',
            dataIndex: 'entity',
            key: 'entity',
            render: (text) => <Link>{text}</Link>,
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Contact Person',
            dataIndex: 'username',
            key: 'username',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Email ID',
            dataIndex: 'email',
            key: 'email',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Mobile Number',
            dataIndex: 'number',
            key: 'number',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                console.log(_,record),
                <Space size="middle">
                    <Link to='/admin/edit-company' state={{ _id: record?._id }}>Edit </Link>
                    <Link>Delete</Link>
                </Space>
            ),
            showOnResponse: true,
            showOnDesktop: true
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
                            onClick={() => navigator('/vendor-form')}
                            className="inline-block mb-5 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            Add New User </button>
                        <div className="flex flex-row items-center justify-center lg:justify-start">
                            <p className="text-lg mb-0 mr-4">Companies List</p>
                        </div>
                        <Table antTableProps={{
                            showHeader: true,
                            columns: columns,
                            dataSource: tableData,
                            pagination: true
                        }} mobileBreakPoint={768} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Companies