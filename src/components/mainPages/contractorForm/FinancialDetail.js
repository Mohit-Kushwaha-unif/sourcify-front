import React, { useState } from 'react'
import {
    Form,
    Input,

} from 'antd';
import * as Contractor_service from '../../../services/contractor'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
const FinancialDetail = () => {
    const navigation = useNavigate()
    const [valid_pan, set_Valid_pan] = useState(false)
    const [valid_gst, set_Valid_gst] = useState(false)
    const [pan_imaged, set_panImageD] = useState('')
    const [gstImageD, set_gstImageD] = useState('')
    const [isPANchange, setIsPANchange] = useState(false)
    const [showGstImage, setShowGstImage] = useState(true)
    const [initialpan, setStateInitialpan] = useState('')
    const [initialgst, setStateInitialgst] = useState('')
    const [showError,setShowError] = useState(false)
    const [formValues, setformValues] = useState('')
    const [turnover, setTurnover] = useState([])
    useEffect(() => {
        if (formValues.pan_number != "not provided") {

            setStateInitialpan(formValues.pan_number)
        }
        set_panImageD(formValues.pan_image)
        console.log(formValues.gst_image)
        if(formValues.pan_image){
            setIsPANchange(true)
        }
        if (formValues.gst_number != "not provided") {

            setStateInitialgst(formValues.gst_number)
        }
        if (formValues.gst_image === "not provided") {
            setShowGstImage(false)
        }
        else{
            set_gstImageD(formValues.gst_image)
        }

        var data = []
        formValues?.turnover?.map((val) => {
            console.log(val)

            Object.keys(val).map((turn) => {
                var obj = {}
                obj["name"] = turn
                obj["value"] = val[turn]
                data.push(val)
            })
        })
        setTurnover(data)

    }, [formValues])
    useEffect(() => {
        if (localStorage.getItem("form_id")) {
            dispatch(Contractor_service.get_contractorBy_id(localStorage.getItem("form_id"))).then((res) => {
                setformValues(res)

            })
        }

    }, [])
    var year = [];
    var years = []
    formValues?.turnover?.map((_, index) => {
        Object.keys(_, [index]).map((turnOvers) => {
            console.log(turnOvers)
            years.push(turnOvers)
            year.push(_[turnOvers])
        })
    })
    const dispatch = useDispatch()
    function FormHandler(value) {
        let FormField = { "Turnover": [] }
        value.pan_image = pan_imaged
        value.gst_image = gstImageD
        console.log(value.pan_image)
        if(value.pan_image == '' || value.pan_image== undefined){
            setShowError(true)
        }
        else{
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
                    if (key !== "gst_image" && key !== "pan_image")
                        FormField[key] = formValue[key]
                }
            })
    
            var formData = new FormData()
            FormField.pan_image = pan_imaged
    
            if (value.gst_image) {
                FormField.gst_image = gstImageD
            }
            console.log({ FormField })
    
    
    
    
    
            //   formData.append("gst_number",)
            Object.keys(FormField).map((formKey) => {
                console.log({ formKey, FormField })
                console.log({ d: FormField['Turnover'] })
                if (formKey == "Turnover") { formData.append(formKey, JSON.stringify(FormField[formKey])) }
                else {
                    formData.append(formKey, FormField[formKey])
                }
            })
            formData.append("form_id", localStorage.getItem("form_id"))
            dispatch(Contractor_service.update_contractor(formData)).then((res) => {
    
                navigation('/contractor-form/work-experience')
            })
        }
       
        // Catch errors if any


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
    function finishFaild(val){
        console.log(val)

    }
    console.log(formValues.pan_image );
    return (
        <section className="min-h-min mt-10 flex flex-col justify-center py-6 lg:px-8" >
            <div className="px-8 h-full text-gray-800">
                <div
                    className=" flex xl:justify-center lg:justify-center items-center flex-wrap h-full g-6 "
                >
                    <div className="xl:mx-20 xl:w-11/12 lg:w-11/12 md:w-11/12 mb-12 md:mb-0 bg-white border border-black-600 rounded-xl w-full p-6">
                        <div className="flex flex-row items-center justify-center lg:justify-start">
                            <p className="text-lg mb-0 mr-4">Financial Detail</p>
                        </div>
                        <div
                            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                        </div>
                        {formValues.pan_image==undefined|| formValues == '' ?
                         <Form labelAlign="left"

                            layout="vertical" onFinish={FormHandler} onFinishFailed={finishFaild}>
                            <div className='mb-2'>Last Three Years Turnovers<span className='intialValue'></span></div>
                            <div className='grid grid-cols-1  md:grid-cols-3 gap-2'>
                                <Form.Item name={`Turnover_${new Date().getFullYear()}`} label={`Turnover of ${new Date().getFullYear()}`} 
                                >
                                    <Input type='number' placeholder='Please enter turnover amount' />
                                </Form.Item>
                                <Form.Item name={`Turnover_${new Date().getFullYear() - 1}`} label={`Turnover of ${new Date().getFullYear() - 1}`}
                                >

                                <Input type='number'  placeholder='Please enter turnover amount' />
                            </Form.Item>
                            <Form.Item name={`Turnover_${new Date().getFullYear() - 2}`} label={`Turnover of ${new Date().getFullYear() - 2}`} 
                            >

                                <Input type='number' placeholder='Please enter turnover amount'  />
                            </Form.Item>
                            </div>
                            <div className='mb-1'>Bank Overdraft Limit / Solvency Certificate Value</div>
                            <div className='grid grid-cols-1  md:grid-cols-2 gap-2'>
                            <Form.Item name="Approved_Limit" label="Approved Limit " 
                                className="mb-1"
                            >

                                <Input type='number' placeholder='Please enter  amount' />
                            </Form.Item>
                            <Form.Item name="consumed" label="Consumed " className="mt-0"
                            >

                                <Input type='number' placeholder='Please enter turnover amount'  />
                            </Form.Item>
                            </div>
                            <div className='form_email_mobile_flex flex flex-col md:flex-row'>
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
                                <div className='form_flex_children  mr-2'> 
                                    <Form.Item name="pan_image" label="Copy of PAN Card" rules={[
                                    
                                    ]}> <Input type='file'  onChange={pan_img_value} />
                                    </Form.Item>
                                    {showError&& <div className='mb-3' style={{ color: '#ff4d4f' }}>Please attach  Copy of PAN Card*</div>}
                               
                                </div>
                            </div>

                            <div className='form_email_mobile_flex flex flex-col md:flex-row'>
                                <div className='form_flex_children mr-2'>
                                    <Form.Item name="gst_number" className='mb-0' label="GST Number">
                                        <Input onChange={ValidateGSTNumber} placeholder="Please enter your GST Number"/>
                                    </Form.Item>
                                    {valid_gst && <span style={{ color: '#ff4d4f' }}>Please Enter valid GST Number*</span>}</div>

                                <div className='form_flex_children '>
                                <Form.Item name="gst_image" label="Copy of GST Certificate" >
                                            <Input type='file' max={1} onChange={gst_img_value} />
                                        </Form.Item>
                                </div> </div>






                            <div className="text-center lg:text-left flex flex-col flex-col-reverse md:flex-row justify-between">
                                <button
                                    type="submit"
                                    className="back_btn"
                                    onClick={()=>navigation('/contractor-form')}
                                >

                                    Back

                                </button>
                                <button
                                    type="submit"
                                    className="save_Btn"       >

                                    Save

                                </button>
                            </div>
                        </Form> : <Form labelAlign="left"
                        onFinishFailed={finishFaild}
                            fields={[turnover,
                                {
                                    name: ["Approved_Limit"],
                                    value: formValues?.bank_overdraft?.length > 0 ? formValues?.bank_overdraft[0].approved : ''
                                },
                                {
                                    name: ["consumed"],
                                    value: formValues?.bank_overdraft?.length > 0 ? formValues?.bank_overdraft[0].consumed : ''
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
                                    value: initialpan?.replace(/[\[\]\\",]/g,'')
                                },
                                {
                                    name: ["gst_number"],
                                    value: initialgst?.replace(/[\[\]\\",]/g,'')
                                },

                            ]}
                            layout="vertical" onFinish={FormHandler}>
                            <div className='mb-2'>Last Three Years Turnovers<span className='intialValue'></span></div>
                            <div className='grid grid-cols-1  md:grid-cols-3 gap-2'>
                                <Form.Item name={`Turnover_${new Date().getFullYear()}`} label={`Turnover of ${new Date().getFullYear()}`}
                                >

                                    <Input />
                                </Form.Item>
                                <Form.Item name={`Turnover_${new Date().getFullYear() - 1}`} label={`Turnover of ${new Date().getFullYear() - 1}`} 
                                >

                                    <Input type='number' />
                                </Form.Item>
                                <Form.Item name={`Turnover_${new Date().getFullYear() - 2}`} label={`Turnover of ${new Date().getFullYear() - 2}`} 
                                >

                                    <Input type='number' />
                                </Form.Item>
                            </div>
                            <div className='mb-1'>Bank Overdraft Limit / Solvency Certificate Value</div>
                            <div className='grid grid-cols-1  md:grid-cols-2 gap-2'>
                                <Form.Item name="Approved_Limit" label="Approved Limit " 
                                    className="mb-1"
                                >

                                    <Input  type='number'/>
                                </Form.Item>
                                <Form.Item name="consumed" label="Consumed " className="mt-0"
                                >

                                    <Input type='number' />
                                </Form.Item>
                            </div>
                            <div className='form_email_mobile_flex'>
                                <div className='form_flex_children mr-2'>
                                    <Form.Item name="pan_number" label="PAN Number" className='mb-0' rules={[
                                        {
                                            required: true,
                                            message: 'Please provide  PAN number'
                                        },
                                    ]}>
                                    <Input />
                                    </Form.Item>
                                </div>
                                <div className='form_flex_children mr-2'>
                                  
                                    {
                                        isPANchange ? <><div>Copy Of PAN</div> 
                                           <div className='mt-3 inline-block'>
                          <span className='text-[#FF5757] underline mr-3'><a href={formValues.pan_image} target="_blank" download>
                            Preview</a> </span> <span className='text-[#FF5757] cursor-pointer underline' onClick={() => setIsPANchange(false)} >Delete</span>
                        </div>
                         </>                   : <Form.Item name="pan_image" label="Copy of PAN Card" >
                                                 <Input type='file' max={1} onChange={pan_img_value} />
                                            </Form.Item>


                                    }
                                    {showError&& <div  className='mb-3' style={{ color: '#ff4d4f' }}>Please attach  Copy of PAN Card*</div>}
                                </div>
                            </div>

                            <div className='form_email_mobile_flex'>
                                <div className='form_flex_children mr-2'>
                                    <Form.Item name="gst_number" className='mb-0' label="GST Number">
                                        <Input placeholder='Enter your GST Number' onChange={ValidateGSTNumber} />
                                    </Form.Item>
                                    {valid_gst && <span style={{ color: '#ff4d4f' }}>Please Enter valid GST Number*</span>}</div>

                                <div className='form_flex_children '>
                                    {showGstImage ? <><div>Copy of GST Certificate</div>
                                    <div className='mt-3 inline-block'>
                          <span className='text-[#FF5757] underline mr-3'><a href={formValues.gst_image} target="_blank" download>
                            Preview</a> </span> <span className='text-[#FF5757] cursor-pointer underline' onClick={() => setShowGstImage(false)} >Delete</span>
                        </div> </>           : <Form.Item name="gst_image" label="Copy of GST Certificate" >
                                            <Input type='file' max={1} onChange={gst_img_value} />
                                        </Form.Item>}
                                </div> </div>






                            <div className="text-center lg:text-left flex flex-col flex-col-reverse md:flex-row justify-between">
                                <button
                                    type="submit"
                                    className="back_btn"
                                    onClick={()=>navigation('/contractor-form')}
                               >

                                    Back

                                </button>
                                <button
                                    type="submit"
                                    className="save_Btn"
                                >

                                    Save

                                </button>
                            </div>
                        </Form>
                   
}
</div>
                </div>
            </div>
        </section>
    )
}

export default FinancialDetail