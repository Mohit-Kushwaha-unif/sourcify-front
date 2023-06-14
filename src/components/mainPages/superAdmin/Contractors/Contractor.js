import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as ContractorServices from '../../../../services/contractor'
import { Space, Tag, Table, Input, Card } from 'antd';
import "antd/dist/antd";
// import Table from 'ant-responsive-table'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../../../Helper/Loader';

const Contractor = () => {
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const [entity, setEntity] = useState([])
    const [totalContractor, setTotalContractor] = useState(0)
    const [tableData, setTableData] = useState([])
    const [reviewData,setReviewData] = useState([])
    const [approvedData,setApprovedData] = useState([])
    const [rejectedData,setRejectedData] = useState([])
    const [loading, setLoading] = useState(false)
    const data = [];
    useEffect(() => {
        setLoading(true)
        tableDataMaker()
        setLoading(false)
    }, [])

    const tableDataMaker = () => {
        dispatch(ContractorServices.get_contractor()).then((res) => {
            var work_segment = []
            var dataTable = []
            var tot_cont = []
            res.reverse().map((tableData, index) => {
                tableData.work_area.map((segment) => {
                    work_segment.push(segment.work_segment)
                })
                var dataText = {}
                dataText.text = tableData.entity
                dataText.value = tableData.entity
                dataTable.push(dataText)
                var exist =  tot_cont.find((val) => val === tableData.entity)
                if(exist === undefined ){
                    tot_cont.push(tableData.entity)
                }
                
                if (tableData.user_id) {
                    if(tableData.status === 1){  setReviewData((PREV)=>[...PREV, tableData]) }
                    if(tableData.status === 0){setApprovedData((PREV)=>[...PREV, tableData]) }
                    if(tableData.status === 2){setRejectedData((PREV)=>[...PREV, tableData]) }
                    data.push({
                        'user_id': tableData.user_id,
                        '_id': tableData._id,
                        'key': index,
                        'entity': tableData.entity,
                        'username': tableData.username,
                        'number': tableData.user_id?.number.toString(),
                        'email': tableData.user_id?.email,
                        'status': tableData.status === 1 ? 'Under Review' : tableData.status === 0 ? 'Approved' : 'Rejected'
                    })
                }
            })
            setTableData(data)
            setTotalContractor(tot_cont)
            setEntity(dataTable)
        }).catch((err) => {
            console.log(err)
        })
    }

    function deleteHandler(id) {
        Swal.fire({
            title: 'Do you want to delete this Contractor?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Cancel`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(ContractorServices.remove_contractor({ id: id })).then((res) => {
                    window.location = '/admin/contractors-list'

                })
            }
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
            render: (_, record) => (console.log(record), <Link to='/admin/edit-contractors' state={{ _id: record?._id }}>{record.entity}</Link>),
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
                if (text === "Under Review") {
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
                    text: "Under Review",
                    value: "Under Review"
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
            render: (text, data) => (
                <Space size="middle">
                    <Link to='/admin/edit-contractors' state={{ _id: data?._id }}>Edit </Link>
                    <Link to='/messages' state={{ _id: data?.user_id }}>Messages </Link>
                    <Link onClick={() => deleteHandler(data?._id)}>Delete</Link>
                </Space>
            ),

        },
    ];

    const search = value => {

        console.log("PASS", { value, tableData });

        const filterTable = tableData.filter(o =>
            Object.keys(o).some(k =>
                String(o[k])
                    .toLowerCase()
                    .includes(value.toLowerCase())
            )
        );

        setTableData(filterTable);
        if (value == '') {
            tableDataMaker()
        }
    };
    return (
        <>
            {
                loading ?
                    <Loader /> :
                    <section className="min-h-screen flex  flex-col w-full  py-6 sm:px-6 lg:px-3" >
                        <div className="px-2 h-auto text-gray-800">
                            <div
                                className="flex w-full  flex-wrap h-full g-6 "
                            >
                                <div className="xl: w-full overflow-x-scroll   lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">

                                    <div className="flex flex-row items-center justify-center lg:justify-start">
                                        <p className="headings mb-3">Contractors </p>
                                    </div>
                                    <div className='flex md:flex-row flex-col justify-between'>
                                        <button
                                            onClick={() => navigator('/contractor-form')}
                                            className="brand_button font_400 px-2 padding_6_9 mb-3"
                                        >
                                            Add New Contractor </button>
                                        <p className='w-[40%]'>


                                            <Input.Search
                                                className='w-full '
                                                placeholder="Search by..."
                                                onSearch={search}
                                            />
                                        </p>
                                    </div>
                                    <div className='grid grid-cols-1 text-center gap-6 md:grid-cols-4'>
                                    <Card className='bg-gray-200 h-[50px] cursor-pointer shadow-md border-2 border-solid mb-5' title={`Total ${totalContractor.length} `} bordered={false}>
                                       
                                    </Card>
                                    <Card className='bg-gray-200 h-[50px] cursor-pointer shadow-md border-2 border-solid mb-5' title={`Active ${approvedData.length}`}  bordered={false}>
                                    </Card>
                                    <Card className='bg-gray-200 h-[50px] cursor-pointer shadow-md border-2 border-solid mb-5' title={`Under Review  ${reviewData.length}`} bordered={false}>
                                    </Card>
                                    <Card className='bg-gray-200 h-[50px] cursor-pointer shadow-md border-2 border-solid mb-5' title={`Rejected  ${rejectedData.length}`} bordered={false}>
                                    </Card>
                                    </div>
                                    <Table

                                        columns={columns}
                                        dataSource={tableData}
                                        pagination={{ pageSize: 5 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
            }
        </>

    )
}

export default Contractor