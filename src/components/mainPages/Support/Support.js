import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import { useDispatch } from 'react-redux';
import { add_feedback } from '../../../services/FeedBack';

const Support = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    function feedBackHandler(value) {
        (
          dispatch(add_feedback(value)).then((res) => {
            form.resetFields()
            window.scrollTo(0, 0)
          })
        )
      }
    return (
        <div className="flex flex-col items-center justify-center ">
            <h1 className="text-4xl font-bold mb-6">Support</h1>
          

           
                  
          
            <div className="flex flex-col md:flex-row w-full max-w-3xl">
                <div className="w-full md:w-1/3 p-4">
                    <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                    <p className="mb-4">If you have any questions or issues, please contact us using the information below:</p>
                    <p className="mb-4">Phone: 1-800-555-5555</p>
                    <p className="mb-4">Email: support@example.com</p>
                    <p className="mb-4">Address: 123 Main St, Anytown USA</p>
                </div>
                <div className="w-full md:w-2/3 p-4">
                    <h2 className="text-xl font-bold mb-2">FAQ</h2>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2">What is your return policy?</h3>
                        <p>We offer a 30-day money-back guarantee for all of our products. If you are not satisfied with your purchase, please contact us to initiate a return.</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2">How long does shipping take?</h3>
                        <p>Shipping times vary depending on your location and the shipping method you choose. Please refer to our shipping policy for more information.</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2">Do you offer discounts for bulk orders?</h3>
                        <p>Yes, we offer discounts for bulk orders. Please contact us for more information.</p>
                    </div>
                </div>
            </div>
            <div class=" mb-2   ">
                        <p className='font-semibold mb-2'>Get in touch</p>
                        <Form labelAlign="left"
                            onFinish={feedBackHandler}
                            layout="vertical" >
                            <Form.Item name="fullname" label="Full Name " rules={[
                                {
                                    required: true,
                                    message: 'Please input your Full Name'
                                },
                            ]}
                                className="mb-1"
                            >

                                <Input placeholder='Enter your Full Name' />
                            </Form.Item>
                            <Form.Item name='mobile_number' className='mb-1 mt-0' label="Mobile Number" rules={[
                                {
                                    required: true,
                                    message: 'Please input your Mobile Number'
                                },
                            ]}
                            >

                                <TextArea placeholder='Enter your 10 digit Mobile Number' />
                            </Form.Item>
                            <Form.Item name='email' className='mb-1 mt-0' label="Email ID" rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email ID'
                                },
                            ]}
                            >

                                <Input type='email' placeholder='Enter your Email' />
                            </Form.Item>
                            <Form.Item name='Message' className='mb-1 mt-0' label="Message" rules={[
                                {
                                    required: true,
                                    message: 'Please input your Message'
                                },
                            ]}
                            >

                                <TextArea row={4} cols={50} />
                            </Form.Item>



                            <div className="text-center lg:text-left mt-2">
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                >

                                    Send
                                </button>
                            </div>
                        </Form>
                  

                </div>
        </div>
    );
};







export default Support