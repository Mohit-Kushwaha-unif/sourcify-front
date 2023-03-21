import React, { useEffect, useState } from 'react'
import {
    Form,
    Input,

} from 'antd';
import * as Contractor_service from '../../../../../services/contractor'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { MinusCircleOutlined } from '@ant-design/icons';
const FinancialDetail = ({ formValues,isClicked }) => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const [pan_imaged, set_panImageD] = useState('')
    const [gstImageD, set_gstImageD] = useState('')
    const [isPANchange, setIsPANchange] = useState(false)
    const [valid_pan, set_Valid_pan] = useState(false)
    const [valid_gst, set_Valid_gst] = useState(false)
    const [showGstImage, setShowGstImage] = useState(false)
    const [initialpan, setStateInitialpan] = useState('')
    const [initialgst, setStateInitialgst] = useState('')
    const [turnover, setTurnover] = useState([])
    useEffect(() => {
        if (formValues.pan_number != "not provided") {
            setIsPANchange(true)
            setStateInitialpan(formValues.pan_number)
        }
        if (formValues.gst_number != "not provided") {
            setShowGstImage(true)
            setStateInitialgst(formValues.gst_number)
        }
        var data = []
        formValues.turnover.map((val) => {
            console.log(val)

            Object.keys(val).map((turn) => {
                var obj = {}
                obj["name"] = turn
                obj["value"] = val[turn]
                data.push(val)
            })
        })
        setTurnover(data)

    }, [])
    function FormHandler(value) {
        let FormField = { "Turnover": [] }
        let formValue = value

        Object.keys(formValue).map((key) => {
            if (key.includes('Turnover')) {
                var obj = {}
                obj[key] = formValue[key]
                FormField.Turnover.push(obj)
            }
            else {
                FormField[key] = formValue[key]
            }
        })
        // console.log({FormField})
        var formData = new FormData()

        Object.keys(FormField).map((formKey) => {
            console.log({ formKey, FormField })
            console.log({ d: FormField['Turnover'] })
            formData.append(formKey, JSON.stringify(FormField[formKey]))
        })
        formData.append("form_id", formValues._id)
        dispatch(Contractor_service.update_contractor(formData)).then((res) => {
            Swal.fire({
            
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
            })
            navigation('/admin/contractors-list')
        })
            // Catch errors if any
            .catch((err) => {
                Swal.fire({
                   
                    icon: 'error',
                    title: err.response.data.msg,
                    showConfirmButton: true,

                })
            });

    }
    var year = [];
    var years = []
    formValues.turnover.map((_, index) => {
        Object.keys(_, [index]).map((turnOvers) => {
            console.log(turnOvers)
            years.push(turnOvers)
            year.push(_[turnOvers])
        })
    })
    function ValidateGSTNumber(event) {
        let text = event.target.value
        setStateInitialgst(text)
        var regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (text.length < 1) {
            set_Valid_gst(false)
        }
        else if (regex.test(text)) {
            set_Valid_gst(false)
        } else {
            set_Valid_gst(true)
        }

    } function pan_img_value(e) {
        set_panImageD(e.target.files[0])
    } const pancardValidation = (event) => {
        let text = event.target.value
        setStateInitialpan(text)
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
    function gst_img_value(e) {
        set_gstImageD(e.target.files[0])
    }
    function clickHnadler(){
        isClicked(2)
    }
    return (
        <div className='bg-white p-3 rounded-xl '>
            <Form labelAlign="left"
                layout="vertical"
                fields={[turnover,
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
                        name: [`Turnover_${new Date().getFullYear() - 1}`],
                        value: year[1]
                    },
                    {
                        name: [`Turnover_${new Date().getFullYear() - 2}`],
                        value: year[2]
                    },

                    {
                        name: ["pan_number"],
                        value: initialpan.replace(/[\[\]\\",]/g,'')
                    },
                    {
                        name: ["gst_number"],
                        value: initialgst.replace(/[\[\]\\",]/g,'')
                    },

                ]}
                onFinish={FormHandler}>
                <div className='mb-2'>Last Three Years Turnovers<span className='intialValue'></span></div>
                <Form.Item name={years[0]} label={`Turnover of ${new Date().getFullYear()}`} rules={[
                    {
                        required: true,
                        message: 'Please input your Bank Overdraft Limit'
                    },
                ]}
                >

                    <Input />
                </Form.Item>
                <Form.Item name={`${years[1]}`} label={`Turnover of ${new Date().getFullYear() - 1}`} rules={[
                    {
                        required: true,
                        message: 'Please input your Bank Overdraft Limit'
                    },
                ]}
                >

                    <Input />
                </Form.Item>
                <Form.Item name={years[2]} label={`Turnover of ${new Date().getFullYear() - 2}`} rules={[
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
                <Form.Item name="consumed" label="Consumed "
                    className="mt-0"
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

                        {
                            isPANchange ? <><div>Copy Of PAN</div><div className='mt-3 inline-block'>
                            <span className='text-[#FF5757] font-bold underline mr-3'><a href={formValues.pan_image} target="_blank" download>
                              Preview</a> </span> <span className='font-bold cursor-pointer underline' onClick={() => setIsPANchange(false)} >Delete</span>
                          </div> </> : <Form.Item name="pan_image" label="PAN Image" rules={[
                                    {
                                        required: true,
                                        message: 'Please provide pan image!'
                                    },
                                ]}> <Input type='file' max={1} onChange={pan_img_value} />
                                </Form.Item>
                        }


                    </div>
                </div>

                <div className='form_email_mobile_flex'>
                    <div className='form_flex_children mr-2'>
                        <Form.Item name="gst_number" className='mb-0' label="GST Number">
                            <Input onChange={ValidateGSTNumber} />
                        </Form.Item>
                        {valid_gst && <span style={{ color: '#ff4d4f' }}>Please Enter valid GST Number*</span>}</div>

                    <div className='form_flex_children '>
                        {showGstImage ? <><div>Copy Of GST</div><div className='mt-3 inline-block'>
                          <span className='text-[#FF5757] underline mr-3'><a href={formValues.gst_image} target="_blank" download>
                            Preview</a> </span> <span className='text-[#FF5757] cursor-pointer underline' onClick={() => setShowGstImage(false)} >Delete</span>
                        </div> </> : <Form.Item name="gst_image" label="Copy Of GST" >
                                <Input type='file' max={1} onChange={gst_img_value} />
                            </Form.Item>}
                    </div> </div>






                <div className="flex justify-between text-center lg:text-left mt-3">
                    <button className='primary_btn  inline-block px-7 py-3 bg-[#FF5757] text-white font-medium text-sm leading-snug uppercase rounded-[50px] shadow-md hover:bg-[#FF5759] rounded-[50px] hover:shadow-lg focus:bg-[#FF5757] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FF5757] active:shadow-lg transition duration-150 ease-in-out'  onClick={clickHnadler}>
                        Back
                    </button>

                    <button
                        type="submit"
                        className="primary_btn"
                    >
                        Save details
                    </button>
                </div>

            </Form>
        </div>

    )
}

export default FinancialDetail