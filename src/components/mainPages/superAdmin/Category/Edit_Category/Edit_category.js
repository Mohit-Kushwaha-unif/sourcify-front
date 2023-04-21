import React, { useEffect } from 'react'
import { Form, Input, Button, Space, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { get_category, update_category } from '../../../../../services/category';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Edit_category = ({ formValues }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [Child, setChild] = useState([])
    const [category, setCategory] = useState([])
    const getAllCategoryNames = (categories) => {
        let categoryNames = [];

        const extractCategoryNames = (category) => {

            if (category.sub_category && category.sub_category.length > 0) {
                category.sub_category.forEach((subCategory) => {
                    extractCategoryNames(subCategory);
                });
            }
        };

        const extractSubCategoryNames = (subCategories) => {
            subCategories.forEach((subCategory) => {
                categoryNames.push(subCategory.name);
                if (subCategory.sub_category && subCategory.sub_category.length > 0) {
                    extractSubCategoryNames(subCategory.sub_category);
                }
            });
        };

        categories.forEach((category) => {
            categoryNames.push(category.category)
            if (category.sub_category && category.sub_category.length > 0) {
                extractSubCategoryNames(category.sub_category);
            }
        });

        return categoryNames;
    };

    useEffect(() => {
        dispatch(get_category()).then((res) => {
            const allCategoryNames = getAllCategoryNames(res);
            setCategory(allCategoryNames);
        });
    }, []);
    const renderCategoryList = (categories, depth = 0) => {
        return (
            <ul className="list-none">
                {categories.map((category, index) => {
                    const { name, sub_category } = category;
                     
                        console.log(category.category || sub_category,name)
                        const subCategories =
                            sub_category && sub_category.length > 0 ? renderCategoryList(sub_category, depth + 1) : null; // Recursively render sub-categories

                        return (
                            <li className="relative" key={index}>
                                {/* Render custom bullet point with indentation based on depth */}
                                <div style={{ paddingLeft: `${depth * 20}px` }}>
                                    <span className="absolute top-[-0.25rem] left-0 mt-0.5">&#8226;</span>
                                    {name}
                                </div>
                                {/* Render sub-categories */}
                                {subCategories}
                            </li>
                        );
                    
                })}
            </ul>
        );
    };
    function FormHandler(values) {
        console.log(formValues)
        values["cat_id"] = formValues._id
        dispatch(update_category(values)).then((res) => {
            console.log(res)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Category Successfully Updated",
                showConfirmButton: true,
            }).then(
                navigate('/admin/category-list')
            )
        })
    }
    var initialValue = []

    Object.keys(formValues).map((value) => {

        var obj = {}
        if (value == "sub_category") {


            obj["name"] = "sub_categories"
            obj["value"] = formValues.sub_category
            initialValue.push(obj)

        } else {
            obj["name"] = value
            obj["value"] = formValues[value]
            initialValue.push(obj)
        }
    })
    console.log(initialValue)
    return (
        <div className='grid grid-cols-5 gap-6  w-full p-2 px-3 '>
            <div className='col-span-2 pt-7 px-7 h-auto w-full bg-white p-3 rounded-xl '>
                <Form labelAlign="left" name="dynamic_form_nest_item"
                    className='w-full h-auto'
                    layout="vertical"
                    fields={[...initialValue]}
                    onFinish={FormHandler}>
                    <Form.Item name="category" label="Category Name " rules={[
                        {
                            required: true,
                            message: 'Please input your Category!'
                        },
                    ]}
                    >
                        <Input placeholder='Enter the Categoy name you want to add' />
                    </Form.Item>
                    <Form.Item name="parent_cat" label="Select Work Segment " rules={[
                        {
                            required: true,
                            message: 'Please input your Category!'
                        },
                    ]}
                    >
                        <Select placeholder='Select the work segment'>
                            <Select.Option value="none">None</Select.Option>
                            {
                                category.length > 0 && category.map((cat) => {
                                    return <Select.Option value={cat}>{cat}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Description of Work Segment " rules={[
                        {
                            required: true,
                            message: 'Please input your Category!'
                        },
                    ]}
                    >
                        <Input placeholder='Enter the Categoy name you want to add' />
                    </Form.Item>

                    <Form.Item name="featured_img" label="Featured Image " rules={[
                        {
                            required: true,
                            message: 'Please input your Category!'
                        },
                    ]}
                    >
                        <Input placeholder='Enter the Categoy name you want to add' />
                    </Form.Item>
                    {/* <div className='mb-2 '>Click Button To Add its Sub Category <span className='intialValue'></span></div>
                <Form.List name="sub_categories">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}

                                    align="baseline"
                                >
                                    <div>
                                        <div >
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'sub_Category']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Sub Category Name',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder=" Enter Sub Category" style={{ width: '90%' }} />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <MinusCircleOutlined className='mr-4' onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List> */}
                    <Form.Item
                    >
                        <div className="text-center flex justify-center lg:text-left">
                            <button
                                type="submit"
                                className="primary_btn inline-block px-7 py-3 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded-[50px] shadow-md hover:bg-[#FF5759] rounded-[50px] hover:shadow-lg focus:bg-[#FF5757] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FF5757] active:shadow-lg transition duration-150 ease-in-out"
                            >
                                Save Category
                            </button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
            <div className='col-span-3 bg-white w-full p-2 rounded-xl'>
                <p>List of children</p>
                {/* <ul>
                { 
                cats.length >0 && cats.map((dets)=>{

                        return  <li className='ml-5'>{dets}</li> 
                })}
                </ul> */}
                {renderCategoryList([formValues])}
            </div>

        </div>
    )
}

export default Edit_category