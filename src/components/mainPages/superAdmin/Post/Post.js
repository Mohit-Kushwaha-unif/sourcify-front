import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Space,  Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../../../Helper/Loader';
import { DeletePost, getPost, publishPost } from '../../../../services/Post';
import sendSubscription from '../../../Helper/Client';
// import Table from 'ant-responsive-table'
const Post = () => {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const [tableData, setTableData] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    // Check if push notifications are supported by the browser
    if ("serviceWorker" in navigator && "PushManager" in window) {
      // Register a service worker to handle push notifications
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered");
  
          // Ask the user for permission to show push notifications
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: "BNPBTWqNtzXDXDNcfBOc3lqwIoal6rDOwbi7u8PrBSBuc8jLFBRCp1Pct4QNQU32G_yTioietd0HhTMRpehC_nE",
          });
        })
        .then((subscription) => {
          console.log("Subscribed to push notifications:", subscription);
  
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    } else {
      console.warn("Push notifications are not supported");
    }
  }, []);
  
  console.log("PushManager" in window);
  useEffect(() => {
    setLoading(true)
    dispatch(getPost()).then((res) => {
      setLoading(false)
      const data = res.map((table, index) => {
        return {
          _id: table._id,
          key: index,
          category: table.title,
          description: table.description,
        };
      });

      setTableData(data);
    });
  }, []);
  const deleteHandler = (value) => {
    Swal.fire({
      title: 'Do you want to delete this Contractor?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
  }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
    dispatch((DeletePost(value))).then((res) => {
      window.location = '/admin/category-list'
    })
      }})
  }
  function PublishHandler(id){
    sendSubscription(id,"Push Notifications", "Push notification successfully sent to the browser! Check it out!")
   
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
          <Link onClick={() => PublishHandler(record._id)}>Publish</Link>
        </Space>
      ),

    },
  ]

  return (
    <>
    {
      loading? <Loader/>
      :
      <section className="min-h-screen flex flex-col w-full  py-6 sm:px-6 lg:px-3" >
      <div className="px-2 h-auto text-gray-800">
        <div
          className="flex w-full  flex-wrap h-full g-6 "
        >
          <div className="xl: w-full overflow-x-scroll lg: w-full  md: w-full  mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
            
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="headings mb-3 mr-4">Post List</p>
            </div>
            <button
              onClick={() => navigator('/admin/post-form')}
              className="brand_button padding_6_9 mb-3"
            >
              Add New  </button>
            <Table columns={columns} dataSource={tableData} />

          </div>
        </div>
      </div>
    </section>
    }
    </>
    
  )
}

export default Post