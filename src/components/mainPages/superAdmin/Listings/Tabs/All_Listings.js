import { Space, Tag, Table, Input, Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { get_category } from '../../../../../services/category'
import { get_listing, remove_listing } from '../../../../../services/listing'
import Loader from '../../../../Helper/Loader'
const All_Listings = () => {
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [entity, setEntity] = useState([])
    const [tableData, setTableData] = useState([])
    var [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [reviewData, setReviewData] = useState([])
    const [approvedData, setApprovedData] = useState([])
    const [rejectedData, setRejectedData] = useState([])
    var data = []
    var catData = []
    useEffect(() => {
        tableDataMaker()
        setLoading(false)
        dispatch(get_category()).then((res) => {
            res.map((cat) => {
                var dataa = {}
                dataa["text"] = cat.name
                dataa["value"] = cat.name
                catData.push(dataa)
            })
            setCategories([...catData])

        })

    }, [])

    const tableDataMaker = () => {
        dispatch(get_listing()).then((res) => {
            res = res.reverse()
            var dataTable = []
            res.map((tableData, index) => {
                var dataText = {}
                dataText.text = tableData.wok_segment
                dataText.value = tableData.wok_segment
                dataTable.push(dataText)
                if (tableData.status === 1) { setReviewData((PREV) => [...PREV, tableData]) }
                if (tableData.status === 0) { setApprovedData((PREV) => [...PREV, tableData]) }
                if (tableData.status === 2) { setRejectedData((PREV) => [...PREV, tableData]) }

                data.push({
                    '_id': tableData._id,
                    'key': index,
                    'entity': tableData.project_discription,
                    'work_segment': tableData.wok_segment,
                    'status': tableData.status === 1 ? "Under Review" : tableData.status === 0 ? "Approved" : "Rejected"
                })
            })
            setEntity([...dataTable])
            setTableData(data)
        })
    }



    function deleteHandler(id) {
        Swal.fire({
            title: 'Do you want to delete this Project?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Cancel`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var formdata = new FormData()
                formdata.append("listing_id", id)
                dispatch(remove_listing(formdata)).then((res) => {
                    Swal.fire('Deleted!', '', 'success').then(() => {
                        window.location = '/admin/all-listing'
                    })
                })

            } else if (result.isDenied) {
                Swal.fire('Not Deleted', '', 'info')
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
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Project Description',
            dataIndex: 'entity',
            key: 'entity',
            render: (_, record) => <Link to='/edit-listing' state={{ _id: record?._id }}>{record.entity}</Link>,
            sorter: (a, b) => a.entity.length - b.entity.length,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Work Segment',
            dataIndex: 'work_segment',
            key: 'work_segment',
            render: (_, work_segment) => (
                <>
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
            filters: [
                ...categories
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.work_segment.find((val) => val == value),
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

            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to='/edit-listing' state={{ _id: record?._id }}>Edit </Link>
                    {record?.status === 'Approved' && <Link to='/viewForm' state={{ _id: record?._id }}>View </Link>}
                    <Link onClick={() => deleteHandler(record?._id)}>Delete</Link>
                    <Link></Link>
                </Space>

            ),
            showOnResponse: true,
            showOnDesktop: true
        },
    ];
    const search = value => {
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
                loading ? <Loader /> :
                    <section className="min-h-screen flex flex-col w-full  py-6 sm:px-6 lg:px-3" >
                        <div className="px-2 h-auto text-gray-800">
                            <div
                                className="flex w-full  flex-wrap h-full g-6 "
                            >
                                <div className="xl: w-full overflow-x-auto lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">

                                    <div className="flex flex-row items-center justify-center lg:justify-start">
                                        <p className="headings mb-3 mr-4">All Projects</p>
                                    </div>
                                    <div className='flex md:flex-row flex-col justify-between'>
                                        <button
                                            onClick={() => navigator('/dashboard/listing-form')}
                                            className="brand_button font_400 padding_6_9 mb-5"
                                        >
                                            Add New Project </button>
                                        <p className='w-[40%]'>


                                            <Input.Search
                                                className='w-full '
                                                placeholder="Search by..."
                                                onSearch={search}
                                            />
                                        </p>
                                    </div>
                                    <div className='grid grid-cols-1 text-center gap-6 md:grid-cols-4'>
                                        <Card className='bg-gray-200 h-[50px] cursor-pointer shadow-md border-2 border-solid mb-5' title={`Total ${tableData.length} `} bordered={false}>

                                        </Card>
                                        <Card className='bg-gray-200 h-[50px] cursor-pointer shadow-md border-2 border-solid mb-5' title={`Active ${approvedData.length}`} bordered={false}>
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

export default All_Listings