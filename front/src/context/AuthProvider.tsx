import { createContext, useState } from "react";

const AuthContext = createContext({});

type AuthContextProps = {
    children: any
}

export const AuthProvider = (props: AuthContextProps) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContext;