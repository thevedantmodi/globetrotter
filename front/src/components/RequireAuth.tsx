import Unauthorized from "../pages/Unauthorized";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

export interface AuthUserData {
    username: string;
   };

const RequireAuth = () => {
    const authUser = useAuthUser<AuthUserData>()
    const location = useLocation()

    

    return (
        authUser?.username
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth