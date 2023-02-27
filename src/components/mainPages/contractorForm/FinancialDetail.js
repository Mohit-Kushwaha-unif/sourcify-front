import React, { useState } from 'react'
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
    const [valid_pan, set_Valid_pan] = useState(false)
    const [valid_gst, set_Valid_gst] = useState(false)
    const [pan_imaged, set_panImageD] = useState('')
    const [gstImageD, set_gstImageD] = useState('')
    const dispatch = useDispatch()
    function FormHandler(value) {
        let FormField = { "Turnover": [] }
  
          if (!value.gst_number) {
            value.gst_number = "N/A"
          }
        let formValue = value

        Object.keys(formValue).map((key) => {
            if (key.includes('Turnover')) {
                var obj = {}
                obj[key] = formValue[key]
                FormField.Turnover.push(obj)
            }
            else {
                if(key!=="gst_image" && key !=="pan_image")
                FormField[key] = formValue[key]
            }
        })
        
        var formData = new FormData()
        FormField.pan_image = pan_imaged

          if (value.gst_image) {
            FormField.gst_image = gstImageD
          }
          console.log({FormField})
         
       
      
          
         
        //   formData.append("gst_number",)
        Object.keys(FormField).map((formKey) => {
            console.log({ formKey, FormField })
            console.log({ d: FormField['Turnover'] })
            if(formKey=="Turnover")
            {formData.append(formKey, JSON.stringify(FormField[formKey]))}
            else{
                formData.append(formKey, FormField[formKey])
            }
        })
        formData.append("form_id", localStorage.getItem("form_id"))
        dispatch(Contractor_service.update_contractor(formData)).then((res) => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
            }).then(() => {
                 navigation('/contractor-form/work-experience')
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
    const pancardValidation = (event) => {
        let text = event.target.value
        var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (text.length < 1) {
            set_Valid_pan(false)
        }

        else if (regex.test(text)) {
            set_Valid_pan(false)
        } else {
            set_Valid_pan(true)
        }
    }

    function ValidateGSTNumber(event) {
        let text = event.target.value
        var regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (text.length < 1) {
            set_Valid_gst(false)
        }
        else if (regex.test(text)) {
            set_Valid_gst(false)
        } else {
            set_Valid_gst(true)
        }

    }
    function pan_img_value(e) {
        set_panImageD(e.target.files[0])
    }
    function gst_img_value(e) {
        set_gstImageD(e.target.files[0])
    }

    return (
        <section className="min-h-min mt-10 flex flex-col justify-center py-6 sm:px-6 lg:px-8" >
            <div className="px-8 h-full text-gray-800">
                <div
                    className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 "
                >
                    <div className="xl:ml-20 xl:w-5/12 lg:w-11/12 md:w-11/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl p-6">
                        <div className="flex flex-row items-center justify-center lg:justify-start">
                            <p className="text-lg mb-0 mr-4">Financial Detail</p>
                        </div>
                        <div
                            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                        </div>
                        <Form labelAlign="left"
                            layout="vertical" onFinish={FormHandler}>
                                 <div className='mb-2'>Last Three Years Turnovers<span className='intialValue'></span></div>
                            <Form.Item name={`Turnover_${new Date().getFullYear()}`} label={`Turnover of ${new Date().getFullYear()}`} rules={[
                                {
                                    required: true,
                                    message: 'Please input your Bank Overdraft Limit'
                                },
                            ]}
                            >

                                <Input />
                            </Form.Item>
                            <Form.Item name={`Turnover_${new Date().getFullYear() - 1}`} label={`Turnover of ${new Date().getFullYear() - 1}`} rules={[
                                {
                                    required: true,
                                    message: 'Please input your Bank Overdraft Limit'
                                },
                            ]}
                            >

                                <Input />
                            </Form.Item>
                            <Form.Item name={`Turnover_${new Date().getFullYear() - 2}`} label={`Turnover of ${new Date().getFullYear() - 2}`} rules={[
                                {
                                    required: true,
                                    message: 'Please input your Bank Overdraft Limit'
                                },
                            ]}
                            >

                                <Input />
                            </Form.Item>
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
                            <Form.Item name="consumed" label="Consumed " className="mt-0"
                            >

                                <Input />
                            </Form.Item>
                            <div className='form_email_mobile_flex'>
                                <div className='form_flex_children mr-2'>
                                    <Form.Item name="pan_number" label="PAN Number" className='mb-0' rules={[
                                        {
                                            required: true,
                                            message: 'Please provide pan number!'
                                        },
                                    ]}
                                    >
                                        <Input onChange={pancardValidation} maxLength={10} minLength={10} placeholder='Enter Your PAN Number' />
                                    </Form.Item>
                                    {valid_pan && <span style={{ color: '#ff4d4f' }}>Please Enter valid PAN Number*</span>}

                                </div>
                                <div className='form_flex_children mr-2'>
                                    <Form.Item name="pan_image" label="PAN Image" rules={[
                                        {
                                            required: true,
                                            message: 'Please provide pan image!'
                                        },
                                    ]}>

                                        <Input type='file' max={1} onChange={pan_img_value} />
                                    </Form.Item>
                                </div>
                            </div>

                            <div className='form_email_mobile_flex'>
                                <div className='form_flex_children mr-2'>
                                    <Form.Item name="gst_number" className='mb-0' label="GST Number">
                                        <Input placeholder='Enter your GST Number' onChange={ValidateGSTNumber} />
                                    </Form.Item>
                                    {valid_gst && <span style={{ color: '#ff4d4f' }}>Please Enter valid GST Number*</span>}</div>

                                <div className='form_flex_children '>
                                    <Form.Item name="gst_image" label="GST Image" >
                                        <Input type='file' max={1} onChange={gst_img_value} />
                                    </Form.Item>
                                </div> </div>
                           





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