import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar";
import Footer from "../../components/footer/Footer";
import { Content } from "antd/es/layout/layout";
const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [collapsed, setCollapsed] = useState(false); 
  return (
     <>
        <Layout className="min-h-screen">
          <Sidebar collapsed={collapsed} />
          <Content
         style={{
           margin: '24px 16px',
           padding: 24,
           borderRadius: 20,
           minHeight: 280,
           background: "#fff",
         }}
          >
        <Outlet/>
       </Content>     
        </Layout>
        <Footer/>
     </>
  )
}
export default Dashboard