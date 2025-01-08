/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Form, Select, Tag, Upload, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useSendUploadFileMutation, useSendThumbnailFileMutation, useRemoveImageMutation } from "../../redux/api/upload-api";
import { useEffect } from "react";

const options = [
  { value: 'red' },
  { value: 'blue' },
  { value: 'green' },
  { value: 'yellow' },
  { value: 'orange' },
  { value: 'purple' },
  { value: 'pink' },
  { value: 'brown' },
  { value: 'black' },
  { value: 'white' },
  { value: 'gray' },
  { value: 'cyan' },
  { value: 'magenta' },
  { value: 'maroon' },
  { value: 'navy' },
  { value: 'teal' },
  { value: 'olive' },
  { value: 'beige' },
  { value: 'coral' },
  { value: 'lavender' },
  { value: 'gold' },
  { value: 'lime' },
  { value: 'silver' },
  { value: 'indigo' },
  { value: 'violet' },
  { value: 'peach' },
  { value: 'turquoise' },
  { value: 'salmon' },
  { value: 'ivory' },
  { value: 'khaki' },
  { value: 'plum' },
  { value: 'orchid' },

];

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  return (
        
    <Tag
    color={value}
    onMouseDown={onPreventMouseDown}
    closable={closable}
    onClose={onClose}
    style={{
      marginInlineEnd: 4,
    }}
  >
    {label}
  </Tag>
      )
    
}

// eslint-disable-next-line no-unused-vars
const VisualInformations = ({carData, setCarData}) => {
  const [form] = useForm()
  const [sendUploadFile, {data}] = useSendUploadFileMutation()
  const [sendThumbnailFile, {data: thumbnailData}] = useSendThumbnailFileMutation()
  // eslint-disable-next-line no-unused-vars
  const [removeImage, {data: removeImageData}] = useRemoveImageMutation()

    useEffect(() => {
      if (data?.payload) {
        setCarData(prevData => ({ ...prevData, images: data.payload }));
      }
    }, [data]);
  
    useEffect(() => {
      if (thumbnailData?.payload) {
        setCarData(prevData => ({ ...prevData, thumbnail: thumbnailData.payload }));
      }
    }, [thumbnailData]);

    
  useEffect(() => { 
    form.setFieldsValue(carData); 
  }, [carData]) 



  const handleFormChange = () => {
    const values = form.getFieldsValue()
    setCarData({...carData, ...values, images: carData.images, thumbnail: carData.thumbnail})
  }
  const handleRemoveImage = (id) => {
    removeImage(id.name)
  }
  const handleUploadFiles = ({file, fileList}) => {
    if(file.status !== "uploading") {
      const formData = new FormData()

      for (let i = 0; i < fileList.length; i++) {
        formData.append("files", fileList[i].originFileObj) 
      }
      sendUploadFile(formData)
    }
    setCarData({...carData, images: data?.payload})
  }
  const handleThumbnailFiles = ({file}) => {
    if(file.status !== "uploading") {
      const formData = new FormData()
      formData.append("file", file)
      sendThumbnailFile(formData)
    }
    setCarData({...carData, thumbnail: thumbnailData?.payload})
  }

  return (
    <Form form={form} initialValues={carData} onValuesChange={handleFormChange} layout="vertical" className="flex flex-col" size="large">
      <div className="flex items-end justify-between">
      <div>
      <Form.Item
        label="Car Images"
        name="images"
        rules={[{ required: true, message: "Please upload car images" }]}
      >
        <Upload
              
              fileList={
                Array.isArray(carData?.images)
                  ? carData?.images?.map((image) => ({
                      uid: image,
                      name: image,
                      url: image,
                    }))
                  : []
              }
              className="w-full overflow-scroll"
              listType="picture-card"
              onRemove={(data) => handleRemoveImage(data)}
              multiple
              beforeUpload={() => false}
              onChange={handleUploadFiles}
            >
              <div>
                <UploadOutlined />
                <div className="mt-2">Upload</div>
              </div>
            </Upload>
      </Form.Item>

      <Form.Item
        label="Thumbnail Image"
        name="thumbnail"
        rules={[{ required: true, message: "Please upload a thumbnail image" }]}
      >
        <Upload
              onRemove={(data) => handleRemoveImage(data)}
      fileList={
        carData?.thumbnail
          ? [
              {
                uid: carData?.thumbnail,
                name: carData?.thumbnail,
                url: carData?.thumbnail,
              },
            ]
          : null
      }
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
      </div>
      <div>
      <Form.Item
        className="flex-1 w-full"
        label="Usage Per KM"
        name="usage_per_km"
        rules={[{ required: true, message: "Please enter the usage per km" }]}
      >
        <InputNumber className="w-full" placeholder="Enter usage per km" />
      </Form.Item>
      </div>

      </div>
      <div className="flex items-center gap-5">
        <Form.Item

          className="flex-1"
          label="Primary Color"
          name="color"
          rules={[
            { required: true, message: "Please enter the primary color" },
          ]}
        >
           <Select
      style={{
        width: 120,
      }}
      options={options}
    />
        </Form.Item>

        <Form.Item

          className="flex-1"
          label="Available Colors (HEX Code)"
          name="colors"
          rules={[{ required: true, message: "Please enter available colors" }]}
        >   
       <Select
    mode="multiple"
    tagRender={tagRender}
    style={{
      width: '100%',
    }}
    options={options}
  />
        </Form.Item>
      </div>

      <div className="flex items-center gap-5">
        <Form.Item
          className="flex-1"
          label="Purchase Price"
          name="price"
          rules={[
            { required: true, message: "Please enter the purchase price" },
          ]}
        >
          <InputNumber
            min={0}
            formatter={(value) => `$ ${value}`}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            placeholder="Enter purchase price"
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Rent Price"
          name="rent_price"
          rules={[{ required: true, message: "Please enter the rent price" }]}
        >
          <InputNumber
            min={0}
            formatter={(value) => `$ ${value}`}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            placeholder="Enter rent price"
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          label="Discount Rent Car"
          name="discount"
          rules={[{ required: false }]}
        >
          <InputNumber
            min={0}
            formatter={(value) => `${value}`}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            placeholder="Enter discount rent price (optional)"
            className="w-full"
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default VisualInformations;
