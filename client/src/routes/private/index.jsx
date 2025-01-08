import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const Private = () => {
     const {token} = useSelector(state => state.auth)
     return token ? 
     <div>
         <Outlet/>
     </div> 
     : 
     <Navigate to="/auth/" />
}

export default Private