import { createContext, useState, useEffect } from "react";
import { login, logout } from "../api/auth";
import { Navigate, redirect } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(true);
    let [loading, setLoading] = useState(true);

    let loginUser = async (e) => {
        try {
            const response = await login({"username": "", "email": e.target.email.value, "password": e.target.password.value});
            if (response.status === 204)
                setUser(true);
        } catch (error) {
            alert("Error while loggin in.");
        }
    }

    let logoutUser = async () => {
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.log("Failed on logout");
        }
    }

    let contextData = {
        user: user,
        setUser: setUser,

        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}