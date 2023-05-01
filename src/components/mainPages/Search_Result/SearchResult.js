import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Modal, Tag, Typography } from 'antd'
import dummy_img from '../../../assests/dummy_img.png'
import star from '../../../assests/star.png'
import right_red from '../../../assests/right_red.png'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import TextArea from 'antd/es/input/TextArea'
import { send_message } from '../../../services/Messages'
import { get_Vendor } from '../../../services/Vendor'
import moment from 'moment'
import { get_listingBy_id } from '../../../services/listing'
import { get_contractor } from '../../../services/contractor'
const SearchResult = () => {
    const { Title } = Typography
    const [projects, setProjects] = useState([])
    const [hireContractor, setHireContractor] = useState()
    const [isCompany, setIsCompany] = useState(false)
    const [proposalVal, setProposalVal] = useState('')
    var [projectDetails, setProjectDetails] = useState([])
    const userRole = useSelector(state => state.User.user_role);
    const [loading,setIsLoading] = useState(false);
    const [listID, setListId] = useState()
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const contractHandler = (val) => {
        if(localStorage.getItem("isLoggedIn") == "false"){
            navigate('/login')
          }
          else if(localStorage.getItem("user_id") == val.user_id._id|| localStorage.getItem("user_id") == val.user_id){
            toast.error('It is your profile only', {
              position: toast.POSITION.TOP_RIGHT
            })
          }
          else if (localStorage.getItem('status') !=0) {
            toast.error('Account is not approved by admin', {
              position: toast.POSITION.TOP_RIGHT
            })
          }
          else{
            setHireContractor(val)
            setIsCompany(true)
          }
    }
    useEffect(() => {
        setIsLoading(true)
        const filteredProjects = location.state.res.listings.filter((proj_det) => {
            if (proj_det.status === 0) {
                const hasContractStatus1 = proj_det.proposals.some((proposal_Status) => {
                    return proposal_Status.contract_status === 1
                })
                return !hasContractStatus1
            }
            return false

        })
        setProjects(filteredProjects)
        setIsLoading(false)
    }, [])
  
    const hideModal = () => {
        setIsCompany(false);
    };
    function submitHandler(event) {
        event.preventDefault();
        setIsLoading(true)
        var obj = {}
        console.log(hireContractor)
        obj.from_id = localStorage.getItem("user_id")
        obj.to_id = hireContractor.user_id
        obj.message = proposalVal
        obj.isSeen = 0
        dispatch(send_message(obj)).then((res) => {
            setIsLoading(false)
            hideModal()
        })
    }
    function proposalHandler(e) {
        // console.log(e.target.value)
        setProposalVal(e.target.value)
    }

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
        setProjectDetails([...projDet]);
    }, [projects, dispatch]);

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
   
    return (

        <div className='container'>



            <Title level={2}> Search Result for <span className='text-color'>Projects</span>   which includes <span className='text-color'>{location.state.input} </span></Title>
            {
                projectDetails.length > 0 ? projectDetails.map((proj_det) => {

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
                    :
                    <p>Nothing to show</p>}

            <Title level={2}> Search Result for <span className='text-color'>Contractors</span>   which includes <span className='text-color'>{location.state.input} </span></Title>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {location.state.res.contractors.length > 0 ? location.state.res.contractors.map((item) => {

                    return <div className='grid grid-cols-4 gap-2 w-full border-2 h-[300px] scrollbar  shadow-md p-4 py-6 overflow-auto'>
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


                })
                    :

                    <p>Nothing to show</p>}
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

    )
}

export default SearchResult