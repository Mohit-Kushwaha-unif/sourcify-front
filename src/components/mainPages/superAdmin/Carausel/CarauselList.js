import { Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { get_carausel } from '../../../../services/Carausle'

const CarauselList = () => {
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const [tableData, setTableData] = useState([])
    var data = []
    useEffect(()=>{
        dispatch(get_carausel()).then((res) => {
            res.map((table,index)=>{
                data.push({
                    '_id': table._id,
                    'key': index,
                    'legend': table.legend,
                    'legend_image':table.legend_image,
                })
               
            })
            
           setTableData(data)
        })    
    },[])
    console.log(tableData)
    const deleteHandler=(value,)=>{

        // dispatch((delete_category({heading:value.category}))).then((res)=>{
    
        // })
    }
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
            title: 'Legend',
            dataIndex: 'legend',
            key: 'legend',
            render: (text) => <Link>{text}</Link>,
            showOnResponse: true,
            showOnDesktop: true
        },
        
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to='/admin/edit-caraousel' state={{_id:record?._id}}>Edit </Link>
                    <Link onClick={()=>deleteHandler(record)}>Delete</Link>
                </Space>
            ),
            showOnResponse: true,
            showOnDesktop: true
        },
    ]
  return (
    <div className='w-full'> <section className="min-h-screen flex flex-col w-full  py-6 sm:px-6 lg:px-3" >
    <div className="px-2 h-auto text-gray-800 w-full">
        <div
            className="flex w-full  flex-wrap h-full g-6 "
        >
            <div className="xl: w-full  lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                <button
                    onClick={() => navigator('/admin/caraousel-form')}
                    className="inline-block mb-5 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    Add New Category </button>
                <div className="flex flex-row w-full items-center justify-center lg:justify-start">
                    <p className="text-lg mb-0 mr-4">Caraousel List</p>
                </div>
                <Table columns={columns} dataSource={tableData} />
                {/* <Table antTableProps={{
                    showHeader: true,
                    columns: columns,
                    dataSource: tableData,
                    pagination: true
                }} mobileBreakPoint={768} /> */}
            </div>
        </div>
    </div>
</section></div>
  )
}

export default CarauselList
