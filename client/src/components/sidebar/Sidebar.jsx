import { BiCategory } from "react-icons/bi"; 
import { AiOutlineUser } from "react-icons/ai"; 
/* eslint-disable react/prop-types */
import { Button, Layout, Menu, Modal } from "antd";
const { Sider } = Layout;
import home from "../../images/home.svg";
import car from "../../images/car.svg";
import reim from "../../images/empty-wallet-change.svg";
import logOut from "../../images/logout.svg";
import  { signOut }  from "../../redux/slices/authSlice";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Sidebar = ({ collapsed }) => {
  const dispatch = useDispatch()
  const {user: {role}} = useSelector(state => state.auth)

  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const showModal = () => {
    setOpen(true);
  };

  
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setTimeout(() => {
      dispatch(signOut())
      setOpen(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };


  return (
    <>
    
    <div>
      <Sider
      style={{
        background: "white"
      }}
        trigger={null}
        className="h-full w-full flex flex-col justify-between"
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
          className="flex-1 flex flex-col gap-5"
          mode="inline"
          items={
            role === "admin" ?  
            [
            {
              key: "1",
              icon: <img src={home} alt="home" />,
              label: <NavLink to={""}>Dashboard</NavLink>,
            },
            {
              key: "2",
              icon: <img src={car} alt="car" />,
              label: <NavLink to={"cars"}>Cars Rent</NavLink>,
            },
            {
              key: "3",
              icon: <AiOutlineUser size={28} color="#90A3BF" />,
              label: <NavLink to={"users"}>Users</NavLink>,
            },

            {
              key: "4",
              icon: <BiCategory size={28} color="#90A3BF" />,
              label:<NavLink to={"category"}>Category</NavLink> 
              ,
            },
            {
              key: "5",
              icon: <img src={reim} alt="reim" />,
              label: <NavLink to={"reimburse"}>Reimburses</NavLink>,
            },
            ]
            :
            [
              {
                key: "1",
                icon: <img src={home} alt="home" />,
                label: <NavLink to={""}>Dashboard</NavLink>,
              },
              {
                key: "2",
                icon: <img src={reim} alt="reim" />,
                label: <NavLink to={"reimburse"}>Reimburse</NavLink>,
              },
              ]
        }
        />
        <Button danger onClick={showModal} className="p-2 py-5 m-2" type="primary">
          <img src={logOut} alt="log Out" />
          LogOut
        </Button>
      </Sider>
    </div>
    <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default Sidebar;
