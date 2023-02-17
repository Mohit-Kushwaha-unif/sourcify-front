import React from 'react'
import {
    Form,
    Input,

  } from 'antd';
import * as Contractor_service from '../../../../../services/contractor'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const FinancialDetail = ({formValues}) => {
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
        formData.append("form_id",formValues._id)
        dispatch(Contractor_service.update_contractor(formData)).then((res) => {     
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                  })
                  navigation('/admin/contractors-list')
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
       var year=[];
       formValues.turnover.map((_,index)=>{
        Object.keys(_,[index]).map((turnOvers)=>{
            console.log(turnOvers)
            year.push(_[turnOvers])
           })
       })
      
    //    formValues.turnover.map((totalTurn,index)=>{
    //     year =totalTurn[index]
    //     prevYear = 
    //    })
       console.log({dd:formValues.turnover,year})
    return (
        <div className='bg-white p-3 rounded-xl '>
                        <Form labelAlign="left"
                            layout="vertical"
                            fields={[
                                {
                                    name: ["Approved_Limit"],
                                    value: formValues.bank_overdraft[0].approved
                                },
                                {
                                    name: ["consumed"],
                                    value: formValues.bank_overdraft[0].consumed
                                },
                                {
                                    name: [`Turnover_${new Date().getFullYear()}`],
                                    value: year[0]
                                },
                                {
                                    name: [`Turnover_${new Date().getFullYear()-1}`],
                                    value: year[1]
                                },
                                {
                                    name: [`Turnover_${new Date().getFullYear()-2}`],
                                    value: year[2]
                                },
                            ]}
                            onFinish={FormHandler}>
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
                                    
                                    Submit & Save details
                                   
                                </button>
                            </div>
                            </Form.Item>
                        </Form>
                    </div>
              
    )
}

export default FinancialDetail