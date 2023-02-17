import React from 'react'
import {
    Form,
    Input,

  } from 'antd';
import * as Contractor_service from '../../../services/contractor'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
const FinancialDetail = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    function FormHandler(value){
        let FormField = {"Turnover":[]}
        let formValue = value

        Object.keys(formValue).map((key)=>{
            if(key.includes('Turnover')){
                var obj ={}
                obj[key] = formValue[key]
                FormField.Turnover.push(obj)
            }
            else{
                FormField[key] = formValue[key]
            }
        })
        // console.log({FormField})
        var formData = new FormData()
        
        Object.keys(FormField).map((formKey)=>{
            console.log({formKey,FormField})
            console.log({d:FormField['Turnover']})
          formData.append(formKey, JSON.stringify(FormField[formKey]) )
        })
        formData.append("form_id", localStorage.getItem("form_id"))
        dispatch(Contractor_service.update_contractor(formData)).then((res) => {     
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                  })
                  
                 })
                // Catch errors if any
                .catch((err) => {   
                   Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: err.response.data.msg,
                  showConfirmButton: true,
                  
                })
            });
            
       }
    return (
        <section className="min-h-min mt-10 flex flex-col justify-center py-6 sm:px-6 lg:px-8" >
            <div className="px-8 h-full text-gray-800">
                <div
                    className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 "
                >
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                        <div className="flex flex-row items-center justify-center lg:justify-start">
                            <p className="text-lg mb-0 mr-4">Financial Detail</p>
                        </div>
                        <div
                            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                        </div>
                        <Form labelAlign="left"
                            layout="vertical" onFinish={FormHandler}>
                            <div className='mb-1'>Bank Overdraft Limit / Solvancy Certificate Value</div>
                            <Form.Item name="Approved_Limit" label="Approved Limit " rules={[
                                {
                                    required: true,
                                    message: 'Please input your Bank Overdraft Limit'
                                },
                            ]}
                            className="mb-1"
                            >

                                <Input />
                            </Form.Item>
                            <Form.Item name="consumed" label="Consumed " rules={[
                                {
                                    required: true,
                                    message: 'Please input your Bank Overdraft Limit'
                                },
                            ]}
                            className="mt-0"
                            >

                                <Input />
                            </Form.Item>
                         
                            <div className='mb-2'>Last Three Years Turnovers<span className='intialValue'>*</span></div>
                            <Form.Item name={ `Turnover_${new Date().getFullYear()}`} label={ `Turnover of ${new Date().getFullYear()}`} rules={[
                                {
                                    required: true,
                                    message: 'Please input your Bank Overdraft Limit'
                                },
                            ]}
                            >

                                <Input />
                            </Form.Item>
                            <Form.Item name={ `Turnover_${new Date().getFullYear()-1}`} label={ `Turnover of ${new Date().getFullYear() -1}`} rules={[
                                {
                                    required: true,
                                    message: 'Please input your Bank Overdraft Limit'
                                },
                            ]}
                            >

                                <Input />
                            </Form.Item>
                            <Form.Item name={ `Turnover_${new Date().getFullYear()-2}`} label={ `Turnover of ${new Date().getFullYear() -2}`}  rules={[
                                {
                                    required: true,
                                    message: 'Please input your Bank Overdraft Limit'
                                },
                            ]}
                            >

                                <Input />
                            </Form.Item>
                            




                            <div className="text-center lg:text-left">
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

export default FinancialDetail