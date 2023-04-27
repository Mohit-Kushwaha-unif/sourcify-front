import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as ContractorServices from '../../../../services/contractor'
import { Space, Tag, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { delete_category, get_category } from '../../../../services/category';
import Swal from 'sweetalert2';
// import Table from 'ant-responsive-table'
const Category = () => {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const [tableData, setTableData] = useState([])
  var data = []
  const populateChildren = (subCategories) => {
    return subCategories.map((subCategory, index) => {
      const { _id, name, description, children } = subCategory;
      const childrens = children && Array.isArray(children) && children.length > 0 ? populateChildren(children) : [];
      if (children.length > 0) {
        return {
          _id,
          key: `${_id}_${index}`,
          category: name,
          description,
          children:childrens,
        };
      }
      else {
        return {
          _id,
          key: `${_id}_${index}`,
          category: name,
          description,
        }
      }
    });
  };

  useEffect(() => {
    dispatch(get_category()).then((res) => {
      const data = res.map((table, index) => {
        const subCategories = table.children ? table.children : [];
        const children = populateChildren(subCategories);

        return {
          _id: table._id,
          key: index,
          category: table.name,
          description: table.description,
          children,
        };
      });

      setTableData(data);
    });
  }, []);
  console.log(tableData)
  const deleteHandler = (value) => {
    Swal.fire({
      title: 'Do you want to delete this Contractor?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
  }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
    dispatch((delete_category(value))).then((res) => {
      window.location = '/admin/category-list'
    })
      }})
  }

  const columns = [

    {
      title: 'Work Segment',
      dataIndex: 'category',
      key: 'category',
      render: (_, record) => <Link to='/admin/edit-categories' state={{ _id: record?._id }}>{record.category}</Link>,

    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to='/admin/edit-categories' state={{ _id: record?._id }}>Edit </Link>
          <Link onClick={() => deleteHandler(record._id)}>Delete</Link>
        </Space>
      ),

    },
  ]

  return (
    <section className="min-h-screen flex flex-col w-full  py-6 sm:px-6 lg:px-3" >
      <div className="px-2 h-auto text-gray-800">
        <div
          className="flex w-full  flex-wrap h-full g-6 "
        >
          <div className="xl: w-full overflow-x-scroll lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
            <button
              onClick={() => navigator('/admin/category-form')}
              className="primary_btn mb-3"
            >
              Add New  </button>
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="text-lg mb-0 mr-4">Work Segment List</p>
            </div>
            <Table columns={columns} dataSource={tableData} />

          </div>
        </div>
      </div>
    </section>
  )
}

export default Category