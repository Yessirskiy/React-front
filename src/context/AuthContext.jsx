import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

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
        let response = await fetch(
            "http://localhost:8000/api/token/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"email": e.target.email.value, "password": e.target.password.value}),
        });
        let data = await response.json();
        if (response.status === 200){
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            alert("Something went wrong!");
        }
    }

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
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