import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { login, logout } from "../api/auth";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState( () =>
        localStorage.getItem("authTokens") ? 
        JSON.parse(localStorage.getItem("authTokens")) : null);

    let [user, setUser] = useState( () =>
        localStorage.getItem("authTokens") ? 
        jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access) : null);

    let [loading, setLoading] = useState(true);

    let loginUser = async (e) => {
        try {
            const data = await login({"email": e.target.email.value, "password": e.target.password.value});
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        } catch (error) {
            alert("Error while loggin in.");
        }
    }

    let logoutUser = async () => {
        try {
            await logout({"refresh": authTokens.refresh});
            setAuthTokens(null);
            setUser(null);
            localStorage.removeItem("authTokens");
        } catch (error) {
            console.log("Failed on logout");
        }
    }

    let contextData = {
        user: user,
        setUser: setUser,

        loginUser: loginUser,
        logoutUser: logoutUser,

        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
    }

    useEffect(() => {
        if (authTokens){
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}