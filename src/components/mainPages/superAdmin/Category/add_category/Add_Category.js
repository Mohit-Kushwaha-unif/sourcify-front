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
            position: 'top-end',
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
                <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
                <div className="text-center lg:text-left">
                    <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                       Save Category
                    </button>
                </div>
                </Form.Item>
            </Form>
            </div>
        </div>
    </>
  )
}

export default Add_Category