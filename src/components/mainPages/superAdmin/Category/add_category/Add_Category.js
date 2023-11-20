import React from 'react'
import {
    Form,
    Input,
    Space,
    Button,
    Select
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { add_category, get_category, get_category_for_ws } from '../../../../../services/category';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
const Add_Category = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [category, setCategory] = useState([])
    const [image, setImage] = useState()

    useEffect(() => {
        dispatch(get_category_for_ws()).then((res) => {
            setCategory(res);
        });
    }, []);

    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }
    function FormHandler(values) {
        if (image) {
            values.featured_img = image
        }
        var formData = new FormData()
        Object.keys(values).map((formVal) => {

            formData.append(formVal, values[formVal])


        })
        dispatch(add_category(formData)).then((res) => {
            console.log(res)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Category Added Successfully",
                showConfirmButton: true,
            }).then(
                navigate('/admin/category-list')
            )
        })
        console.log(values)
    }
    return (
        <>
            <div className='flex h-auto align-center ml-30 w-full p-2 px-3 '>
                <div className='pt-7 px-7 h-auto w-full bg-white p-3 rounded-xl '>
                    <Form labelAlign="left" name="dynamic_form_nest_item"
                        className='w-full h-auto'
                        layout="vertical"
                        onFinish={FormHandler}>
                        <Form.Item name="name" label="Enter Category Name " rules={[
                            {
                                required: true,
                                message: 'Please input your Category!'
                            },
                        ]}
                        >
                            <Input placeholder='Enter your category name' />
                        </Form.Item>
                        <Form.Item name="parent" label="Select Work Segment " rules={[
                            {
                                required: true,
                                message: 'Please input your Category!'
                            },
                        ]}
                        >
                            <Select placeholder='Select the work segment'
                                showSearch // enable search functionality
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 // case-insensitive search
                                }>
                                <Select.Option value="none">None</Select.Option>
                                {
                                    category.length > 0 && category.map((cat) => {
                                        return <Select.Option value={cat._id}>{cat.name}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item name="description" label="Enter Category description "
                        >
                            <TextArea className='h-16' placeholder='Enter your description' />

                        </Form.Item>
                        <Form.Item name="featured_img" label="Select Category Image "
                        >
                            <Input type='file' onChange={imageHandler} placeholder='Enter your category name' />
                        </Form.Item>
                        <div className="flex items-center justify-center text-center  lg:text-left">
                            <button
                                type="submit"
                                className="primary_btn"
                            >
                                Save Category
                            </button>
                        </div>

                    </Form>
                </div>
            </div>
        </>
    )
}

export default Add_Category