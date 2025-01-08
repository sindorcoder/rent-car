/* eslint-disable no-unused-vars */
import { Button, Divider, Form, Input, message, Typography } from 'antd';
const { Title, Text } = Typography
import { Link, useNavigate, } from 'react-router-dom';
import { useSignUpMutation } from '../../../redux/api/userApi';
import { useEffect, useState } from 'react';
import { capitalPasswordValidation, symbolPasswordValidation, numberPasswordValidation } from "../../../validation/index"
const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [first_name, setFirstName] = useState("")
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [signUp, {isLoading, isSuccess, data}] = useSignUpMutation();

  const onFinish = async (values) => {
    signUp(values)
    setEmail(values.email)
    setPassword(values.password)
    setFirstName(values.first_name)
  };


  useEffect(() => {
    if(isSuccess) {
      message.success(data.message)
      navigate(`/auth/verify/?email=${btoa(email)}&password=${btoa(password)}&first_name=${btoa(first_name)}`)
    }
  }, [data, isSuccess])

  return (
    <>
    
    <div className='w-full flex justify-center items-center min-h-screen p-5'>
          <div className='shadow-cm flex-col  rounded-[10px] w-full max-w-[500px] p-5 flex items-center justify-center'>
      <Title>Register</Title>
<Form
    name="basic"
    layout='vertical'
    labelCol={{
      span: 12,
    }}
    style={{
      width: "100%",
    }}
    wrapperCol={{
      span: 35,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    autoComplete="off"
  >
  <div className='flex items-center w-full gap-2'>
    
  <Form.Item

label="FirstName"
name="first_name"
className='w-full'
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

label="LastName"
name="last_name"
className='w-full'
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

    <Form.Item

    className='w-full'
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your Email!',
        },
      ]}
    >
      <Input />
    </Form.Item>
      <div className='flex mb-[50px] gap-3 w-full'>
        

  <Form.Item
  className='w-full'
  label="Password"
  hasFeedback={true}
  name="password"
  rules={[
    {
      required: true,
      message: 'Please input your password!',
    },
    {
      min: 8,
      message: 'Password must be at least 8 characters',
    },
    capitalPasswordValidation, symbolPasswordValidation, numberPasswordValidation
  ]
}
>
  <Input.Password />
</Form.Item>
      </div>
    <Form.Item
      wrapperCol={{
        span: 36,
      }}
      className='!mt-[55px]'
    >
      <Button disabled={isLoading} loading={isLoading}  type="primary" htmlType="submit" className='w-full '>
        Register
      </Button>
    </Form.Item>
      <Divider>
        Or
      </Divider>
    <Text className='text-center block my-[20px]'> Already have an account? <Link to='/auth'>Login</Link> </Text>
  </Form>
    </div>
      </div>
    </>
  )
}
export default Register