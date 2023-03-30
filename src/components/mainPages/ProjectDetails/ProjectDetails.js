import { Modal, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { get_listingBy_id, update_listing } from '../../../services/listing'
import { FaFileExcel } from 'react-icons/fa';
import TextArea from 'antd/es/input/TextArea'
import { get_contractor, get_contractorBy_id } from '../../../services/contractor'
const ProjectDetails = () => {
    const location = useLocation()
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState([])
    const [open, setOpen] = useState(false);
    const [proposalVal,setProposalVal] = useState('')
    const [applied,setApplied] = useState(false)
    var isTrue= false
    useEffect(() => {
        console.log(location?.state)
        dispatch(get_listingBy_id(location?.state)).then((res) => {
            console.log(res)
            res.listing.proposals.map((detail)=>{
               if(detail.contractor_id._id === localStorage.getItem('user_id')) {
                setApplied(true)
               }
            })
            setFormValues(res)
        })
       
    }, [isTrue])
    // console.log(formValues)

    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    function submitHandler(value) {
        // console.log(value)
        var formData = {}
        formData.contractor_id = localStorage.getItem('user_id')
        formData.listing_id = value
        // formData.form_status = 1
        formData.proposal = proposalVal
        formData.contract_status = 0
        dispatch(update_listing(formData)).then((res) => {
            console.log(res)
            navigator('/dashboard')
        })
    }
    function proposalHandler(e){
        // console.log(e.target.value)
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
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-bold mb-2" for="email">
                                            Preferred State
                                        </label>
                                        {formValues?.listing.prefferd_state.map((states) => {
                                            return <Tag>{states}</Tag>
                                        })}

                                    </div>
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-bold mb-2" for="email">
                                            Work Segments
                                        </label>
                                        {formValues?.listing.wok_segment.map((work) => {
                                            return <Tag>{work}</Tag>
                                        })}

                                    </div>
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-bold mb-2" for="email">
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

                                        {/* {console.log(formValues.listing[0].project_bill_qty_image)} */}
                                    </div>
                                    <div className='md:grid grid-cols-2'>
                                        <div class="mb-4 flex">
                                            <span class="block text-gray-700 font-bold mb-2" for="email">
                                                Agency Name -
                                            </span>
                                            {formValues.vendorDetail[0].agency_name}

                                        </div>
                                        <div class="mb-4 flex">
                                            <span class="block text-gray-700 font-bold mb-2" for="email">
                                                Posted At - (DD/MM/YYYY) -
                                            </span>
                                            {
                                                new Date(formValues.listing.createdAt.split('T')[0]).getDate() + '/'
                                                + new Date(formValues.listing.createdAt.split('T')[0]).getMonth() + '/'
                                                + new Date(formValues.listing.createdAt.split('T')[0]).getFullYear()
                                            }

                                        </div>
                                    </div>
                                    <div class="mb-4 flex">
                                        <span class="block text-gray-700 font-bold mb-2" for="email">
                                            Contact Person   -
                                        </span>
                                        {formValues.vendorDetail[0].contact_person}
                                    </div>
                                    <div class="mb-4">
                                        <label class="block text-gray-700 font-bold mb-2" for="email">
                                            Start Date - (DD/MM/YYYY)
                                        </label>
                                        {
                                            new Date(formValues.listing.project_tent_date.split('T')[0]).getDate() + '/'
                                            + new Date(formValues.listing.project_tent_date.split('T')[0]).getMonth() + '/'
                                            + new Date(formValues.listing.project_tent_date.split('T')[0]).getFullYear()
                                        }

                                    </div>
                                    <div className='flex justify-center'>
                                    </div>
                               
                                <Modal
                                    title="Modal"
                                    open={open}
                                    onOk={submitHandler}
                                    onCancel={hideModal}
                                    bordered={false}
                                    footer={false}
                                // width={1140}
                                >
                                    <div className='mb-4'>
                                        <TextArea placeholder='Add Your Proposal' onChange={proposalHandler} value={proposalVal} name='proposal' className='w-full' />
                                        </div>
                                    <button
                                        type="submit"
                                        onClick={()=>submitHandler(formValues.listing._id)}
                                        className="primary_btn"
                                    >
                                        Send Proposal


                                    </button>
                                </Modal>
                                </form>}
                               {applied? <button
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
                                    Send Proposal


                                </button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProjectDetails