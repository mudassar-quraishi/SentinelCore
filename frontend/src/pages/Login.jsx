import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {

            alert("Please enter email and password");
            return;

        }

        try {

            setLoading(true);

            const response = await api.post("/auth/login", {

                email,
                password,

            });

            if (!response.data.token) {

                alert(response.data.message);
                return;

            }

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("isLoggedIn", "true");

            navigate("/dashboard");

        }

        catch (error) {

            console.log(error);

            if (error.response) {

                alert(error.response.data.message || "Login Failed");

            }

            else {

                alert(error.message);

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout>

            <LoginForm

                email={email}
                password={password}

                setEmail={setEmail}
                setPassword={setPassword}

                handleLogin={handleLogin}

                loading={loading}

            />

        </AuthLayout>

    );

}

export default Login;