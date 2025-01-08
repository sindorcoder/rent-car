import TableComponent from "../../../components/table/Table";
import avatarLogo from "../../../images/avatarImage.webp"
import { DashboardTitle } from "../../../utils/index"
import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { useGetPeopleQuery, useDeleteUserMutation, usePromoteUserMutation } from "../../../redux/api/userInfo";
import { Link } from "react-router-dom";

const Users = () => {
  const {data, isLoading} = useGetPeopleQuery();
  const [deleteUser, {data: deleteUserData, isSuccess}] = useDeleteUserMutation();
  const [promote, {data: promoteData, isSuccess: promoteSuccess}] = usePromoteUserMutation()
  const [current, setCurrent] = useState(1);


  const handleUserDelete = (id) => {
    deleteUser(id);
  };

  const handlePromoution = (id) => {
    promote(id)
  }

  useEffect(() => {
    if(promoteSuccess) {
      message.success(promoteData.message);
    }
  }, [promoteSuccess, promoteData])

  useEffect(() => {
    if(isSuccess) {
      message.success(deleteUserData.message);
    }
  }, [isSuccess])
  
  const columns = [

    
    {
      count: 1,
      title: "No",
      key: "id",
      render: (text, _, index) => (current - 1) * 5 + index + 1,
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "first_name",
    },
    {
      key: "last_name",
      title: "lastName",
      dataIndex: "last_name",
    },
    {
      key: "status",
      title: "status",
      dataIndex: "status",
      render: (status) => `${status}`,
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      render: (email) => `${email}`,
      width: 200,
    },
    {
      key: "createdAt",
      title: "createdAt",
      dataIndex: "createdAt",
      render: (data) => new Date(data).toLocaleDateString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
    },
    
    {
      key: "role",
      title: "role",
      dataIndex: "role",
      render: (role) => `${role}`,
    },
    {
      key: "avatar",
      title: "Avatar",
      dataIndex: "avatar",
      render: (avatar) => avatar ? <img src={avatar} width={40} className="rounded-full object-contain" alt="avatar" /> : <img src={avatarLogo} className="rounded-full object-contain" width={40} alt="avatar" />,
    },
    {
      key: "action",
      title: "Action",
      render: (product) => (
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            onClick={() => handlePromoution(product._id)}
          >
            Promote
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => handleUserDelete(product._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    
    <>
    
    <div className="flex items-center justify-between">
        <DashboardTitle>Users</DashboardTitle>
        <Link to="/create-users">
          <Button type="primary">Create Users</Button>
        </Link>
      </div>
    <TableComponent
    columns={columns}
    isLoading={isLoading}
    url={data?.payload}
    pagination={{ pageSize: 5, onChange: (page) => setCurrent(page), }}
  />
    </>
  )
}

export default Users