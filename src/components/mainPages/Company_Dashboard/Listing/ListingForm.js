import { Calendar, DatePicker, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import state_cites from '../../../../assests/state_city.'
import { get_category } from '../../../../services/category'
import { add_listing } from '../../../../services/listing'
import { update_user } from '../../../../services/user'

const ListingForm = () => {
    const form = useForm()
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [sub_cat, setSub_cat] = useState([])
    const [specificationImage ,setSpecificationImage] = useState()
    const [selectedItems, setSelectedItems] = useState([]);
    const [image, set_ImageD] = useState()
    useEffect(() => {
        dispatch(get_category()).then((res) => {

            res.map((cat) => {

                setSub_cat((prev_state) => [...prev_state, cat])
                setCategories((prev_state) => [...prev_state, cat.category])
            })
        })
    }, [])

    // sub_cat.map((categories)=>{
    //     categories.category ===selectedItems
    // })

    const filteredOptions = categories.filter((o) => !selectedItems.includes(o))

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    function FormHandler(values) {
        var work_area = []
        var formData = new FormData()
        Object.keys(values).map((val_item) => {
            values.wok_segment.map((work) => {
                if (val_item === work) {

                    work_area.push({ [val_item]: values[val_item] })
                }
            })
        })

        values["work_area"] = [...work_area]
        if (localStorage.getItem("adminEmail") == null) {
            values.user_id = localStorage.getItem("user_id")
        }
        values.status = 1
        values.project_bill_qty = image
        values.project_specification = specificationImage
         console.log(values)
        Object.keys(values).map((formVal) => {
            if (formVal == "work_area") {
                formData.append(formVal, JSON.stringify(values[formVal]))
            }
            else {
                formData.append(formVal, values[formVal])
            }

        })
        // var formData = new FormData()
        // formData.append = values
        dispatch(add_listing(formData)).then((res) => {
            Swal.fire('Your Listitng Posted Successfully', 'It will live once admin accept it', 'success')
        }).then(()=>{
            navigator('/dashboard')
        })
    }
    function specificationimageHandler(e){
        setSpecificationImage(e.target.files[0])
    }
    function imageHandler(e) {
        set_ImageD(e.target.files[0])
    }
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now();
    }
    function countrySelectHandler() { }
    return (
        <section className="min-h-min mt-3 flex flex-col justify-center py-6 sm:px-6 lg:px-8 w-full" >
            <div className="px-8 h-full text-gray-800">
                <div
                    className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 "
                >
                    <div className="xl:ml-20 xl:w-11/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                        <div className="flex flex-row items-center justify-center lg:justify-start">
                            <p className="text-lg mb-0 mr-4">Enter Your Project Details</p>
                        </div>
                        <div
                            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                        </div>
                        <Form labelAlign="left"

                            layout="vertical" onFinish={FormHandler}>
                            <Form.Item name='project_discription' className='mb-1 mt-0' label="Project Description" rules={[
                                {
                                    required: true,
                                    message: 'Write the Description of Your Project'
                                },
                            ]}
                            >

                                <TextArea placeholder='Enter Project Description' />
                            </Form.Item>
                            <Form.Item name="wok_segment" className='mb-1' label="Select Category For Your Project" rules={[
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
                            <Form.Item name="prefferd_state" label="Preffered State to Work " rules={[
                                {
                                    required: true,
                                    message: 'Please input your State!'
                                },
                            ]}
                            >

                                <Select id="country-state" mode="multiple" name="prefferd_state" placeholder="Select State" onSelect={countrySelectHandler}>
                                    <Select.Option value="All State">All State</Select.Option>
                                    {Object.keys(state_cites).map((state) => {
                                        return (<Select.Option value={state}>{state}</Select.Option>)
                                    }
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item name='project_scope' className='mb-1 mt-0' label="Scope of Work" rules={[
                                {
                                    required: true,
                                    message: 'Write the Description of Your Project'
                                },
                            ]}
                            >

                                <TextArea placeholder='Enter Scope of your project' />
                            </Form.Item>
                            <Form.Item name='project_specification' className='mb-1 mt-0' label="Work Specification" rules={[
                                {
                                    required: true,
                                    message: 'Please input your Contact Person Name'
                                },
                            ]}
                            >
                                <Input type='file' max={1} onChange={specificationimageHandler} />

                            </Form.Item>
                            <Form.Item name='project_bill_qty' className='mb-1 mt-0' label="Please attach Project bill Quantity" rules={[
                                {
                                    required: true,
                                    message: 'Please input your Contact Person Name'
                                },
                            ]}
                            >

                                <Input type='file' max={1} onChange={imageHandler} />
                            </Form.Item>



                            <Form.Item name='project_tent_date' className='mb-1 mt-0' label="Please select the tentative date to start the project" rules={[
                                {
                                    required: true,
                                    message: 'Please input your Contact Person Name'
                                },
                            ]}
                            >

                                <DatePicker disabledDate={disabledDate} onChange={onChange} />
                            </Form.Item>
                            <div className="text-center lg:text-left mt-2">
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >

                                    Next Step

                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ListingForm