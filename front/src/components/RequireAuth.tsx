import Unauthorized from "../pages/Unauthorized";
import useAuth from "../hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = () => {
    // @ts-ignore
    const { auth } = useAuth()
    const location = useLocation()

    return (
        auth?.user
            ? <Unauthorized />
            : <Navigate to={"/login"} state={{ from: location }} replace />
    )
}

export default RequireAuth