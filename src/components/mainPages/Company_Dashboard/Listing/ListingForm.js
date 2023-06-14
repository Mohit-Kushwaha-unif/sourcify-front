import { Calendar, Checkbox, DatePicker, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import Swal from 'sweetalert2'
import state_cites from '../../../../assests/state_city.'
import { get_category } from '../../../../services/category'
import { get_contractor } from '../../../../services/contractor'
import { add_listing } from '../../../../services/listing'
import { getAllUser, get_user_info, update_user } from '../../../../services/user'
import { get_Vendor } from '../../../../services/Vendor'
import Loader from '../../../Helper/Loader'
import useDocumentTitle from '../../../Helper/useDocumentTitle'

const ListingForm = () => {
    const [loading, setLoading] = useState(false)
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [sub_cat, setSub_cat] = useState([])
    const [specificationImage, setSpecificationImage] = useState()
    const [selectedItems, setSelectedItems] = useState([]);
    const [allUsers, setAllUsers] = useState([])
    const [image, set_ImageD] = useState()
    const [state, setState] = useState([])
    const isAdmin = useSelector(state => state.User.user_role);
    const WORK_SEGMENT = useSelector(state => state.User.Work_segment)
    useDocumentTitle('Add your Listing')
    var users = [];
    useEffect(() => {
       
        if (localStorage.getItem("isLoggedIn") !== "true") {
            navigator('/login');
        }

        dispatch(get_Vendor()).then((res) => {
            res.map((user) => {
                if (user.status === 0) {
                   
                    users.push(user);
                }

            });
        }).then(() => {
            dispatch(get_contractor()).then((res) => {
                res.map((cont) => {
                    if (cont.status === 0) {
                       
                        users.push(cont);
                    }
                });
            }).then(() => {
                setAllUsers([...users]);
            });
        });
      console.log(users)
        if (WORK_SEGMENT != undefined && WORK_SEGMENT.length > 0) {

            WORK_SEGMENT.map((cat) => {
                setSub_cat((prev_state) => [...prev_state, cat]);
                setCategories((prev_state) => [...prev_state, cat.name]);
            });

        }
        else {
            dispatch(get_category()).then((res) => {
                res.map((cat) => {
                    setSub_cat((prev_state) => [...prev_state, cat]);
                    setCategories((prev_state) => [...prev_state, cat.name]);
                });
            });
        }


    }, []);

    console.log(allUsers)
    const filteredOptions = categories.filter((o) => !selectedItems.includes(o))

    const onChange = (date, dateString) => {

    };
    function FormHandler(values) {
        // setLoading(true)
        var work_area = []
        var formData = new FormData()
        var info;
        if(values.user_id){
            info = values.user_id
            const User =  allUsers.find(item=>item.user_id._id == info)
            values.listing_id = User._id
        }
       
        Object.keys(values).map((val_item) => {
            values.wok_segment.map((work) => {
                if (val_item === work) {

                    work_area.push({ [val_item]: values[val_item] })
                }
            })
        })

        values["work_area"] = [...work_area]
        if (isAdmin != 2) {
            values.user_id = localStorage.getItem("user_id")
            values.listing_id = localStorage.getItem('form_id')
            values.user_email = localStorage.getItem('email')
        }
        values.status = 1
        values.project_bill_qty = image
        values.project_specification = specificationImage

        Object.keys(values).map((formVal) => {
            if (formVal == "work_area") {
                formData.append(formVal, JSON.stringify(values[formVal]))
            }
            else {
                formData.append(formVal, values[formVal])
            }

        })
      
        dispatch(add_listing(formData)).then((res) => {
            setLoading(false)
            Swal.fire('Your Project is submitted for approval', '', 'success').then(() => {
                navigator('/dashboard')
            })
        })
    }
    function specificationimageHandler(e) {
        setSpecificationImage(e.target.files[0])
    }
    function imageHandler(e) {
        set_ImageD(e.target.files[0])
    }
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now();
    }

    function countrySelectHandler(country) {
        setState(state_cites[country])
    }
    return (
        <>
            {
                loading ?
                    <Loader />
                    :
                    <section className="container min-h-min mt-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8 w-full" >
                        <div className="md:px-8 h-full text-gray-800">
                            <div
                                className=" flex xl:justify-center lg:justify-center items-center flex-wrap h-full g-6 "
                            >
                                <div className={`${isAdmin == 2 ? "w-full" : "xl:mx-20 xl:w-11/12 lg:w-5/12 md:w-8/12"} mb-12 md:mb-0 bg-white border-2 border-black-600 rounded-xl p-6`}>
                                    <div className="flex flex-row items-center justify-center lg:justify-start">
                                        <p className="text-lg mb-0 mr-4" data-translate="hi">Enter Your Project Details</p>
                                    </div>
                                    <div
                                        className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                    >
                                    </div>
                                    <Form labelAlign="left"
                                        layout="vertical" onFinish={FormHandler}>
                                        {
                                            isAdmin == 2 &&
                                            <>
                                                <p className='headings font_16 mb-1'>Select Company Name</p>
                                                <Form.Item name='user_id' label="" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Write the Name of your project'
                                                    },
                                                ]}
                                                >

                                                    <Select name="user_id" placeholder="Select Comapny " options={allUsers.map((item) => ({
                                                        value: item.user_id._id,
                                                        label: item.entity || item.agency_name,
                                                    }))}>

                                                    </Select>
                                                </Form.Item>
                                                <p className='headings font_16 mb-3'>Project Details</p>
                                            </>
                                        }

                                        <Form.Item name='project_discription' label="Project Name" rules={[
                                            {
                                                required: true,
                                                message: 'Write the name of your project'
                                            },
                                        ]}
                                        >

                                            <Input placeholder='Enter project name' />
                                        </Form.Item>
                                        <Form.Item name="wok_segment" label="Select work segment for your project" rules={[
                                            {
                                                required: true,
                                                message: 'Please select  work segment for your project',
                                            },
                                        ]}>
                                            <Select
                                                mode="multiple"
                                                placeholder="Select work segment"
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
                                                    <Form.Item name={sub_item} label={`Select Sub Category For ${sub_item}`} rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Select options',
                                                        },
                                                    ]}>
                                                        <Checkbox.Group className='grid md:grid-cols-5 gap-3'>
                                                            {sub_category.children.map((item, index) => {

                                                                return (
                                                                    <Checkbox
                                                                        key={item.sub_Category}
                                                                        className={`ml-${index === 0 ? 2 : 0} `}
                                                                        value={item.name}
                                                                    >
                                                                        <span>{item.name}</span>
                                                                    </Checkbox>
                                                                );
                                                            })}
                                                        </Checkbox.Group>

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

                                        <Form.Item name='project_scope' label="Scope of Work" rules={[
                                            {
                                                required: true,
                                                message: 'Write the scope of your project'
                                            },
                                        ]}
                                        >

                                            <TextArea placeholder='Enter scope of your project' />
                                        </Form.Item>
                                        <Form.Item name='project_specification' label="Work Specification" 
                                        >
                                            <Input type='file' max={1} onChange={specificationimageHandler} />

                                        </Form.Item>
                                        <Form.Item name='project_bill_qty' label="Please attach Bill of Quantity" 
                                        >

                                            <Input type='file' max={1} onChange={imageHandler} />
                                        </Form.Item>



                                        <Form.Item name='project_tent_date' label="Please select the tentative date to start the project" 
                                        >

                                            <DatePicker disabledDate={disabledDate} onChange={onChange} />
                                        </Form.Item>
                                        <div className="flex justify-center text-center lg:text-left mt-2">
                                            <button
                                                type="submit"
                                                className="save_Btn"
                                            >

                                                Save

                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </section>
            }
        </>

    )
}

export default ListingForm