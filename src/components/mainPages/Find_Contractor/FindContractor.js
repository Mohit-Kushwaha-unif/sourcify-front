import { Checkbox, Input, Modal, Select } from 'antd'
import React from 'react'
import { Form } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_contractor, search_contractor } from '../../../services/contractor'
import { List, Pagination } from 'antd';
import dummy_img from '../../../assests/dummy_img.png'
import star from '../../../assests/star.png'
import right_red from '../../../assests/right_red.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import TextArea from 'antd/es/input/TextArea'
import { send_message } from '../../../services/Messages'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Helper/Loader'
import { get_category } from '../../../services/category'
import state_cites from '../../../assests/state_city.'
import useDocumentTitle from '../../Helper/useDocumentTitle'

const FindContractor = () => {
  const [contractors, setContractors] = useState([])
  const [hireContractor, setHireContractor] = useState()
  const [screenSize, getDimension] = useState(window.innerWidth);
  const [column, setColumns] = useState(1)
  const [isCompany, setIsCompany] = useState(false)
  const [proposalVal, setProposalVal] = useState('')
  const [loading, setLoading] = useState(true)
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedItems, setSelectedItems] = useState([]);
  const [sub_cat, setSubCat] = useState([])
  const [work_segment, set_work_segment] = useState([])
  const WORK_SEGMENT = useSelector(state => state.User.Work_segment)
  useEffect(() => {
    dispatch(get_contractor()).then((res) => {
      res.map((cont) => {
        setContractors(prev => [...prev, cont])
        setLoading(false)
      })

    })
    if (WORK_SEGMENT != undefined && WORK_SEGMENT.length > 0) {
      setSubCat((prev_state) => [...prev_state, WORK_SEGMENT]);
      set_work_segment([...WORK_SEGMENT])

    }
    else {
      dispatch(get_category()).then((res) => {
        setSubCat((prev_state) => [...prev_state, res]);
        set_work_segment([...res])
      })
    }
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

  const handleFormChange = () => {
    const { contractor, Location, work_segment,work_area_type } = form.getFieldsValue();
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
    if (work_area_type != undefined) {
      formData.append("work_area_type", work_area_type)
    }
    
    dispatch(search_contractor(formData)).then((res) => {


      setContractors([...res])
    })
  }

  const contractHandler = (val) => {
    console.log(val.user_id)
    if (localStorage.getItem("isLoggedIn") == "false") {
      navigate('/login')
    }
    else if (localStorage.getItem("user_id") == val.user_id._id || localStorage.getItem("user_id") == val.user_id) {
      toast.error('It is your profile only', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
    else if (localStorage.getItem('status') != 0) {
      toast.error('Account is not approved by admin', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
    else {
      setHireContractor(val)
      setIsCompany(true)
    }
  }
  const hideModal = () => {
    setIsCompany(false);
  };
  function submitHandler(event) {
    event.preventDefault();
    var obj = {}
    obj.from_id = localStorage.getItem("user_id")
    obj.to_id = hireContractor.user_id._id
    obj.message = proposalVal
    obj.isSeen = 0
    dispatch(send_message(obj)).then((res) => {
      console.log(res)
      hideModal()
    })
  }
  function proposalHandler(e) {
    setProposalVal(e.target.value)
  }
  useDocumentTitle('Find Contractor')
  return (
    <>
      {
        loading ?
          <Loader /> :
          <div className='container grid grid-cols-1 md:grid-cols-7 md:gap-6 mb-16 mt-3'>
            <div className='col-span-2 h-[500px] w-full shadow-lg border-2 p-5' >
              <div className='relative '>
                <p className='headings font_18 mb-10 '><span data-translate="hi">Hire Contractors</span></p>
                <div className='absolute mb-10 border-2  border-[#023047] top-[120%] left-0 right-[62%]' data-translate="hi"> </div>
              </div>
              <Form
                layout='vertical'
                form={form}
                onValuesChange={handleFormChange}
                
              >
                <Form.Item name="contractor" label="">
                  <Input data-translate="hi" className=' mb-5' placeholder='Search for contractors' />
                </Form.Item>

                <Form.Item name="Location" label="Search Location">
                                <Select className=' mb-5' data-translate="hi" placeholder='Add Location' >
                                    {Object.keys(state_cites).map((state) => {
                                        return (<Select.Option data-translate="hi" value={state}>{state}</Select.Option>)
                                    }
                                    )}
                                </Select>
                            </Form.Item>

                <Form.Item name="work_segment" label="Select Work Segments">
                  <Select placeholder="select work segments" data-translate="hi" onChange={setSelectedItems} >
                    {
                      work_segment.length > 0 && work_segment.map((cats) => {
                        return (<Select.Option value={cats.name}>{cats.name}</Select.Option>)
                      })
                    }
                  </Select>
                
                </Form.Item>
                <p className='font-[inter]'>
                    {selectedItems.length > 0 &&
                      sub_cat[0].map((sub_category) => {

                        return selectedItems === sub_category.name && sub_category.name != 'N/A' && <>
                          <Form.Item name="work_area_type" className="my-3" label={`Select Sub Category For ${selectedItems}`} >
                            <Select>
                              {sub_category.children.map((item, index) => {

                                return (
                                  <Select.Option
                                    key={item.sub_Category}
                                    className={`ml-${index === 0 ? 2 : 0} `}
                                    value={item.name}
                                  >
                                    <span>{item.name}</span>
                                  </Select.Option>
                                );
                              })}
                             
                            </Select>
                           

                          </Form.Item>
                        </>


                      })

                    }
                  </p>
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
                            <span className='white_p mr-3 font_700'>Contact</span>
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

              <ToastContainer />

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
                    <TextArea placeholder='Send message' onChange={proposalHandler} value={proposalVal} name='proposal' className='w-full' />
                  </div>
                  <button
                    type="submit"
                    className="primary_btn"
                    onClick={submitHandler}
                  >
                    Send
                  </button>
                </Modal>
              </form>
            </div>
          </div>
      }
    </>

  )
}

export default FindContractor