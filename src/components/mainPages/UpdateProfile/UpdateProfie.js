import { Button, Form, Input } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { get_user_info, update_user } from '../../../services/user'
import useDocumentTitle from '../../Helper/useDocumentTitle'

const UpdateProfie = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useDocumentTitle('Edit Profile')
    const [initialValue,setInitialValue] = useState([])
    const [isContractor,setIsContractor] = useState()
    var formValue = []
    useEffect(()=>{
        dispatch(get_user_info({user_id:localStorage.getItem('user_id')})).then((res)=>{
          
            var obj = {}
            obj.name = "email"
            obj.value= res.email
            setInitialValue(prevState=>[...prevState,obj])
            formValue.push(obj)
            obj = {}
            obj.name = "number"
            obj.value= res.number
            setInitialValue(prevState=>[...prevState,obj])
            if(Object.keys(res).includes('contractor_id')){
                setIsContractor({is:false, _id:res.contractor_id._id})
            }
            if(Object.keys(res).includes('vendor_id')){
                setIsContractor({is:true, _id:res.vendor_id._id})
            }
        })
        // setInitialValue(formValue)
    },[])
    console.log(initialValue)
    const FormHandler = (value) => {
        value.id = localStorage.getItem('user_id')
        dispatch(update_user(value)).then((res)=>{
            console.log(res)
        })
     }

     function navigationHandler(){
        // console.log(isContractor)
        // return false
        if(isContractor === undefined){
            Swal.fire('Please Contact us ', 'Problem with your profile', 'warning')
        }
        if(isContractor?.is === true){
            navigate('/edit-company',{state:{_id:isContractor._id}})
        }
        if(isContractor?.is === false){
            navigate('/edit-contractors',{state:{_id:isContractor._id}})
        }
        
     }
    return (
        <section className="min-h-min  flex flex-col  w-full sm:px-6 lg:px-8" >
            <div className=" h-auto text-gray-800">
                <div
                    className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-auto "
                >
                    <div className="xl:ml-20 xl:w-11/12 lg:w-11/12 md:w-11/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                        <div className="flex flex-row items-center justify-center lg:justify-start">
                            <p className="text-lg mb-0 mr-4">Profile Details</p>
                        </div>
                        <div
                            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                        </div>
                        <Form labelAlign="left"
                               fields={[...initialValue]}
                            layout="vertical" onFinish={FormHandler}>
                            <Form.Item name="email" label="Email " rules={[
                                {
                                    required: true,
                                    message: 'Please input your Bank Overdraft Limit'
                                },
                            ]}
                                className="mb-1"
                            >

                                <Input placeholder='Enter Email' />
                            </Form.Item>
                                    <Form.Item name="number" label="Number " rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Number'
                                        },
                                    ]}
                                        className="mb-1"
                                    >

                                        <Input maxLength={10} minLength={10} type="Number" placeholder='Enter Your Number' />

                                    </Form.Item>
                 


                            <div className="text-center flex justify-center justify-evenly lg:text-left mt-2 mb-3">
                                <Form.Item

                                >
                                    <Button className='form_button inline-block h-auto px-7 py-3 mr-10 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' type="primary" htmlType="submit">
                                        Update
                                    </Button>
                                    <Button onClick={navigationHandler} className='form_button inline-block h-auto px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' type="primary">
                                        NEXT
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpdateProfie