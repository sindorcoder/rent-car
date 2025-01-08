/* eslint-disable no-unused-vars */
import { Card, Typography, Row, Col, Divider, Image, Upload, Button  } from 'antd';
import avatar from "../../../images/avatarImage.webp"
import { useGetUserInfoQuery, useUpdateUserMutation } from "../../../redux/api/userInfo";
import { useRemoveImageMutation, useSendThumbnailFileMutation } from '../../../redux/api/upload-api';
import ProfileModal from "../../../components/profile-modal/ProfileModal"
import { useEffect, useState } from 'react';
const { Title, Paragraph, Text } = Typography;

const ProfilePage = () => {
  const { data: payload } = useGetUserInfoQuery();
  const [open, setOpen] = useState(false)


  return (
    <div style={{ padding: '20px' }}>
      <Card
        style={{ maxWidth: 1100,  margin: '0 auto', borderRadius: '10px' }}
      >
          <div className='flex w-full items-end justify-end'>
              <Button onClick={() => setOpen(true)}>Update User</Button>            
          </div>
        <div className='flex items-center flex-col gap-5 justify-center'>
         <Image
            width={200}
            height={200}
            className='object-contain'
            src="error"
            fallback={payload?.payload?.avatar ? payload?.payload?.avatar : avatar}
            style={{marginBottom: "50px", borderRadius: "50%"}}
/>
        </div>

        <Title level={2} style={{ textAlign: 'center' }}>{payload?.payload?.first_name}  {payload?.payload?.last_name}</Title>
        <Paragraph style={{ textAlign: 'center' }}>
          Full Stack Developer | Tech Enthusiast | Frontend Developer
        </Paragraph>
        <Divider />
        <Row className='ml-[100px]'>
          <Col span={6}>
            <Text strong>Email</Text>
            <Paragraph>{payload?.payload?.email}</Paragraph>
          </Col>
          <Col span={4}>
            <Text strong>Role</Text>
            <Paragraph>{payload?.payload?.role}</Paragraph>
          </Col>
          
          <Col span={6} className='mr-12'>
            <Text strong>ID</Text>
            <Paragraph>{payload?.payload?._id}</Paragraph>
          </Col>
          
          <Col span={5} className='mr-12'>
            <Text strong>Balance</Text>
            <Paragraph>${payload?.payload?.balance}</Paragraph>
          </Col>
        </Row>

      </Card>

      <ProfileModal open={open} setOpen={setOpen} payload={payload}></ProfileModal>
    </div>
  );
};

export default ProfilePage;