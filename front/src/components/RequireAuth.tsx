import Unauthorized from "../pages/Unauthorized";
import useAuth from "../hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

interface IUserData {
    username: string;
   };

const RequireAuth = () => {
    // @ts-ignore
    // const { auth } = useAuth()

    const authUser = useAuthUser<IUserData>()
    const location = useLocation()

    

    return (
        authUser?.username
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth