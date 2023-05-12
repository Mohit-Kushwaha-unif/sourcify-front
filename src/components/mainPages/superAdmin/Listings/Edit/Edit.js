import { Checkbox, DatePicker, Form, Input, Radio, Select } from 'antd'
import { FaFileExcel } from 'react-icons/fa';
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import state_cites from '../../../../../assests/state_city.'
import { get_category } from '../../../../../services/category'
import {  get_listingBy_id, update_listing } from '../../../../../services/listing'
import moment from 'moment/moment';
import Loader from '../../../../Helper/Loader';

const EditListing = () => {
    const form = useForm()
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
    const [loading,setLoading] = useState(false)
    const [specificationImage, setSpecificationImage] = useState()
    const [formStatus, setFormStatus] = useState()
    const [showbillImg, setShowBillImg] = useState(true)
    const [showSpecImg, setShowSpecImg] = useState(true)
    const [state, setState] = useState([])
    useEffect(() => {
        dispatch(get_category()).then((res) => {
            res.map((cat) => {

                setSub_cat((prev_state) => [...prev_state, cat])
                setCategories((prev_state) => [...prev_state, cat.category])
            })
        })
    }, [])

    var initialSelects = []
    var initialValue = [];
    var initialOptions = []
    useEffect(() => {
        setLoading(true)
        dispatch(get_listingBy_id(location.state._id)).then((res) => {
             
            set_user_id(res.listing.user_id._id)
            Object.keys(res.listing).map((value) => {
                var obj = {}
                if (value == 'project_bill_qty_image') {
                    console.log("hi")
                    setShowBillImg(res.listing[value])
                }
                else if (value == 'project_specification') {
                    setShowSpecImg(res.listing[value])
                }
                else if (value === "project_tent_date") {
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
                setLoading(false)
            })
            setFormStatus(res.listing.status)
            setSelectedOptions(initialOptions)
            setSelectedItems(initialSelects)
            setInitialValues(initialValue)
        })
    }, [])
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
        dispatch(update_listing(values)).then((res) => {
           
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
        <>
        {
            loading  ? <Loader/> :
            <section className="min-h-min mt-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8 w-full" >
            <div className="px-8 h-full text-gray-800">
                <div
                    className=" flex xl:justify-center lg:justify-center items-center flex-wrap h-full g-6 "
                >
                    <div className="xl:ml-20 xl:w-11/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                        <div className="flex flex-row items-center justify-center lg:justify-between">
                            <p className="text-lg mb-0 mr-4"> Project Details</p>
                            {isAdmin === 2 && Object.keys(initialValues).map((value) => {
                                if (initialValues[value].name === 'contractor_id') {
                                    console.log(initialValues[value].value.email)
                                    return <p className='font-semibold'>Accepted By :- {initialValues[value].value.email}</p>
                                    // console.log()
                                }
                            })}
                        </div>
                        <div
                            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                        </div>
                        <Form labelAlign="left"
                            fields={[...initialValues, ...selectedOptions]}
                            layout="vertical" onFinish={FormHandler}>
                            <Form.Item name='project_discription' className='mb-1 mt-0' label="Write the Name of your project" rules={[
                                {
                                    required: true,
                                    message: 'Please input your Contact Person Name'
                                },
                            ]}
                            >

                                <TextArea className='h-[100px]' placeholder='Enter Project Description' />
                            </Form.Item>
                            <Form.Item name='project_scope' className='mb-1 mt-0' label="Write the Scope of Your Project" rules={[
                                {
                                    required: true,
                                    message: 'Please input your Contact Person Name'
                                },
                            ]}
                            >

                                <TextArea placeholder='Enter Scope of your project' />
                            </Form.Item>
                            <div className='grid grid-cols-2 my-3'>
                                {showSpecImg !== true ? <div className='w-full h-full grid grid-cols-2'>
                                    <span>
                                        <a href={showSpecImg} className="flex flex-col items-center text-center" download={"Specifiaction"}>

                                            <FaFileExcel className='w-20 h-20 mb-3' />

                                            {"Specification file"}
                                        </a>
                                    </span>
                                    <span className='cursor-pointer text-red-400' onClick={() => { setShowSpecImg(true) }}>Change Specification File</span>
                                </div> :
                                    <Form.Item name='project_specification' label="Work Specification" rules={[
                                        {
                                            required: true,
                                            message: 'Please attach your work specifications'
                                        },
                                    ]}
                                    >
                                        <Input type='file' max={1} onChange={specificationimageHandler} />

                                    </Form.Item>

                                }

                                {showbillImg !== false ?
                                    <div className='w-full h-full grid grid-cols-2'>
                                        <span>
                                            <a href={showbillImg} className="flex flex-col items-center text-center" download={"bill_img"}>

                                                <FaFileExcel className='w-20 h-20 mb-3 ' />

                                                {"Bill File"}
                                            </a>
                                        </span>
                                        <span className='cursor-pointer text-red-400' onClick={() => { setShowSpecImg(true) }}>Change Bill File</span>
                                    </div> :
                                    <Form.Item name='project_bill_qty' label="Please attach Bill of Quantity" rules={[
                                        {
                                            required: true,
                                            message: 'Please attach your Bill of Quantity'
                                        },
                                    ]}
                                    >

                                        <Input type='file' max={1} onChange={imageHandler} />
                                    </Form.Item>

                                }
                            </div>



                            <Form.Item name="wok_segment" className='mb-1' label="Select  work segment For Your Project" rules={[
                                {
                                    required: true,
                                    message: 'Please select work segment!',
                                },
                            ]}>
                                <Select
                                    mode="multiple"
                                    placeholder="Select  work segment"
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
                                    return sub_item === sub_category.name && sub_category.name != 'N/A' && <>
                                        {
                                            <Form.Item name={sub_item} className='mb-1' label={`Select Sub Category for ${sub_item}`} rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select options',
                                                },
                                            ]}>
                                                <Checkbox.Group className='grid md:grid-cols-5 gap-3'>
                                                    {sub_category.children.map((item, index) => {

                                                        return (
                                                            <Checkbox
                                                                key={item.name}
                                                                className={`ml-${index === 0 ? 2 : 0} `}
                                                                value={item.name}
                                                            >
                                                                <span>{item.name}</span>
                                                            </Checkbox>
                                                        );
                                                    })}
                                                </Checkbox.Group>
                                            </Form.Item>
                                        }

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
                        {initialValues.length > 0 && <Form.Item name='project_tent_date' className='mb-1 mt-0' label="Please select the tentative date to start the project" rules={[
                            {
                                required: true,
                                message: 'Please input your Contact Person Name'
                            },
                        ]}
                        >

                            <DatePicker disabledDate={disabledDate} onChange={onChange} />
                        </Form.Item>}

                        {
                            isAdmin === 2 &&
                                <div className="text-center lg:text-left mt-2 ">
                                  
                                    <Form.Item name="status" className='flex justify-between'>
                                    <Radio.Group >
                                        <Radio value={1} >Under Review</Radio>
                                        <Radio value={2}>Reject</Radio>
                                        <Radio value={0}>Accept</Radio>
                                    </Radio.Group>
                                    </Form.Item>
                                    
                                </div> }
                                 <div className='text-center lg:text-left mt-2 flex justify-around'>
                                    <button
                                        type="submit"
                                        className="save_Btn"
                                    >

                                        Update

                                    </button>
                                </div>
                        

                    </Form>
                </div>
            </div>
        </div>
        </section >
        }
       </>
    )
}

export default EditListing