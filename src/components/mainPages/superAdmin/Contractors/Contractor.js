import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as ContractorServices from '../../../../services/contractor'
import { Space, Tag,Table } from 'antd';
// import Table from 'ant-responsive-table'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Contractor = () => {
    const navigator = useNavigate()
    const dispatch = useDispatch()

    const [tableData, setTableData] = useState([])
    const data = [];
    useEffect(() => {
        dispatch(ContractorServices.get_contractor()).then((res) => {

            var work_segment = []
            res.map((tableData, index) => {
                tableData.work_area.map((segment) => {
                    work_segment.push(segment.work_segment)
                })
                data.push({
                    '_id': tableData._id,
                    'key': index,
                    'entity': tableData.entity,
                    'username': tableData.username,
                    'number': tableData.user_id?.number.toString(),
                    'email': tableData.user_id?.email
                })
            })
            console.log({ data })
            setTableData(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    function deleteHandler(id) {
        dispatch(ContractorServices.remove_contractor(id)).then((res) => {
window.location = '/admin/contractors-list'
        })
    }

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (text) => <Link>{text + 1}</Link>,
            
        },
        {
            title: 'Name of Contractor',
            dataIndex: 'entity',
            key: 'entity',
            render: (text) => <Link>{text}</Link>,
            
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
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to='/admin/edit-contractors' state={{ _id: record?._id }}>Edit </Link>
                    <Link onClick={() => deleteHandler(record?._id)}>Delete</Link>
                </Space>
            ),
            
        },
    ];

    return (
        <section className="min-h-screen flex  flex-col w-full  py-6 sm:px-6 lg:px-3" >
            <div className="px-2 h-auto text-gray-800">
                <div
                    className="flex w-full  flex-wrap h-full g-6 "
                >
                    <div className="xl: w-full overflow-x-scroll   lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                        <button
                            onClick={() => navigator('/contractor-form')}
                            className="primary_btn mb-3"
                        >
                            Add New Contractor </button>
                        <div className="flex flex-row items-center justify-center lg:justify-start">
                            <p className="text-lg mb-0 mr-4">Contractors List</p>
                        </div>
                      
                        <Table 
                            
                            columns={columns}
                            dataSource= {tableData}
                            pagination ={{pageSize: 5}}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contractor