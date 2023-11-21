import { createContext, 
    useState, 
    useEffect,
    useMemo } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [token, setToken_] = useState(localStorage.getItem("token"));

    return (
        <AuthContext.Provider value={{ auth, setAuth, token, setToken_ }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;