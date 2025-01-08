import { Button, Input, InputNumber, Form } from "antd"
import Footer from "../../components/footer/Footer"
import { useLocation } from "react-router-dom"
import { useGetUserInfoQuery } from "../../redux/api/userInfo"
const Orders = () => {
  const {data} = useGetUserInfoQuery()
  const {state} = useLocation()

  const userId = data?.payload?._id

  console.log(userId);
  console.log(state);
  const onFinish = (values) => {
    console.log(values);
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
      >
        <Form.Item
          label="User ID"
          name="user_id"
          initialValue={userId}
          rules={[{ required: true, message: 'Please input the user ID!' }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Car ID"
          name="car_id"
          rules={[{ required: true, message: 'Please input the car ID!' }]}
        >
          <Input placeholder="Enter Car ID" />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: 'Please input the quantity!' }]}
        >
          <InputNumber min={1} className="w-full" placeholder="Enter Quantity" />
        </Form.Item>

        <Form.Item
          label="Total Price"
          name="total_price"
          rules={[{ required: true, message: 'Please input the total price!' }]}
        >
          <InputNumber min={0} className="w-full" placeholder="Enter Total Price" />
        </Form.Item>

        <Form.Item
          label="Driver's License Number"
          name="drive_license_number"
          rules={[{ required: true, message: 'Please input the driver\'s license number!' }]}
        >
          <Input placeholder="Enter Driver's License Number" />
        </Form.Item>

        <Form.Item
          label="From Date"
          name="fromDate"
          rules={[{ required: true, message: 'Please select the from date!' }]}
        >
          <Input className="w-full" placeholder="Select From Date" />
        </Form.Item>

        <Form.Item
          label="To Date"
          name="toDate"
          rules={[{ required: true, message: 'Please select the to date!' }]}
        >
          <Input className="w-full" placeholder="Select To Date" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    <Footer/>
    </>
  )
}

export default Orders