import { Input, Modal } from 'antd'
import React from 'react'
import { Form } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_contractor, search_contractor } from '../../../services/contractor'
import { List, Pagination, Card } from 'antd';
import dummy_img from '../../../assests/dummy_img.png'
import star from '../../../assests/star.png'
import right_red from '../../../assests/right_red.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import TextArea from 'antd/es/input/TextArea'
import { send_message } from '../../../services/Messages'

const FindContractor = () => {
  const [contractors, setContractors] = useState([])
  const [hireContractor, setHireContractor] = useState()
  const [screenSize, getDimension] = useState(window.innerWidth);
  const [column, setColumns] = useState(1)
  const [isCompany,setIsCompany] = useState(false)
  const [proposalVal, setProposalVal] = useState('')
  const userRole = useSelector(state => state.User.user_role);
  const [form] = Form.useForm();

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_contractor()).then((res) => {
      res.map((cont) => {
        setContractors(prev => [...prev, cont])
      })

    })
  }, [])
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  const setDimension = () => {
    getDimension(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    if (screenSize <= 759) {
      // setShowMenu(true)
      setColumns(1)
    } else {
      setColumns(3)
    }
  }, [screenSize])

  const handleFormChange = (values) => {
    const { contractor, Location, work_segment } = form.getFieldsValue();
    console.log(contractor, Location, work_segment,)
    var formData = new FormData()
    if (contractor != undefined) {
      formData.append("contractor", contractor)
    }
    if (Location != undefined) {
      formData.append("Location", Location)
    }
    if (work_segment != undefined) {
      formData.append("work_segment", work_segment)
    }

    dispatch(search_contractor(formData)).then((res) => {


      setContractors([...res])
    })
  }

  const contractHandler = (val) => {
    if (userRole !=1) {
      toast.error('You are not an Comapny', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
    else{
      setHireContractor(val)
      setIsCompany(true)
    }
  }
  const hideModal = () => {
    setIsCompany(false);
};
function submitHandler(event) {
  event.preventDefault();
  console.log("value")
  var obj = {}
  obj.from_id = localStorage.getItem("user_id")
  obj.to_id = hireContractor.user_id._id
  obj.message = proposalVal
  obj.isSeen = 0
  dispatch(send_message(obj)).then((res) => {
      console.log(res)
  })
}
function proposalHandler(e) {
  // console.log(e.target.value)
  setProposalVal(e.target.value)
}
  return (
    <div className='container grid grid-cols-1 md:grid-cols-7 md:gap-6 mb-16 mt-3'>
      <div className='col-span-2 h-[500px] w-full shadow-lg border-2 p-5' >
        <div className='relative '>
          <p className='headings font_18 mb-10 '>Hire Contractors</p>
          <div className='absolute mb-10 border-2  border-[#023047] top-[120%] left-0 right-[62%]'> </div>
        </div>
        <Form
          layout='vertical'
          form={form}
          onValuesChange={handleFormChange}
        >
          <Form.Item name="contractor" label="">
            <Input className='input_border mb-5' placeholder='Search for contractors' />
          </Form.Item>

          <Form.Item name="Location" label="Search Location">
            <Input className='input_border mb-5' placeholder='Search for contractors' />
          </Form.Item>

          <Form.Item name="work_segment" label="Select Work Segments">
            <Input className='input_border mb-5' placeholder='Search for contractors' />
          </Form.Item>

        </Form>
      </div>
      <div className='col-span-5 mt-5 md:mt-0'>
        <div className='border-2 overflow-y-scroll scrollbar shadow-sm p-3 mb-5 flex justify-between items-center'>
          <div className='flex-grow'>
            <p>{contractors.length} contractors found</p>
          </div>
          <div className='flex-shrink-0'>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={contractors.length}
              onChange={handlePageChange}
              style={{ textAlign: 'center' }}
            />
          </div>
        </div>


        <div>
          <List
            grid={{ gutter: 9, column: column }}
            dataSource={contractors.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            renderItem={item => (
              <List.Item >
                <div className='grid grid-cols-4 gap-2 w-full border-2 h-[300px] scrollbar  shadow-md p-4 py-6 overflow-auto'>
                  <div className='col-span-1 '>
                    <img src={dummy_img} className='rounded-[50px]' />
                  </div>
                  <div className='col-span-3'>
                    <div className='font-bold text-[18px]'> {item.username} </div>
                    <div className='text-[#808080] text-[16px]'>{item.City} , {item.State} </div>
                    <div className='flex'>
                      <span className='mr-1'><img src={star} /></span>
                      <span className='mr-1'><img src={star} /></span>
                      <span className='mr-1'><img src={star} /></span>
                      <span className='mr-1'><img src={star} /></span>
                    </div>
                  </div>
                  <div className='col-span-4 mt-2'>
                    <p className='font-[inter]'>
                      <span className='text-sm text-[#808080]'>Work Segments: </span>
                      <span>
                        {item.work_area.length > 0 && item.work_area.map((work, index) => {
                          if (index === item.work_area.length - 1) {
                            return <span key={work.work_segment}>{work.work_segment}</span>;
                          } else {
                            return <span key={work.work_segment}>{work.work_segment}, </span>;
                          }
                        })}
                      </span>
                    </p>
                  </div>
                  <div className='col-span-4 '>
                    <button onClick={() => { contractHandler(item) }} className='bg-[#023047] input_radius py-2 px-4 flex items-center'>
                      <span className='white_p mr-3 font_700'>Hire me</span>
                      <img src={right_red} />
                    </button>
                   
                  </div>
                </div>
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={contractors.length}
            onChange={handlePageChange}
            style={{ marginTop: '16px', textAlign: 'center' }}
          />
        </div>

        <ToastContainer/>

          <form onSubmit={submitHandler}>
          <Modal
          title="Send Message to Contractor"
          open={isCompany}
          onOk={submitHandler}
          onCancel={hideModal}
          bordered={false}
          footer={false}
      >
          <div className='mb-4'>
              <TextArea placeholder='Add Your Proposal' onChange={proposalHandler} value={proposalVal} name='proposal' className='w-full' />
          </div>
          <button
              type="submit"
              className="primary_btn"
              onClick={submitHandler}
          >
              Send Proposal
          </button>
      </Modal>
      </form>
      </div>
    </div>
  )
}

export default FindContractor