import { useContext } from "react";
import AuthContext from "context/AuthProvider";

interface UseAuthValues {
    auth: {
        user: string
    };
    setAuth: React.Dispatch<React.SetStateAction<{ user: string }>>;
}

const useAuth = (): UseAuthValues => {
    return useContext(AuthContext) as UseAuthValues;
}

export default useAuth;