import { DatePicker, Form, Input, Select, Typography } from 'antd'
import { FaFileExcel } from 'react-icons/fa';
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import state_cites from '../../../../assests/state_city.'
import { get_category } from '../../../../services/category'
import { get_listingBy_id, update_listing } from '../../../../services/listing'
import moment from 'moment/moment';
import { get_contractor } from '../../../../services/contractor';
import { get_Vendor } from '../../../../services/Vendor';

const ViewForm = () => {
    const form = useForm()
    const { Title } = Typography
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.User.user_role);
    const location = useLocation()
    const [categories, setCategories] = useState([])
    const [sub_cat, setSub_cat] = useState([])
    const [user_id, set_user_id] = useState()
    const [initialValues, setInitialValues] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [image, set_ImageD] = useState()
    const [specificationImage, setSpecificationImage] = useState()
    const [formStatus, setFormStatus] = useState()
    const [proposal_id, setProposalId] = useState()
    const [showbillImg, setShowBillImg] = useState(true)
    const [showSpecImg, setShowSpecImg] = useState(true)
    const [contact, setContact] = useState([])
    const [state, setState] = useState([])
    useEffect(() => {
        dispatch(get_category()).then((res) => {
            res.map((cat) => {

                setSub_cat((prev_state) => [...prev_state, cat])
                setCategories((prev_state) => [...prev_state, cat.category])
            })
        })
        var data = []
        dispatch(get_contractor()).then((res) => {
            res.map((val) => {

                setContact((prev) => [...prev, val])

            })
        })
        dispatch(get_Vendor()).then((res) => {
            res.map((val) => {
                setContact((prev) => [...prev, val])

            })
        })

    }, [])

    var initialSelects = []
    var initialValue = [];
    var initialOptions = []
    useEffect(() => {

        dispatch(get_listingBy_id(location.state._id)).then((res) => {
            // console.log({ res })
            set_user_id(res.listing.user_id._id)
            Object.keys(res.listing).map((value) => {
                var obj = {}
                if (value === "project_tent_date") {
                    obj["name"] = value
                    obj["value"] = moment(res.listing[value])
                    initialValue.push(obj)
                }
                else {
                    obj["name"] = value
                    obj["value"] = res.listing[value]
                    initialValue.push(obj)
                }


                if (value === "wok_segment") {
                    res.listing[value].map((options) => {
                        initialSelects.push(options)
                    })
                }
                if (value === "work_area") {
                    res.listing.work_area.map((options) => {
                        Object.keys(options).map((opt_val) => {
                            var obj = {}
                            obj["name"] = opt_val
                            obj["value"] = options[opt_val]
                            console.log(obj)
                            initialOptions.push(obj)
                        })
                    })
                }
                if (value == "proposals") {

                    contact.map((contDetails) => {
                        res.listing[value].map((listVal) => {
                            console.log(listVal.contractor_id._id, contDetails.user_id._id)
                            if (listVal.contractor_id._id == contDetails.user_id._id)

                                listVal.agency = contDetails.agency_name || contDetails.entity

                        })

                    })

                }
            })

            setFormStatus(res.listing.status)
            setSelectedOptions(initialOptions)
            setSelectedItems(initialSelects)
            setInitialValues(initialValue)
            initialValue.map((values) => {
                // console.log({ values })
                if (values.name === 'project_bill_qty_image') {
                    setShowBillImg(values.value)
                }
                if (values.name === 'project_specification') {
                    setShowSpecImg(values.value)
                }
            })
            // setInitialValues((prevState)=>[...prevState, initialOptions)])
        })
    }, [contact])
    // console.log(initialValues)
    const filteredOptions = categories.filter((o) => !selectedItems.includes(o))
    function FormHandler(values) {

        var work_area = []
        Object.keys(values).map((val_item) => {
            values.wok_segment.map((work) => {
                if (val_item === work) {

                    work_area.push({ [val_item]: values[val_item] })
                }
            })
        })

        values["work_area"] = [...work_area]

        values.user_id = user_id
        values.listing_id = location.state._id
        values.proposal_status = formStatus.proposal_status
        values.proposal_id = formStatus.proposal_detail
        values.cont_id = formStatus.cont_id
        console.log(values, formStatus)
        dispatch(update_listing(values)).then((res) => {
            // if (formStatus === 0) {
            //     Swal.fire('Proposal Has Been Accepted',
            //         'It will live soon',
            //         'success')
            // }
            // else if (formStatus === 1) {
            //     Swal.fire('P has been put in Under Review',
            //         'It will live once admin accept it',
            //         'warning')
            // }

            // else {
            //     Swal.fire('Listitng has been  rejected',
            //         'Admin has rejected this listing',
            //         'error')
            // }
            if (isAdmin == 2) { navigator('/admin/all-listing') }
            else {
                navigator('/dashboard')
            }
        })
    }
    const onChange = (date, dateString) => {
        console.log(date, dateString);

    };
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now();
    }
    function specificationimageHandler(e) {
        setSpecificationImage(e.target.files[0])
    }
    function imageHandler(e) {
        set_ImageD(e.target.files[0])
    }
    function countrySelectHandler(country) {
        setState(state_cites[country])
      }
    return (
        <section className="min-h-min mt-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8 w-full" >
            <div className="mx-auto md:w-[80%] w-[90%] h-full text-gray-800">
                <div
                    className=" flex xl:justify-center lg:justify-center items-center flex-wrap h-full g-6 "
                >
                    <div className="xl:ml-20 xl:w-11/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                        <div className="flex flex-row items-center justify-center lg:justify-between">
                            <p className="text-lg mb-0 mr-4"> Project Details</p>

                            {isAdmin === 2 && Object.keys(initialValues).map((value) => {
                                if (initialValues[value].name === 'proposals') {
                                    return initialValues[value].value.map((acceptedBy) => {
                                        console.log(acceptedBy.contract_status)
                                        if (acceptedBy.contract_status === 1) {
                                            return <p className='font-semibold'>Accepted By :- {acceptedBy.contractor_id.email}</p>
                                        }
                                    })
                                }
                            })}
                        </div>
                        <div
                            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                        </div>
                        <Form labelAlign="left"
                            fields={[...initialValues, ...selectedOptions]}
                            disabled={true}
                            layout="vertical" onFinish={FormHandler}>
                            <Form.Item name='project_discription' className='mb-1 mt-0' label=" Name of your project" rules={[
                                {
                                    required: true,
                                    message: 'Please input your Contact Person Name'
                                },
                            ]}
                                labelCol={{ span: 24 }}
                            >

                                <Input placeholder='Enter Project Description' />
                            </Form.Item>
                            <Form.Item name='project_scope' className='mb-1 mt-0' label=" Scope of Your Project" rules={[
                                {
                                    required: true,
                                    message: 'Please input your Contact Person Name'
                                },
                            ]}
                            >

                                <TextArea placeholder='Enter Scope of your project' />
                            </Form.Item>
                            <div className='grid grid-cols-2 my-3'>
                                {showSpecImg !== false && <div className='w-full h-full'>
                                    <a href={showSpecImg} className="text-center" download={"Specifiaction Img"}>

                                        <FaFileExcel className='w-20 h-20' />

                                        <span>{"Specifcation File"}</span>
                                    </a>
                                </div>}

                                {showbillImg !== false &&
                                    <div className='w-full h-full'>
                                        <a href={showbillImg} download={"bill_img"}>

                                            <FaFileExcel className='w-20 h-20' />

                                            <span className='ml-3'>{"Bill File"}</span>
                                        </a>
                                    </div>
                                }
                            </div>
                            {showSpecImg == true &&
                                <Form.Item name='project_specification' className='mb-1 mt-0' label="Please Enter the Specification you want for Your Project" rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Contact Person Name'
                                    },
                                ]}
                                >
                                    <Input type='file' max={1} onChange={specificationimageHandler} />

                                </Form.Item>
                            }
                            {showbillImg == true &&
                                <Form.Item name='project_bill_qty' className='mb-1 mt-0' label="Please attach Project bill Quantity" rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Contact Person Name'
                                    },
                                ]}
                                >

                                    <Input type='file' max={1} onChange={imageHandler} />
                                </Form.Item>
                            }

                            <Form.Item name="wok_segment" className='mb-1' label=" Project Category" rules={[
                                {
                                    required: true,
                                    message: 'Please input your Address!',
                                },
                            ]}>
                                <Select
                                    mode="multiple"
                                    placeholder="Select Categories"
                                    value={selectedItems}
                                    onChange={setSelectedItems}
                                    style={{
                                        width: '100%',
                                    }}
                                    options={filteredOptions.map((item) => ({
                                        value: item,
                                        label: item,
                                    }))}
                                />
                            </Form.Item>
                            {selectedItems.length > 0 && selectedItems.map((sub_item) => {
                                return sub_cat.map((sub_category) => {
                                    return sub_item === sub_category.category && sub_category.sub_category != 'N/A' && <>
                                        <Form.Item name={sub_item} className='mb-1' label={`Select Sub Category For ${sub_item}`} rules={[
                                            {
                                                required: true,
                                                message: 'Please Select options!',
                                            },
                                        ]}>
                                            <Select
                                                mode="multiple"
                                                placeholder="Select Categories"
                                                // value={selectedItems}
                                                // onChange={setSelectedItems}
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={sub_category.sub_category.map((item) => ({
                                                    value: item.sub_Category,
                                                    label: item.sub_Category,
                                                }))}
                                            />
                                        </Form.Item>
                                    </>


                                })
                            })

                            }

                            <div className='flex flex-col md:flex-row  '>
                                <div className='form_flex_children mr-1'>
                                    <Form.Item name="prefferd_state" label="Project State " rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your state'
                                        },
                                    ]}>

                                        <Select id="country-state"
                                            name="State" placeholder="Select state" onSelect={countrySelectHandler}
                                            showSearch // enable search functionality
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 // case-insensitive search
                                            }>
                                            {Object.keys(state_cites).map((state) => {
                                                return (<Select.Option value={state}>{state}</Select.Option>)
                                            }
                                            )}
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className='form_flex_children mr-1'>
                                    <Form.Item name="City" label="City " rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your city',
                                        },
                                    ]}>
                                        <Select id="country-state"
                                            name="City" placeholder="Select city"
                                            showSearch // enable search functionality
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 // case-insensitive search
                                            }>
                                            {state.length > 0 && state.map((state) => {
                                                return (<Select.Option value={state}>{state}</Select.Option>)
                                            }
                                            )}
                                        </Select>
                                    </Form.Item>
                                </div>

                            </div>
                            {initialValues.length > 0 && <Form.Item name='project_tent_date' className='mb-1 mt-0' label=" Tentative date to start the project" rules={[
                                {
                                    required: true,
                                    message: 'Please select tentative date'
                                },
                            ]}
                            >

                                <DatePicker disabledDate={disabledDate} onChange={onChange} />
                            </Form.Item>}
                            <Title level={4}>Interest Recieved</Title>
                            {
                                initialValues.length > 0 && initialValues.map((proposal) => {

                                    if (proposal.name === "proposals") {

                                        return proposal.value.map((details) => {
                                            console.log({ details })
                                            return <>

                                                <p>Submitted By  - {details.agency}</p>
                                                <TextArea value={details.proposal} />
                                                {details.contract_status === 0 ? <div className='flex mt-3 justify-evenly'>

                                                    <button
                                                        type="submit"
                                                        onClick={() => { setFormStatus({ "proposal_status": 1, "proposal_detail": details._id, "cont_id": details.contractor_id._id }) }}
                                                        className="inline-block px-7 py-3 bg-green-400 text-white font-medium   text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                                    >

                                                        Accept

                                                    </button>
                                                    <button
                                                        type="submit"
                                                        onClick={() => { setFormStatus({ "proposal_status": 2, "proposal_detail": details._id, "cont_id": details.contractor_id._id }) }}
                                                        className="inline-block px-7 py-3 bg-red-400 text-white font-medium   text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                                    >

                                                        Reject

                                                    </button>
                                                </div> : details.contract_status == 2 ? <p className='inline-block px-2 py-1 bg-red-400 text-white font-medium'>Rejected</p> : <> <p className='inline-block px-2 py-1 bg-green-400 text-white font-medium'>Accepted</p>  <Link to={'/messages'} state={details} className='inline-block px-2 py-1 bg-red-400 hover:none focus:none text-white cursor-pointer font-medium'>Chat Now</Link> </>}

                                            </>
                                        })

                                    }

                                })
                            }

                            {/* {
                                isAdmin === 2 ?
                                    <div className="text-center lg:text-left mt-2 flex justify-around">
                                        {console.log({initialValues})}
                                        {initialValues.length > 0 && initialValues[7].value != 2 &&
                                            <button
                                                type="submit"
                                                onClick={() => setFormStatus(2)}
                                                className="inline-block px-7 py-3 bg-red-600 text-white font-medium hover:bg-red-400  text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                            >

                                                Reject

                                            </button>}
                                        {initialValues.length > 0 && initialValues[7].value != 0 && <button
                                            type="submit"
                                            onClick={() => setFormStatus(0)}
                                            className="inline-block px-7 py-3 bg-green-600 text-white hover:bg-green-400 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                        >

                                            Accept

                                        </button>}
                                        {initialValues.length > 0 && initialValues[7].value != 1 && <button
                                            type="submit"
                                            onClick={() => setFormStatus(1)}
                                            className="inline-block px-7 py-3 bg-yellow-600 text-white hover:bg-yellow-400  font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                        >

                                            Under Review

                                        </button>}
                                    </div> : <div className='text-center lg:text-left mt-2 flex justify-around'>
                                        <button
                                            type="submit"
                                            onClick={() => setFormStatus(1)}
                                            className="inline-block px-7 py-3 bg-blue-400 text-white font-medium   text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                        >

                                            Update

                                        </button>
                                    </div>
                            } */}

                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ViewForm