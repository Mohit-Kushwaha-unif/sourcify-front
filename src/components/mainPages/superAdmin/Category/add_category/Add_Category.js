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
import { add_category, get_category } from '../../../../../services/category';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
const Add_Category = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
      
      
    function FormHandler(values){
        dispatch(add_category(values)).then((res)=>{console.log(res)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title:"Registerd Added Successfully",
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
                  <Form.Item name="add_category" label="Enter Category Name " rules={[
                    {
                        required: true,
                        message: 'Please input your Category!'
                    },
                ]}
                >
                <Input placeholder='Enter your category name' />
                </Form.Item>
                <Form.Item name="work_segment" label="Select Work Segment " rules={[
                    {
                        required: true,
                        message: 'Please input your Category!'
                    },
                ]}
                >
                  <Select placeholder='Select the work segment'> 
                  <Select.Option value="none">None</Select.Option>
                  {
                     category.length > 0&& category.map((cat)=>{
                        return <Select.Option value={cat}>{cat}</Select.Option>
                    })
                  }
                  </Select>
                </Form.Item>
                
                {/* <div className='mb-2 '>Click Button To Add its Sub Category </div> */}
                {/* <Form.List name="sub_categories">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}

                                    align="baseline"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 ">
                                        <div >
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'name']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Sub Category Name',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Enter Sub Category name" style={{ width: '90%' }} />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'description']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Sub Category Name',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Enter description of Sub Category" style={{ width: '90%' }} />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'featured_img']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Sub Category Name',
                                                    },
                                                ]}
                                            >
                                                <Input type='file' placeholder="Enter Sub Category" style={{ width: '90%' }} />
                                            </Form.Item>
                                           
                                        </div>
                                        <MinusCircleOutlined className='w-0' onClick={() => remove(name)} />
                                    </div>
                                    
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
        
        <Form.Item name="description" label="Enter Category description " 
                >
                <TextArea className='h-16' placeholder='Enter your description' />
                
                </Form.Item>   
                <Form.Item name="featured_img" label="Select Category Image " 
                >
                <Input type='file' placeholder='Enter your category name' />
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