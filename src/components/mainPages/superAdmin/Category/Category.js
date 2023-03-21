import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as ContractorServices from '../../../../services/contractor'
import { Space,  Tag } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { delete_category, get_category } from '../../../../services/category';
import Table from 'ant-responsive-table'
const Category = () => {
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const [tableData, setTableData] = useState([])
    var data = []
    useEffect(()=>{
        dispatch(get_category()).then((res) => {
            res.map((table,index)=>{
                var sub_cat =  table.sub_category ? table.sub_category:"N/A"
              
                data.push({
                    '_id': table._id,
                    'key': index,
                    'category': table.category,
                    'sub_category':sub_cat,
                })
               
            })
            
           setTableData(data)
        })    
    },[])
    const deleteHandler=(value,)=>{

        dispatch((delete_category({heading:value.category}))).then((res)=>{
    
        })
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
            title: 'Name of Category',
            dataIndex: 'category',
            key: 'category',
            render: (text) => <Link>{text}</Link>,
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Name of Sub Category',
            key: 'sub_category',
            dataIndex: 'sub_category',
            
            render: (_,  sub_category ) => (
              <>
              {console.log(sub_category)}
                {Array.isArray(sub_category?.sub_category)? sub_category?.sub_category.map((tag,index) => {
                  let color = tag.length > 5 ? 'geekblue' : 'green';
                  if (tag === 'loser') {
                    color = 'volcano';
                  }
                  return (
                    <Tag  key={index}>
                      {tag.sub_Category}
                    </Tag>
                    
                  );
                }): sub_category?.sub_category}
              </>
            ),
           
            showOnDesktop: true
          },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to='/admin/edit-categories' state={{_id:record?._id}}>Edit </Link>
                    <Link onClick={()=>deleteHandler(record)}>Delete</Link>
                </Space>
            ),
            showOnResponse: true,
            showOnDesktop: true
        },
    ]

    return (
        <section className="min-h-screen flex flex-col w-full  py-6 sm:px-6 lg:px-3" >
            <div className="px-2 h-auto text-gray-800">
                <div
                    className="flex w-full  flex-wrap h-full g-6 "
                >
                    <div className="xl: w-full  lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                        <button
                            onClick={() => navigator('/admin/category-form')}
                            className="primary_btn mb-3"
                        >
                            Add New Category </button>
                        <div className="flex flex-row items-center justify-center lg:justify-start">
                            <p className="text-lg mb-0 mr-4">Work Segment List</p>
                        </div>
                        {/* <Table columns={columns} dataSource={tableData} /> */}
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

export default Category