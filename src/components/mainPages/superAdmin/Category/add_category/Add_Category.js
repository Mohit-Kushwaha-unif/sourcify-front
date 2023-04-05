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
import { add_category } from '../../../../../services/category';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const Add_Category = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
                <Form.Item name="category" label="Category Name " rules={[
                    {
                        required: true,
                        message: 'Please input your Category!'
                    },
                ]}
                >
                  <Input placeholder='Enter the Categoy name you want to add'/>
                </Form.Item>
                <div className='mb-2 '>Click Button To Add its Sub Category <span className='intialValue'></span></div>
                <Form.List name="sub_categories">
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
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
        
      
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