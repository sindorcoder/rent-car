import { Button, Form, Input, Typography, Divider } from 'antd';
import { Link, useNavigate} from 'react-router-dom';
import { capitalPasswordValidation, symbolPasswordValidation, numberPasswordValidation } from '../../../validation';
import { useLoginInMutation } from '../../../redux/api/userApi';
import { useEffect } from 'react';
import { logIn } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
const { Title, Text } = Typography

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginIn, {data, isSuccess, isLoading}] = useLoginInMutation()

  const onFinish = async (values) => {
    loginIn(values)
  };

  useEffect(() => {
    if(isSuccess && data.payload.accessToken) {
      dispatch(logIn(data))
      navigate("/")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess])

  return (
      <div className='w-full min-h-screen flex px-5 items-center justify-center'>
        
    <div className='shadow-cm rounded-[10px] w-full max-w-[500px]  p-5 flex-col flex items-center justify-center'>
      <Title>Login</Title>
<Form

    name="basic"
    layout='vertical'
    style={{
      width: "100%",
      maxWidth: 400,
    }}
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 38,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your Email!',
        }
      ]}
    >
      <Input />
    </Form.Item>

      <Form.Item
      label="Password"
      name="password"
      hasFeedback={true}
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
        {
          min: 6,
          message: 'Password must be at least 6 characters long',
        },
        capitalPasswordValidation, symbolPasswordValidation, numberPasswordValidation
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        span: 36,
      }}
      className='pt-[30px]'
    >
      <Button loading={isLoading} disabled={isLoading} type="primary"  htmlType="submit" className='w-full'>
        Login
      </Button>
    </Form.Item>
    
    <Divider>
        Or
      </Divider>
      <Text className='text-center block my-[20px]'> Dont have an account? <Link to={"/auth/register"} >Register</Link> </Text>
  </Form>
    </div>
      </div>
  )
}
export default Login