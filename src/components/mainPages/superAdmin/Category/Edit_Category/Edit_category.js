import React, { useEffect } from 'react'
import { Form, Input, Button, Space, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { get_category, update_category } from '../../../../../services/category';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Collapse } from "antd";
import { useLayoutEffect } from 'react';
const { Panel } = Collapse;


const Edit_category = ({ formValues }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showImg, setShowImg] = useState(false)
    const [category, setCategory] = useState([])
    const [formValue, setFormValue] = useState([])
    const [Cat_id, setCat_id] = useState()

    const CategoryList = ({ categories, selectedCategoryId }) => {
        if (category.length > 0) {

            const renderCategories = (categories) => {
                return categories.map((category) => (
                    <Panel key={category._id} header={category.name}>
                        {category.children.length > 0 && (
                            <CategoryList
                                categories={category.children}
                                selectedCategoryId={selectedCategoryId}
                            />
                        )}
                    </Panel>
                ));
            };

            // Find the category object with the selectedCategoryId
            const selectedCategory = categories.find(
                (category) => category._id === selectedCategoryId
            );

            return (
                <Collapse defaultActiveKey={[selectedCategory?._id]}>
                    {renderCategories(selectedCategory?.children || categories)}
                </Collapse>
            );
        };
    }


    useEffect(() => {
        dispatch(get_category()).then((res) => {
            setCategory(res);
        });
    }, []);


    function FormHandler(values) {
        if (values.parent == "none") {
            values.parent = null
        }
        else{
            values.parent = Cat_id
        }
        

        values["id"] = formValues._id
        dispatch(update_category(values)).then((res) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Category Successfully Updated",
                showConfirmButton: true,
            }).then(
                navigate('/admin/category-list')
            )
        })
    }
    var initialValue = []
    useLayoutEffect(() => {
        if (category.length > 0) {
            Object.keys(formValues).map((value) => {

                var obj = {}

                if (value == "parent_cat" || value == "parent") {
                    obj["name"] = "parent"
                    obj["value"] = formValues.parent == null ? "none" : formValues.parent_cat.name 
                    initialValue.push(obj)
                    setCat_id(formValues.parent_cat._id)
                }
                else if (value == "featured_img") {
                    setShowImg(true)
                }
                else {
                    obj["name"] = value
                    obj["value"] = formValues[value]
                    initialValue.push(obj)
                }
            })
            setFormValue([...initialValue])
        }

    }, [formValues,category])
    function selectHandle(val){

        setCat_id(val)
    }
    return (
        <div className='grid grid-cols-5 gap-6  w-full p-2 px-3 '>
            <div className='col-span-2 pt-7 px-7 h-auto w-full bg-white p-3 rounded-xl '>
                <Form labelAlign="left" name="dynamic_form_nest_item"
                    className='w-full h-auto'
                    layout="vertical"
                    fields={[...formValue]}
                    onFinish={FormHandler}>
                    <Form.Item name="name" label="Category Name " rules={[
                        {
                            required: true,
                            message: 'Please input your Category!'
                        },
                    ]}
                    >
                        <Input placeholder='Enter the Categoy name you want to add' />
                    </Form.Item>
                    <Form.Item name="parent" label="Select Work Segment " rules={[
                        {
                            required: true,
                            message: 'Please input your Category!'
                        },
                    ]}
                    >
                        <Select placeholder='Select the work segment' onSelect={selectHandle}>
                            <Select.Option value="none">None</Select.Option>
                            {
                                category.length > 0 && category.map((cat) => {
                                    return <Select.Option value={cat._id}>{cat.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Description of Work Segment " 
                    >
                        <Input placeholder='Enter the Categoy description' />
                    </Form.Item>
                    {
                        showImg ? 
                        <div className='flex justify-between mb-5'>
                        <a href={formValues.featured_img} target="_blank">Preview</a>
                        <p className='cursor-pointer' onClick={()=>setShowImg(false)}>Change</p>
                        </div>
                        : <Form.Item className='mb-5' name="featured_img" label="Featured Image " 
                        >
                            <Input type='file' placeholder='Enter the Categoy name you want to add' />
                        </Form.Item>
                    }

                    

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

                <CategoryList
                    categories={category}
                    selectedCategoryId={formValues._id}
                />
            </div>

        </div>
    )
}

export default Edit_category