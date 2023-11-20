import { Button, Form, Input } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { get_user_info, update_user } from '../../../services/user'
import useDocumentTitle from '../../Helper/useDocumentTitle'
import { toast, ToastContainer } from 'react-toastify'
const UpdateProfie = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useDocumentTitle('Edit Profile')
    const [initialValue, setInitialValue] = useState([])
    const [isContractor, setIsContractor] = useState()
    const [contractor, setContractor] = useState()
    var formValue = []
    useEffect(() => {
        dispatch(get_user_info({ user_id: localStorage.getItem('user_id') })).then((res) => {

            var obj = {}
            obj.name = "email"
            obj.value = res.email
            setInitialValue(prevState => [...prevState, obj])
            formValue.push(obj)
            obj = {}
            obj.name = "number"
            obj.value = res.number
            if (res.role == 0) {
                setContractor(true)
            }
            else if (res.role == 1) {
                setContractor(false)
            }

            setInitialValue(prevState => [...prevState, obj])
            if (Object.keys(res).includes('contractor_id')) {
                console.log({ res })

                setIsContractor({ is: false, _id: res.contractor_id._id })
            }
            if (Object.keys(res).includes('vendor_id')) {

                setIsContractor({ is: true, _id: res.vendor_id._id })
            }
        })
        // setInitialValue(formValue)
    }, [])
    const FormHandler = (value) => {
        value.id = localStorage.getItem('user_id')
        dispatch(update_user(value)).then((res) => {

            navigationHandler()
        })

    }

    function navigationHandler() {
        console.log(isContractor, contractor)
        console.log(isContractor === undefined)
        // return false
        if (isContractor === undefined && contractor === true) {
            navigate('/contractor-form')
        }
        if (isContractor === undefined && contractor === false) {
            navigate('/vendor-form')
        }
        if (isContractor?.is === true) {
            navigate('/edit-company', { state: { _id: isContractor._id } })
        }
        if (isContractor?.is === false) {
            navigate('/edit-contractors', { state: { _id: isContractor._id } })
        }

    }
    return (
        <section className="container min-h-min  flex flex-col  w-full " >
            <ToastContainer />
            <div className=" h-auto text-gray-800">
                <div
                    className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-auto "
                >
                    <div className="my-2 mx-4 w-full mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
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



                            <div className="text-center flex flex-col md:flex-row justify-center justify-between lg:text-left mt-2 mb-3">
                                <button className='save_Btn' type="primary">
                                    NEXT
                                </button>

                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpdateProfie