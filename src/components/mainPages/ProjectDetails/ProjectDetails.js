import { Modal, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { get_listingBy_id, update_listing } from '../../../services/listing'
import { FaFileExcel } from 'react-icons/fa';
import TextArea from 'antd/es/input/TextArea'
import moment from 'moment'
import { toast, ToastContainer } from 'react-toastify'
const ProjectDetails = () => {
    const location = useLocation()
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState([])
    const [open, setOpen] = useState(false);
    const [proposalVal, setProposalVal] = useState('')
    const [applied, setApplied] = useState(false)
    const userRole = useSelector(state => state.User.user_role);
    var isTrue = false
    useEffect(() => {
        dispatch(get_listingBy_id(location?.state)).then((res) => {
            console.log(res)
            res.listing.proposals.map((detail) => {
                if (detail.contractor_id != null && detail.contractor_id._id === localStorage.getItem('user_id')) {
                    setApplied(true)
                }
            })
            setFormValues(res);
        })

    }, [isTrue])
    console.log(formValues)

    const showModal = () => {
        if (localStorage.getItem("isLoggedIn") == "false") {
            navigator('/login')
        }
        if (localStorage.getItem("user_id") == formValues.vendorDetail[0].user_id || localStorage.getItem("user_id") == formValues.vendorDetail[0].user_id._id) {
            toast.error('Can not Share Interest to your own projects', {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        if (localStorage.getItem("status") !== "0") {
            toast.error('Account not approved by admin', {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        else {
            setOpen(true);
        }

    };
    const hideModal = () => {
        setOpen(false);
    };
    function submitHandler(value) {
        var formData = {}
        formData.contractor_id = localStorage.getItem('user_id')
        formData.listing_id = value
        formData.proposal = proposalVal
        formData.contract_status = 0
        dispatch(update_listing(formData)).then((res) => {

            toast.success('Interest submitted', {
                position: toast.POSITION.TOP_RIGHT
            })
        })
    }
    function proposalHandler(e) {
        setProposalVal(e.target.value)
    }
    return (
        <>
            <div className='project_details p-3 w-full'>
                <div class="bg-gray-100 py-8 px-4 ">
                    <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-2xl">
                        <div class="md:flex">
                            <div class="w-full px-6 py-8">
                                <h2 class="text-center font-bold text-gray-700 text-2xl mb-6">Project Detail</h2>
                                {console.log(formValues)}
                                {!Array.isArray(formValues) && <form onSubmit={submitHandler} class="mb-4">

                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-bold mb-2" for="name">
                                            Project Description
                                        </label>
                                        {formValues.listing.project_discription}
                                    </div>
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-bold mb-2" for="password">
                                            Project Scope
                                        </label>
                                        {formValues.listing.project_scope ? formValues.listing.project_scope : 'Not Provided'}
                                    </div>
                                    <div class=" grid md:grid-cols-2  gap-5 mb-5">
                                        <div>
                                            <label class="block text-gray-700 font-bold mb-2" for="email">
                                                Project State
                                            </label>
                                            {Array.isArray(formValues?.listing.prefferd_state) ? formValues?.listing.prefferd_state.map((states) => {
                                                return <Tag>{states}</Tag>
                                            }) : <Tag>{formValues?.listing.prefferd_state}</Tag>}
                                        </div>
                                        <div>
                                            <label class="block text-gray-700 font-bold mb-2" for="email">
                                                City
                                            </label>
                                            <Tag>{formValues?.listing?.City}</Tag>
                                        </div>

                                    </div>
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-bold mb-2" for="email">
                                            Work Segments
                                        </label>
                                        {formValues?.listing.wok_segment.map((work) => {
                                            return <Tag>{work}</Tag>
                                        })}

                                    </div>
                                    <div class="mb-4 grid md:grid-cols-2">
                                        <div>
                                            <label class=" text-gray-700 font-bold mb-2" for="email">
                                                Project Bill Quantity
                                            </label>
                                            {
                                                formValues.listing.project_bill_qty_image?.split('.')[1] != 'JPEG' ||
                                                    formValues.listing.project_bill_qty_image?.split('.')[1] != 'PNG' ?
                                                    <a href={formValues.listing.project_bill_qty_image} download={"Project Bill"}>

                                                        <FaFileExcel className='w-20 h-20' />

                                                        {/* {"Specifiaction Img"} */}
                                                    </a> :
                                                    <img src={formValues.vendorDetail.project_bill_qty_image} />
                                            }
                                        </div>
                                        <div>
                                            <label class=" text-gray-700 font-bold mb-2" for="email">
                                                Project Specification
                                            </label>
                                            {
                                                formValues.listing.project_specification?.split('.')[1] != 'JPEG' ||
                                                    formValues.listing.project_specification?.split('.')[1] != 'PNG' ?
                                                    <a href={formValues.listing.project_specification} download={"Project Bill"}>

                                                        <FaFileExcel className='w-20 h-20' />

                                                        {/* {"Specifiaction Img"} */}
                                                    </a> :
                                                    <img src={formValues.vendorDetail.project_specification} />
                                            }
                                        </div>
                                    </div>
                                    <div className='md:grid grid-cols-2'>
                                        <div class="mb-4 flex">
                                            <span class="block text-gray-700 font-bold mb-2" for="email">
                                                Agency Name -
                                            </span>
                                            {formValues.vendorDetail[0].agency_name || formValues.vendorDetail[0].entity}

                                        </div>
                                        <div class="mb-4 flex">
                                            <span class="block text-gray-700 font-bold mb-2" for="email">
                                                Posted At - (DD/MM/YYYY) -
                                            </span>
                                            {
                                                moment(formValues.listing.createdAt.split('T')[0]).format('DD/MM/YYYY')
                                            }

                                        </div>
                                    </div>
                                    <div class="mb-4 flex">
                                        <span class="block text-gray-700 font-bold mb-2" for="email">
                                            Contact Person   -
                                        </span>
                                        {formValues.vendorDetail[0].contact_person || formValues.vendorDetail[0].username}
                                    </div>
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-bold mb-2" for="email">
                                            Start Date - (DD/MM/YYYY)
                                        </label>
                                        {
                                            moment(formValues.listing.project_tent_date.split('T')[0]).format('DD/MM/YYYY')
                                        }

                                    </div>
                                    <div className='flex justify-center'>
                                    </div>

                                    <Modal
                                        title="Share your interest in this project"
                                        open={open}
                                        onOk={submitHandler}
                                        onCancel={hideModal}
                                        bordered={false}
                                        footer={false}
                                    // width={1140}
                                    >
                                        <div className='mb-4'>
                                            <TextArea placeholder='Your message' onChange={proposalHandler} value={proposalVal} name='proposal' className='w-full' />
                                        </div>
                                        <button
                                            type="submit"
                                            onClick={() => submitHandler(formValues.listing._id)}
                                            className="primary_btn"
                                        >
                                            Share Interest


                                        </button>
                                    </Modal>
                                </form>}
                                {applied ? <button
                                    //  type="submit"
                                    disabled
                                    className="primary_btn"
                                >
                                    Already Applied


                                </button> : <div className='flex justify-center'> <button
                                    //  type="submit"
                                    onClick={showModal}
                                    className="primary_btn "
                                >
                                    Share Interest


                                </button>
                                </div>}
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProjectDetails