import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import { useDispatch } from 'react-redux';
import { add_feedback } from '../../../services/FeedBack';
import Accordion from '../../Helper/Accordion';

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
    <div className='container'>
      <h2 className='prime_h2 mt-10 mb-16'>Help & FAQs</h2>
      <Accordion title={"FAQ 1"} children={"Lorem ipsum dolor sit amet consectetur. Vestibulum justo non rutrum pulvinar. Ullamcorper blandit nisi id consectetur tortor phasellus interdum. Duis vitae nulla non orci. A diam et   tristique."} />
      <Accordion title={"FAQ 2"} children={"Lorem ipsum dolor sit amet consectetur. Vestibulum justo non rutrum pulvinar. Ullamcorper blandit nisi id consectetur tortor phasellus interdum. Duis vitae nulla non orci. A diam et   tristique."} />
      <Accordion title={"FAQ 3"} children={"Lorem ipsum dolor sit amet consectetur. Vestibulum justo non rutrum pulvinar. Ullamcorper blandit nisi id consectetur tortor phasellus interdum. Duis vitae nulla non orci. A diam et   tristique."} />

    </div>
  );
};







export default Support