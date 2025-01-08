/* eslint-disable react/prop-types */
import { Button, Form, Input, message, Modal, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSendThumbnailFileMutation } from "../../redux/api/upload-api";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import {
  useCreateCategoriesMutation,
  useUpdateCategoriesMutation,
} from "../../redux/api/categories-api";


const expectedFields = [
    
  "name",
  "image",
  "status",
];

const CategoryModal = ({ open, setOpen, categoryData: updateData }) => {
  const [form] = useForm();
  const [categoryData, setCategoryData] = useState({
    name: "",
    status: "",
    image: [],
  });

  const [sendThumbnailFile, { data: thumbnailData }] =
    useSendThumbnailFileMutation();
  const [createCategories, { data: createData, isSuccess }] =
    useCreateCategoriesMutation();
  const [updateCategories, { data: updateSuccessData, isSuccess: updateSuccess }] = useUpdateCategoriesMutation()
  const onFinish = () => {
    const filteredCarData = Object.fromEntries(
      Object.entries(categoryData).filter(([key]) => expectedFields.includes(key))
    );
    if(updateData && updateData._id) {
      updateCategories({body: filteredCarData, id: updateData._id})
   }
    else {
      createCategories(filteredCarData);
    }
  };

  
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleThumbnailFiles = ({ file }) => {
    if (file.status !== "uploading") {
      const formData = new FormData();
      formData.append("file", file);
      sendThumbnailFile(formData);
    }
  };

  const handleFormChange = (values) => {
    setCategoryData({...categoryData, ...values});
  };
  useEffect(() => {
    if (thumbnailData?.payload) {
      setCategoryData((prevData) => ({
        ...prevData,
        image: thumbnailData?.payload,
      }));
      form.setFieldsValue({ image: thumbnailData?.payload });
    }
  }, [thumbnailData]);


  useEffect(() => {
    if (updateData) {
      setCategoryData({...categoryData, ...updateData});
    }
  }, [updateData]);

  useEffect(() => {
    if(categoryData) {
      form.setFieldsValue(categoryData);
    }
  }, [categoryData])


  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      message.success(createData?.message);
      form.resetFields(); 
      setCategoryData({ name: "", status: "", image: [] });
    }
  }, [createData, isSuccess]);

  
  useEffect(() => {
    if (updateSuccess) {
      setOpen(false);
      message.success(createData?.message);
      form.resetFields(); 
      setCategoryData({ name: "", status: "", image: [] });
    }
  }, [updateSuccessData, updateSuccess]);

  return (
    <div>
      <Modal
        forceRender={true}
        title="Title"
        open={open}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          forceRender={true}
          onValuesChange={handleFormChange}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
          size="large"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex items-center justify-between">
            <Form.Item
              label="Thumbnail Image"
              name="image"
              rules={[
                { required: true, message: "Please upload a thumbnail image" },
              ]}
            >
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                onChange={handleThumbnailFiles}
              >
                <div>
                  <UploadOutlined />
                  <div className="mt-2">Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item
              className="flex-1"
              name="status"
              rules={[{ required: true, message: "Please enter the status" }]}
            >
              <Select
                style={{
                  width: "100%",
                }}
                options={[
                  {
                    value: "active",
                    label: "active",
                  },
                  {
                    value: "inactive",
                    label: "inactive",
                    disabled: true,
                  },
                ]}
              />
            </Form.Item>
          </div>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryModal;
