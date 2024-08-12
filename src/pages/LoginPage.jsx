import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
    let {user, loginUser} = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        await loginUser(e);
        navigate(from, {replace: true});
    }

    return ( 
        <div>
            {user && <p>Hello, {user.user_id}</p>}
            <form onSubmit={handleLogin}>
                <input type="text" name="email" placeholder="Enter email"/>
                <input type="password" name="password" placeholder="Enter password"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default LoginPage;