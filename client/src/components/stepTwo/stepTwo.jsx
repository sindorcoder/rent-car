import { Form, Select, InputNumber } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

const { Option } = Select;

// eslint-disable-next-line react/prop-types
const TechnicalInformations = ({carData, setCarData}) => {
  const [form] = useForm()

  const handleFormChange = () => {
    const values = form.getFieldsValue()
    setCarData({...carData, ...values})
  }

  useEffect(() => { 
    form.setFieldsValue(carData); 
  }, [carData]) 

  return (
    <Form form={form} initialValues={carData} onValuesChange={handleFormChange} layout="vertical" className="space-y-6" size="large">
      <Form.Item
        label="Fuel Type"
        name="fuel"
        rules={[{ required: true, message: "Please select the fuel type" }]}
      >
        <Select placeholder="Select fuel type">
          <Option value="petrol">Petrol</Option>
          <Option value="diesel">Diesel</Option>
          <Option value="electric">Electric</Option>
          <Option value="hybrid">Hybrid</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Transmission Type"
        name="transmission"
        rules={[
          { required: true, message: "Please select the transmission type" },
        ]}
      >
        <Select placeholder="Select transmission type">
          <Option value="manual">Manual</Option>
          <Option value="automatic">Automatic</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Number of Seats"
        name="seats"
        rules={[
          { required: true, message: "Please enter the number of seats" },
        ]}
      >
        <InputNumber
          min={1}
          placeholder="Enter number of seats"
          className="w-full"
        />
      </Form.Item>

      <Form.Item
        label="Fuel Tank Capacity (Liters)"
        name="capacity_fuel"
        rules={[
          { required: true, message: "Please enter the fuel tank capacity" },
        ]}
      >
        <InputNumber
          min={0}
          placeholder="Enter fuel tank capacity"
          className="w-full"
          formatter={(value) => `${value} L`}
          parser={(value) => value.replace(/\s?L|(,*)/g, "")}
        />
      </Form.Item>
    </Form>
  );
};

export default TechnicalInformations;
