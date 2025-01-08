/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber, message, Modal, Upload } from "antd";
import { useRemoveImageMutation, useSendThumbnailFileMutation } from "../../redux/api/upload-api";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../redux/api/userInfo";
import { useForm } from "antd/es/form/Form";

const ProfileModal = ({ open , setOpen, payload }) => {
  const [form] = useForm()
  const [userInfo, setUserInfo] = useState  ({
    first_name: "",
    avatar: [],
    email: "",
    last_name: "",
    balance: 0
  })
  const [sendThumbnailFile, { data }] = useSendThumbnailFileMutation();
  const [updateUser, { data: updateData, isSuccess }] = useUpdateUserMutation();
  const [removeImage, {data: removeImageData}] = useRemoveImageMutation()
  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = () => {
    updateUser({ body: userInfo, id: payload?.payload?._id });
  };
  
  useEffect(() => {
    if (data?.payload) {
      setUserInfo(prevData => ({ ...prevData, avatar: data?.payload }));
    }
  }, [data]);

  useEffect(() => {
    if (updateData?.payload) {
      message.success(updateData?.message);
      setInterval(() => {
        setOpen(false);
      }, 1000)
    }
  }, [updateData, isSuccess])

  
  const handleUploadFiles = ({ file }) => {
    if (file.status !== "uploading") {
      const formData = new FormData();
      formData.append("file", file);
      sendThumbnailFile(formData);
    }
  };
  const handleFormChange = () => {
    const values = form.getFieldsValue();
    setUserInfo({ ...userInfo, ...values, image: userInfo?.image });
  }
  

  console.log(updateData, removeImageData);

  return (
    <div>
       <Modal width={700} title="Title" open={open} onCancel={handleCancel} footer={false}>
          <Form form={form} onValuesChange={handleFormChange} onFinish={onFinish} layout="vertical" autoComplete="off" size="large" >
          
    <div className="flex gap-5">
    <Form.Item
    className="flex-1"
      label="FirstName"
      name="first_name"
      rules={[
        {
          required: true,
          message: 'Please input your FirstName!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item
    className="flex-1"
      label="LastName"
      name="last_name"
      rules={[
        {
          required: true,
          message: 'Please input your LastName!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    </div>
      <div className="flex items-center gap-5 justify-between">
          
        <Form.Item
          label="Email"
          className="flex-1"
          name="email"
          rules={[{ required: true, message: "Please enter the status" }]}
        >   
          <Input/>
        </Form.Item>
        
        <Form.Item
          className="flex-1"
          label="Balance"
          name="balance"
          rules={[{ required: true, message: "Please enter the Balance" }]}
        >   
          <InputNumber className="w-full"/>
        </Form.Item>
      </div>
      
      <Form.Item
          label="Thumbnail Image"
          name="image"
          rules={[
            { required: true, message: "Please upload a thumbnail image" },
          ]}
        >
          
      <Upload
        onChange={handleUploadFiles}
        onRemove={({ file }) => removeImage({ name: file?.name })}
        multiple
        beforeUpload={() => false}
      >
        <Button> Upload Image </Button>
      </Upload>
        </Form.Item>
        
      <Form.Item
      wrapperCol={{
        span: 24,
      }}
    >
      <Button className="w-full" type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
          </Form>
      </Modal>
    </div>
  );
};

export default ProfileModal;
