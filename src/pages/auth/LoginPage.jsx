import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { loginUser } from "../../api/auth";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/feed";

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({"username": "", "email": email, "password": password});
            if (response.status === 204){
                await login({email: email, first_name: "Lilka"});
                navigate(from, {replace: true});
            } else {
                throw error;
            }
        } catch (error) {
            alert("Creds are wrong!");
        }
        
    }

    return ( 
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" name="email" onChange={(e) => (setEmail(e.target.value))} placeholder="Enter email"/>
                <input type="password" name="password" onChange={(e) => (setPassword(e.target.value))} placeholder="Enter password"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default LoginPage;