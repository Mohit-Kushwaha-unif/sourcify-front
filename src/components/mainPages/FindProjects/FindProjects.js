import { Form, Input, Modal, Pagination, Select } from 'antd'
import React, { useLayoutEffect } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_listing, get_listingBy_id, search_listing, update_listing } from '../../../services/listing'
import state_cites from '../../../assests/state_city.'
import moment from 'moment'
import { get_category } from '../../../services/category'
import { get_Vendor } from '../../../services/Vendor'
import { useForm } from 'antd/es/form/Form'
import { useNavigate } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'
import { toast, ToastContainer } from 'react-toastify'
import { get_contractor } from '../../../services/contractor'
const FindProjects = () => {
    const [projects, setProjects] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [work_segment, set_work_segment] = useState([])
    var [projectDetails, setProjectDetails] = useState([])
    const navigate = useNavigate()
    const userRole = useSelector(state => state.User.user_role);
    const [pageSize, setPageSize] = useState(3);
    const [isCompany, setIsCompany] = useState(false)
    const dispatch = useDispatch()
    const [listID, setListId] = useState()
    const [isSearch, setIsSearch] = useState(false)
    const [proposalVal, setProposalVal] = useState('')
    const [form] = Form.useForm();
    useEffect(() => {
        if (isSearch !== true) {
            dispatch(get_listing()).then((res) => {
                const filteredProjects = res.filter((proj_det) => {
                    if (proj_det.status === 0) {
                        const hasContractStatus1 = proj_det.proposals.some((proposal_Status) => {
                            return proposal_Status.contract_status === 1
                        })
                        return !hasContractStatus1
                    }
                    return false
                })


                setProjects(filteredProjects)
                setIsSearch(true)
            })

            dispatch(get_category()).then((res) => {
                set_work_segment([...res])
            })
        }
    }, [])
    console.log(projects)
    // 
    useLayoutEffect(() => {
        const projDet = [];
        dispatch(get_Vendor()).then((res) => {
            res.filter((vendor_det) => {

                if (vendor_det.user_id !== null) {
                    projects.find((pro_det) => {
                        if (vendor_det.user_id._id === pro_det.user_id) {
                            const obj = {};
                            obj["pro_details"] = pro_det;
                            obj["vendor_det"] = vendor_det;
                            projDet.push(obj);
                        }
                    });
                }
            });

        });
        dispatch(get_contractor()).then((res) => {
            res.filter((vendor_det) => {

                if (vendor_det.user_id !== null) {
                    projects.find((pro_det) => {
                        if (vendor_det.user_id._id === pro_det.user_id) {
                            const obj = {};
                            obj["pro_details"] = pro_det;
                            obj["vendor_det"] = vendor_det;
                            projDet.push(obj);
                        }
                    });
                }
            });
            console.log(projDet);
            setProjectDetails([...projDet]);
        });
        console.log(projDet);
        setProjectDetails([...projDet]);
    }, [projects, dispatch]);

    console.log({ projectDetails })
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };
    const handleFormChange = (values) => {
        const { Project_name, Location, work_Segments } = form.getFieldsValue();
        var formData = new FormData()
        if (Project_name != undefined) {
            formData.append("Project_name", Project_name)
        }
        if (Location != undefined) {
            formData.append("Location", Location)
        }
        if (work_Segments != undefined) {
            formData.append("work_Segments", work_Segments)
        }
        dispatch(search_listing(formData)).then((res) => {
            const filteredProjects = res.filter((proj_det) => {
                if (proj_det.status === 0) {
                    const hasContractStatus1 = proj_det.proposals.some((proposal_Status) => {
                        return proposal_Status.contract_status === 1
                    })
                    return !hasContractStatus1
                }
                return false
            })

            setProjects(filteredProjects)
        })
    }
    const projectHandler = (id) => {
        navigate('/projectDetails', { state: id })
    }
    const intresetHandler = (id) => {
        setListId(id)

        dispatch(get_listingBy_id(id)).then((res) => {

            res.listing.proposals.map((detail) => {
                if (detail.contractor_id != null && detail.contractor_id._id === localStorage.getItem('user_id')) {

                    toast.success('You already shared your intrest', {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
            })
        })
        if (localStorage.getItem("isLoggedIn") == false) {
            navigate('/login')
        }
        if (userRole == 1) {
            toast.error('You are not a sub-contractor', {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        else {
            setIsCompany(true)
        }
    }
    const hideModal = () => {
        setIsCompany(false);
    };
    function submitHandler(id) {
        // console.log(value)
        var formData = {}
        formData.contractor_id = localStorage.getItem('user_id')

        formData.listing_id = listID
        // formData.form_status = 1
        formData.proposal = proposalVal
        formData.contract_status = 0
        dispatch(update_listing(formData)).then((res) => {
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
                    <p className='headings font_18 mb-10 '>Find Projects</p>
                    <div className='absolute mb-10 border-2  border-[#023047] top-[120%] left-0 right-[62%]'> </div>
                </div>
                <Form
                    layout='vertical'
                    form={form}
                    onValuesChange={handleFormChange}
                >
                    <Form.Item name="Project_name" label="">
                        <Input className=' mb-5' placeholder='Search for projects' />
                    </Form.Item>

                    <Form.Item name="Location" label="Search Location">
                        <Select className=' mb-5' placeholder='Add Location' >
                            {Object.keys(state_cites).map((state) => {
                                return (<Select.Option value={state}>{state}</Select.Option>)
                            }
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item name="work_Segments" label="Select work segment">
                       <Select placeholder="select work segments">
                        {
                                work_segment.length > 0 && work_segment.map((cats) => {
                                    return (<Select.Option value={cats.name}>{cats.name}</Select.Option>)
                                })
                            }
                        </Select>
                    </Form.Item>

                </Form>
            </div>

            <div className='col-span-5 mt-5 md:mt-0'>

                <div className='border-2 overflow-y-scroll scrollbar shadow-md p-3 mb-5 flex justify-between items-center'>
                    <div className='flex-grow'>
                        <p>{projects.length} projects found</p>
                    </div>

                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={projects.length}
                        onChange={handlePageChange}
                        style={{ marginTop: '16px', textAlign: 'center' }}
                    />
                </div>
                <div className='flex-shrink-0 '>
                    {
                        projectDetails.length > 0 && projectDetails.map((proj_det) => {

                            return <div className='project_card p-6 border-2  mb-5'>
                                <h2 className='prime_h2 font_18 mb-3'>Project Name</h2>
                                <div className='grid grid-cols-3 gap-2 mb-3'>
                                    <div>
                                        <span>Posted By: </span> <span>{proj_det.vendor_det.agency_name || proj_det.vendor_det.entity}</span>
                                    </div>
                                    <div>
                                        <span>Posting Date: </span> <span>{moment(proj_det.pro_details.created_at).format('DD-MM-YYYY')}</span>
                                    </div>
                                    <div>
                                        <span>Location: </span> <span>{proj_det.vendor_det.State}</span>
                                    </div>
                                </div>
                                <span className=' text-[#808080]'>Work Segments:</span>
                                {
                                    proj_det.pro_details.wok_segment.map((segment, index) => {
                                        if (index === proj_det.pro_details.wok_segment.length - 1) {
                                            return <span> {segment}</span>;
                                        } else {
                                            return <span> {segment},</span>;
                                        }
                                    })
                                }
                                <p className='my-5'>{proj_det.pro_details.project_discription}</p>
                                <div className='flex pt-3'>
                                    <button className='prime_button_sec  mr-5 h-[40px]' onClick={() => { intresetHandler(proj_det.pro_details._id) }}>Share Interest</button>
                                    <button className='brand_button h-[40px]' onClick={() => { projectHandler(proj_det.pro_details._id) }}>View Project Details</button>
                                </div>
                            </div>
                        })
                    }

                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={projects.length}
                        onChange={handlePageChange}
                        style={{ textAlign: 'center' }}
                    />
                </div>

                <Modal
                    title="Share Your Intrest in this project"
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
                        Share Interest
                    </button>
                </Modal>

                <div>

                </div>
                <ToastContainer />

            </div>
        </div>
    )
}

export default FindProjects