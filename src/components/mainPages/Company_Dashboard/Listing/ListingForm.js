import { Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import state_cites from '../../../../assests/state_city.'
import { get_category } from '../../../../services/category'

const ListingForm = () => {
    const form = useForm()
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [sub_cat, setSub_cat] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    useEffect(() => {
        dispatch(get_category()).then((res) => {
            // console.log(res)
            res.map((cat) => {

                setSub_cat((prev_state) => [...prev_state, cat])
                setCategories((prev_state) => [...prev_state, cat.category])
            })
        })
    }, [])
    console.log(sub_cat, selectedItems)
    // sub_cat.map((categories)=>{
    //     categories.category ===selectedItems
    // })

    const filteredOptions = categories.filter((o) => !selectedItems.includes(o))


    function FormHandler(values) {
        console.log(values)
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
                            <Form.Item name="project_name" label="Name of Project " rules={[
                                {
                                    required: true,
                                    message: 'Please input your Bank Overdraft Limit'
                                },
                            ]}
                                className="mb-1"
                            >

                                <Input placeholder='Enter name of your Project' />
                            </Form.Item>

                            <Form.Item name='project_discription' className='mb-1 mt-0' label="Write the Description of Your Project" rules={[
                                {
                                    required: true,
                                    message: 'Please input your Contact Person Name'
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
                                    console.log(sub_item, sub_category.category)
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
          
          <Select id="country-state" mode="multiple" name="prefferd_state"  placeholder="Select State" onSelect={countrySelectHandler}>
          <Select.Option value="All State">All State</Select.Option>
         { Object.keys(state_cites).map((state)=>{
            return (<Select.Option value={state}>{state}</Select.Option>)
            }
          )}
      </Select>
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