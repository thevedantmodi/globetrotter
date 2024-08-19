import { useContext } from "react";
import AuthContext from "context/AuthProvider";

interface useAuthValues {
    auth: any
    setAuth: any
}

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth