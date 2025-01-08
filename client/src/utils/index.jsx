/* eslint-disable react/prop-types */
import { Spin, Flex, Typography} from 'antd';
import { Suspense } from "react"
const {Title} = Typography

const Loading = () => {

     return (
          <div className='w-full h-screen flex items-center justify-center'>
            <Flex align="center" gap="middle">
        <Spin tip="Loading..." size="large" />
      </Flex>
          </div>
     )
}

const SuspenseElement = ({children}) => {
     return ( <Suspense fallback={<Loading/>}> {children}  </Suspense>)
}
export const DashboardTitle = ({children}) => {

    return (
        <Title level={3}>{children}</Title>
    )
}

export const Container = ({children}) => {
     return (
         <div className='main-container'>
             {children}
         </div>
     )
 }
export { SuspenseElement, Loading }