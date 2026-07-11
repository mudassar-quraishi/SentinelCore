import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
import "../styles/Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        if (!email || !password) {

            alert("Please enter email and password");

            return;

        }

        try {

            const response = await api.post("/auth/login", {
                email,
                password,
            });

            // Save JWT Token
            localStorage.setItem("token", response.data.token);

            // Login Status
            localStorage.setItem("isLoggedIn", "true");

            alert("Login Successful");

            navigate("/dashboard");

        }catch (error) {

    console.log(error);

    if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        alert(JSON.stringify(error.response.data));
    } else {
        alert(error.message);
    }

}

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1>SentinelCore</h1>

                <h3>Cyber Threat Intelligence</h3>

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>
                    Login
                </button>

            </div>

        </div>

    );

}

export default Login;