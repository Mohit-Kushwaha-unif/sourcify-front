import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../../../../../services/Post';


const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formHandler = (values) => {
    dispatch(addPost(values)).then(() => {
      navigate('/admin/post-list');
    });
  };

  return (
    <div className="flex h-auto align-center ml-30 w-full p-2 px-3">
      <div className="pt-7 px-7 h-auto w-full bg-white p-3 rounded-xl">
        <h1 className="mb-3">Enter Notification Details</h1>
        <Form
          labelAlign="left"
          layout="vertical"
          onFinish={formHandler}
        >
          <Form.Item
            name="title"
            label="Title of Image"
            rules={[
              {
                required: true,
                message: 'Please input title of post',
              },
            ]}
            className="mb-1"
          >
            <Input placeholder="Enter Title of Notification" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description of Notification"
            rules={[
              {
                required: true,
                message: 'Please input Name of your project',
              },
            ]}
            className="mb-1 mt-0"
          >
            <TextArea placeholder="Enter Description" />
          </Form.Item>

          <Button
            className="brand_button mt-3"
            type="primary"
            htmlType="submit"
          >
            SAVE
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddPost;
